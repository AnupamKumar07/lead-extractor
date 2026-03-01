import requests
import config
from urllib.parse import urlparse

def get_domain_from_url(url: str) -> str:
    """Extracts domain from a URL (e.g., https://www.example.com -> example.com)."""
    if not url:
        return ""
    try:
        parsed = urlparse(url)
        domain = parsed.netloc or parsed.path
        if domain.startswith("www."):
            domain = domain[4:]
        return domain
    except Exception:
        return ""

def enrich_email_hunter(domain: str) -> dict:
    """
    Enriches domain with email data using Hunter.io.
    Returns best email found or None.
    """
    if not config.HUNTER_API_KEY or not domain:
        return {}

    url = f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={config.HUNTER_API_KEY}"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if "data" in data and data["data"]["emails"]:
             # Return the first email found
            return {"email": data["data"]["emails"][0]["value"]}
            
    except Exception as e:
        print(f"Hunter API error for {domain}: {e}")
        
    return {}

def enrich_company_clearbit(domain: str) -> dict:
    """
    Enriches domain with company data using Clearbit.
    """
    if not config.CLEARBIT_API_KEY or not domain:
        return {}

    url = f"https://company.clearbit.com/v2/companies/find?domain={domain}"
    headers = {"Authorization": f"Bearer {config.CLEARBIT_API_KEY}"}
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "industry": data.get("category", {}).get("industry"),
                "employee_count": data.get("metrics", {}).get("employees"),
                "location": data.get("geo", {}).get("city")
            }
    except Exception as e:
        print(f"Clearbit API error for {domain}: {e}")
        
    return {}
