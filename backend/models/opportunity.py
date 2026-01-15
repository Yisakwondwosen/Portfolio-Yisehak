import json
import os
from datetime import datetime

DATA_FILE = 'opportunities.json'

def save_opportunities(opportunities):
    """Save opportunities to a local JSON file for persistence."""
    existing_data = []
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            pass
    
    # Simple append logic (in real app, check for duplicates)
    timestamp = datetime.now().isoformat()
    for opp in opportunities:
        opp['scanned_at'] = timestamp
        existing_data.append(opp)
    
    with open(DATA_FILE, 'w') as f:
        json.dump(existing_data, f, indent=2)

def get_all_opportunities():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []
