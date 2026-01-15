import schedule
import time
from threading import Thread
from services.crawler_service import OpportunityCrawler
from models.opportunity import save_opportunities
import logging

logger = logging.getLogger(__name__)

def daily_scan():
    """Run daily scans of all Ethiopian sources."""
    logger.info("Starting daily scan...")
    crawler = OpportunityCrawler()
    sectors = ['construction', 'agriculture', 'technology', 'healthcare']
    
    for sector in sectors:
        try:
            logger.info(f"Scanning sector: {sector}")
            opportunities = crawler.find_tenders(sector=sector)
            if opportunities:
                save_opportunities(opportunities)
            time.sleep(60)  # Be respectful with delays
        except Exception as e:
            logger.error(f"Error scanning sector {sector}: {e}")

# Run in background thread
def run_scheduler():
    schedule.every().day.at("08:00").do(daily_scan)  # Scan daily at 8 AM
    # Also run once on startup for demo purposes if needed, or just wait
    # schedule.run_all() 
    
    while True:
        schedule.run_pending()
        time.sleep(60)

def start_scheduler():
    t = Thread(target=run_scheduler, daemon=True)
    t.start()
