import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase Settings
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# API Keys
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")
HUNTER_API_KEY = os.getenv("HUNTER_API_KEY")
CLEARBIT_API_KEY = os.getenv("CLEARBIT_API_KEY")

# Scraper Settings
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "10"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

def validate_config():
    """Validates that all necessary configuration variables are present."""
    required_vars = [
        "SUPABASE_URL",
        "SUPABASE_KEY",
        "GOOGLE_PLACES_API_KEY",
        # "HUNTER_API_KEY", # Optional if we skip enrichment
        # "CLEARBIT_API_KEY" # Optional if we skip enrichment
    ]
    
    missing = [var for var in required_vars if not globals()[var]]
    
    if missing:
        raise ValueError(f"Missing required environment variables: {', '.join(missing)}")

if __name__ == "__main__":
    try:
        validate_config()
        print("Configuration is valid.")
    except ValueError as e:
        print(f"Configuration error: {e}")
