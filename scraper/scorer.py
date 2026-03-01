from typing import Dict, Any

def calculate_lead_score(lead_data: Dict[str, Any]) -> int:
    """
    Calculates lead score based on:
    - No website: +40 (Wait, requirements say IF no website -> +40? Usually having a website is better. 
      Let's re-read: "IF no website -> +40". This implies we target businesses WITHOUT websites to sell them websites.
      Matches "Lead Extractor" theme).
    - Email exists: +30
    - Employees < 50: +30 (Targeting SMBs)
    - Website exists: +10 (Wait, this conflicts with 'No website'. 
      If 'No website' is +40, then 'Website exists' being +10 means we prefer no website.
      Logic: 
      - Has Website: +10
      - No Website: +40
      These are mutually exclusive base scores.)
    """
    score = 0
    
    website = lead_data.get("website")
    email = lead_data.get("email")
    employee_count = lead_data.get("employee_count")
    
    # Website Logic
    if not website:
        score += 40
    else:
        score += 10
        
    # Email Logic
    if email:
        score += 30
        
    # Employee Count Logic (Targeting SMBs)
    # Parsing employee count string like "10-50" or "100+" or raw number
    is_small_business = False
    if employee_count:
        try:
            # Simple heuristic for now
            if isinstance(employee_count, str):
                if "-" in employee_count:
                    lower = int(employee_count.split("-")[0])
                    if lower < 50:
                        is_small_business = True
                elif "+" in employee_count:
                    val = int(employee_count.replace("+", ""))
                    if val < 50:
                        is_small_business = True
                else:
                    if int(employee_count) < 50:
                        is_small_business = True
            elif isinstance(employee_count, int):
                 if employee_count < 50:
                        is_small_business = True
        except:
            pass # Default to false if parse error
            
    if is_small_business:
        score += 30
        
    return score
