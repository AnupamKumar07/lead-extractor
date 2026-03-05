import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# API Keys
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")
HUNTER_API_KEY = os.getenv("HUNTER_API_KEY")
CLEARBIT_API_KEY = os.getenv("CLEARBIT_API_KEY")

# Scraper settings
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "10"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")


def validate_config():
    """Validate required environment variables."""
    
    required_vars = {
        "SUPABASE_URL": SUPABASE_URL,
        "SUPABASE_KEY": SUPABASE_KEY,
        "SERPER_API_KEY": SERPER_API_KEY,
    }

    missing = [key for key, value in required_vars.items() if not value]

    if missing:
        raise ValueError(
            f"Missing required environment variables: {', '.join(missing)}"
        )


if __name__ == "__main__":
    try:
        validate_config()
        print("Configuration is valid.")
    except ValueError as e:
        print(f"Configuration error: {e}")