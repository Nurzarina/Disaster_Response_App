import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Badge } from 'react-bootstrap';
import { DisasterIcons } from '../../utils/EmergencyIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reportLink } from '../../tobackend/URL';
import './ReportWidget.css';

const ReportWidget = () => {
    const navigate = useNavigate();
    const [reportCounts, setReportCounts] = useState({
        Flood: 0,
        Earthquake: 0,
        Landslide: 0,
        Fire: 0,
        Tsunami: 0,
        'Volcano Eruption': 0,
        Drought: 0,
        Tornado: 0
    });

    const [newReportCounts, setNewReportCounts] = useState({
        Flood: 0,
        Earthquake: 0,
        Landslide: 0,
        Fire: 0,
        Tsunami: 0,
        'Volcano Eruption': 0,
        Drought: 0,
        Tornado: 0
    });

    const [lastReportCounts, setLastReportCounts] = useState({
        Flood: 0,
        Earthquake: 0,
        Landslide: 0,
        Fire: 0,
        Tsunami: 0,
        'Volcano Eruption': 0,
        Drought: 0,
        Tornado: 0
    });

    useEffect(() => {
        fetchReports();
        // Fetch new reports periodically
        const intervalId = setInterval(fetchReports, 120000); // Fetch reports every 120 seconds.
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get(reportLink);
            const counts = {
                Flood: 0,
                Earthquake: 0,
                Landslide: 0,
                Fire: 0,
                Tsunami: 0,
                'Volcano Eruption': 0,
                Drought: 0,
                Tornado: 0
            };

            response.data.forEach(report => {
                if (counts.hasOwnProperty(report.disastertype)) {
                    counts[report.disastertype]++;
                }
            });

            // Calculate new reports since last check
            const newCounts = {};
            for (const type in counts) {
                newCounts[type] = Math.max(0, counts[type] - lastReportCounts[type]);
            }

            setReportCounts(counts);
            setNewReportCounts(newCounts);
            setLastReportCounts(counts);  // Update the last counts to the current counts after comparison
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleFilterClick = (filter) => {
        const typeLabel = DisasterIcons.find(disaster => disaster.type === filter).label;
        navigate(`/emergencies/${typeLabel}`, { state: { disasterType: typeLabel } });
    };

    const noReports = Object.values(reportCounts).every(count => count === 0);

    return (
        <Container fluid id='icons-container'>
            <div id='widgetBorder' className="card text-center mx-3">
                <div className="card-header mt-2">
                    <h2 id="widgetTitle" className="text-center mb-0 bg-dark text-white">Current Situation</h2>
                    
                    {noReports ? (
                        <></>
                    ) : (
                        <Link to="/emergencies/All">
                            <Button variant="primary" className="mb-3" id="viewBtn">View All Emergencies</Button>
                        </Link>
                    )}

                    <div id='icons_collection' className="card-body d-flex justify-content-around flex-wrap mt-2">
                        {noReports ? (
                            <p style={{ fontStyle: 'italic', color: 'grey' }}>All clear! There are no ongoing disasters currently.</p>
                        ) : (
                            DisasterIcons.map((disaster, index) =>
                                reportCounts[disaster.type] > 0 && (
                                    <div
                                        id='icon'
                                        key={disaster.type}
                                        onClick={() => handleFilterClick(disaster.type)}
                                        className={`icon ${reportCounts[disaster.type] > 0 ? 'icon-enter' : 'icon-exit'}`}
                                        style={{ cursor: 'pointer', animationDelay: `${index * 0.1}s` }}>
                                        
                                        <FontAwesomeIcon
                                            className="mb-2"
                                            style={{ color: disaster.color, fontSize: '2rem' }}
                                            icon={disaster.icon} />
                                        
                                        <p>{reportCounts[disaster.type]}</p>

                                        {newReportCounts[disaster.type] > 0 && (
                                            <Badge bg="danger" pill className="badge-inside-icon">
                                                {newReportCounts[disaster.type]}
                                            </Badge>
                                        )}
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ReportWidget;
