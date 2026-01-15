import React, { useState } from 'react';
import './AICrawlerDemo.css';

interface Opportunity {
    title: string;
    source: string;
    details: {
        deadline_date?: string;
        [key: string]: any;
    };
}

interface ScanResponse {
    success: boolean;
    opportunities: Opportunity[];
    count?: number;
    error?: string;
}

const AICrawlerDemo: React.FC = () => {
    const [sector, setSector] = useState('construction');
    const [location, setLocation] = useState('Addis Ababa');
    const [results, setResults] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const scanOpportunities = async () => {
        setLoading(true);
        setError(null);
        setNotification(null);
        setResults([]);

        try {
            // Note: Ensure /api proxy is configured or use full URL e.g., http://localhost:5000/api
            const response = await fetch('/api/scan-opportunities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sector, location })
            });
            const data: ScanResponse = await response.json();
            if (data.success) {
                setResults(data.opportunities);
                setNotification(`✨ Success! We found ${data.opportunities.length} active opportunities in ${location}.`);
            } else {
                setError(data.error || 'Failed to fetch opportunities');
            }
        } catch (error) {
            console.error('Scan failed:', error);
            setError('Connection failed. Is the backend running?');
        }
        setLoading(false);
    };

    return (
        <div className="crawler-demo-widget">
            <h3>🔍 BizWach Ethiopia - Opportunity Finder</h3>
            <p>Try our AI-powered crawler for Ethiopian business tenders</p>

            <div className="demo-controls">
                <select value={sector} onChange={(e) => setSector(e.target.value)}>
                    <option value="construction">Construction</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                </select>

                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />

                <button onClick={scanOpportunities} disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            Scanning...
                        </span>
                    ) : 'Find Opportunities'}
                </button>
            </div>

            {loading && (
                <div className="scanning-overlay">
                    <div className="radar-spinner"></div>
                    <p>Scanning procurement portals...</p>
                </div>
            )}

            {notification && (
                <div className="notification-banner success animate-pop-in">
                    {notification}
                </div>
            )}

            {error && <p className="error-message" style={{ color: '#ff6b6b' }}>{error}</p>}

            {results.length > 0 && (
                <div className="results-panel animate-slide-up">
                    <div className="results-header">
                        <h4>Latest Opportunities</h4>
                        <span className="badge">{results.length} New</span>
                    </div>
                    {results.map((opp, idx) => (
                        <div key={idx} className="opportunity-card">
                            <h5>{opp.title || 'Untitled Opportunity'}</h5>
                            <p>
                                <strong>Source: </strong>
                                <a href={opp.source} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
                                    {opp.source.startsWith('http') ? new URL(opp.source).hostname : opp.source}
                                </a>
                            </p>
                            {opp.details.deadline_date && (
                                <p><strong>Deadline:</strong> {opp.details.deadline_date}</p>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default AICrawlerDemo;
