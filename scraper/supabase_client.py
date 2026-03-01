from supabase import create_client, Client
import config
from typing import Dict, Any, Optional

class SupabaseClient:
    def __init__(self):
        if not config.SUPABASE_URL or not config.SUPABASE_KEY:
            raise ValueError("Supabase URL and Key must be set in config/env")
        self.supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    def check_duplicate(self, email: Optional[str] = None, domain: Optional[str] = None) -> bool:
        """
        Checks if a lead with the given email or domain (website) already exists.
        Returns True if duplicate exists.
        """
        if email:
            response = self.supabase.table("leads").select("id").eq("email", email).execute()
            if response.data:
                return True
        
        # Domain check might be too aggressive if multiple leads from same company are allowed
        # But per requirements "No duplicate insertions", we'll check domain if email is missing
        if domain:
             # Assuming 'website' stores the domain or full url
            response = self.supabase.table("leads").select("id").ilike("website", f"%{domain}%").execute()
            if response.data:
                return True
                
        return False

    def insert_lead(self, lead_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Inserts a new lead into the database.
        Returns the inserted data or None if failed.
        """
        try:
            response = self.supabase.table("leads").insert(lead_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error inserting lead: {e}")
            return None

    def create_scraper_job(self, query: str, source: str = "google_places") -> Optional[Dict[str, Any]]:
        """Creates a new scraper job entry."""
        try:
            data = {
                "url": query, # Using url field for query string mapping
                "status": "running",
                "leads_found": 0,
                # "source": source # If we add source column to scraper_jobs later
            }
            response = self.supabase.table("scraper_jobs").insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating scraper job: {e}")
            return None

    def update_scraper_job(self, job_id: str, status: str, leads_found: int = 0, error: Optional[str] = None):
        """Updates the status of a scraper job."""
        try:
            data = {
                "status": status,
                "leads_found": leads_found
            }
            if error:
                data["error"] = error
                
            self.supabase.table("scraper_jobs").update(data).eq("id", job_id).execute()
        except Exception as e:
            print(f"Error updating scraper job: {e}")
