from flask import Blueprint, jsonify, request
from services.crawler_service import OpportunityCrawler

crawler_bp = Blueprint('crawler', __name__)
crawler_service = OpportunityCrawler()

@crawler_bp.route('/scan-opportunities', methods=['POST'])
def scan_opportunities():
    data = request.json or {}
    sector = data.get('sector', '')
    location = data.get('location', '')
    
    try:
        opportunities = crawler_service.find_tenders(sector=sector, location=location)
        return jsonify({
            'success': True,
            'count': len(opportunities),
            'opportunities': opportunities
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
