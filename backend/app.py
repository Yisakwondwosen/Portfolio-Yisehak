from flask import Flask
from flask_cors import CORS
from routes.crawler import crawler_bp
from services.scheduler import start_scheduler
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend communication
CORS(app)

# Register Blueprints
app.register_blueprint(crawler_bp, url_prefix='/api')

# Start Scheduler
if os.environ.get('WERKZEUG_RUN_MAIN') != 'true': # Prevent double execution in reload mode
    start_scheduler()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
