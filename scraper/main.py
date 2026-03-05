import requests
import config
from supabase_client import SupabaseClient
from enrichment import get_domain_from_url, enrich_email_hunter, enrich_company_clearbit
from scorer import calculate_lead_score
from typing import List, Dict

# Initialize DB
db = SupabaseClient()


def search_places(query: str) -> List[Dict]:
    """Search businesses using Serper instead of Google Places"""
    print(f"Searching Serper for: {query}")

    url = "https://google.serper.dev/search"

    headers = {
        "X-API-KEY": config.SERPER_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "q": query,
        "gl": "in",
        "hl": "en"
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        print("Serper API error:", response.text)
        return []

    data = response.json()

    results = []

    for item in data.get("organic", []):
        results.append({
            "name": item.get("title"),
            "formatted_address": "",
            "website": item.get("link")
        })

    return results


def process_lead(place: Dict, source_query: str):
    """Extract -> Enrich -> Score -> Save"""

    name = place.get("name")
    address = place.get("formatted_address")
    website = place.get("website")
    phone = None

    print(f"Processing: {name}")

    if not website:
        print("No website found. Skipping.")
        return

    domain = get_domain_from_url(website)

    # Duplicate check
    if db.check_duplicate(domain=domain):
        print(f"Skipping duplicate: {name}")
        return

    # Enrichment
    email_data = enrich_email_hunter(domain)
    company_data = enrich_company_clearbit(domain)

    final_data = {
        "company": name,
        "location": address or company_data.get("location"),
        "source": f"Scraper - {source_query}",
        "status": "New",
        "email": email_data.get("email", ""),
        "first_name": "Scraped",
        "last_name": "Lead"
    }

    # Scoring
    score_input = {
        "website": website,
        "email": final_data["email"],
        "employee_count": company_data.get("employee_count")
    }

    final_data["lead_score"] = calculate_lead_score(score_input)

    print(f"Saving lead: {name} (Score: {final_data['lead_score']})")

    db.insert_lead(final_data)


def run_scraper(queries: List[str]):
    """Main execution loop"""

    print("Starting Scraper Job...")

    for query in queries:
        job = db.create_scraper_job(query)
        job_id = job.get("id") if job else None

        leads_found_count = 0

        try:
            results = search_places(query)

            for place in results:
                process_lead(place, query)
                leads_found_count += 1

                if job_id and leads_found_count % 5 == 0:
                    db.update_scraper_job(job_id, "running", leads_found_count)

            if job_id:
                db.update_scraper_job(job_id, "completed", leads_found_count)

        except Exception as e:
            print(f"Job failed for query '{query}': {e}")
            if job_id:
                db.update_scraper_job(job_id, "failed", leads_found_count, str(e))

    print("Scraper Job Completed.")


if __name__ == "__main__":

    QUERIES = [
        "startup in India",
        "clinic in India",
        "real estate company in India",
        "logistics company in India",
        "coaching institute in India"
    ]

    run_scraper(QUERIES)