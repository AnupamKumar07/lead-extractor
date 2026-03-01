# Lead Intelligence Scraper System

This is a production-ready Python scraper that integrates with Google Places, Hunter.io, and Clearbit to find, enrich, and score leads, saving them directly to your Supabase database.

## Directory Structure

```
/scraper
  ├── main.py           # Entry point, orchestration logic
  ├── config.py         # Configuration loader
  ├── enrichment.py     # API wrappers for Hunter.io and Clearbit
  ├── scorer.py         # Lead scoring algorithm
  ├── supabase_client.py # Database interface
  ├── requirements.txt  # Python dependencies
  └── .env              # Environment variables
```

## Setup Instructions

1.  **Install Python**: Ensure Python 3.8+ is installed.
2.  **Install Dependencies**:
    ```bash
    cd scraper
    pip install -r requirements.txt
    ```
3.  **Environment Variables**:
    -   Copy `.env.example` to `.env`.
    -   Fill in your API keys:
        -   `SUPABASE_URL`: Your Supabase Project URL.
        -   `SUPABASE_KEY`: Your Supabase **Service Role Key** (required for backend inserts if RLS is strict) or Anon Key (if RLS allows inserts).
        -   `GOOGLE_PLACES_API_KEY`: Required for search.
        -   `HUNTER_API_KEY`: Optional, for email enrichment.
        -   `CLEARBIT_API_KEY`: Optional, for company enrichment.

## Running the Scraper

To start the scraper with the default queries ("startup in India", etc.):

```bash
python main.py
```

## Features

-   **Google Places Search**: Finds businesses based on keywords.
-   **Enrichment**:
    -   Extracts domains from websites.
    -   Finds emails via Hunter.io.
    -   Gets company size/industry via Clearbit.
-   **Scoring**:
    -   +40 if no website (Opportunity!)
    -   +30 if email found
    -   +30 if small business (<50 employees)
    -   +10 if website exists
-   **Database**:
    -   Checks for duplicates before inserting.
    -   Inserts structured data into `leads` table.
    -   Tracks job status in `scraper_jobs` table (if it exists).

## Customization

You can modify the `QUERIES` list in `main.py` to target different sectors or locations.
