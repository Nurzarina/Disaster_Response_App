import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate, Link } from 'react-router-dom';
import './ReportWidget.css'
import { Container, Button } from 'react-bootstrap';
import { DisasterIcons } from '../others/EmergencyIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reportLink } from '../backendAddress/reportURL';

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

    useEffect(() => {
        fetchReports();

        // const intervalId = setInterval(fetchReports, 1000); // Fetch reports every 1 seconds
        // return () => clearInterval(intervalId); // Cleanup on component unmount
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

            setReportCounts(counts);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleFilterClick = (filter) => {
        const typeLabel = DisasterIcons.find(disaster => disaster.type === filter).label;
        navigate(`/emergencies/${typeLabel}`, { state: { disasterType: typeLabel } });
    };

     // Check if all report counts are zero
     const noReports = Object.values(reportCounts).every(count => count === 0);

    

    return (
        <Container fluid id='icons-container'>
            <div id='widgetBorder' className="card text-center mx-3">
                <div className="card-header">
                    <h2 id="widgetTitle" className="text-center mb-0 bg-dark text-white">Current Situation</h2>
                    
                    {noReports ? (
                            <></>       // Don't render button if there is no reports at all.
                        ) :
                    (
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
                                        style={{ cursor: 'pointer', animationDelay: `${index * 0.1}s`}}>
                                        <FontAwesomeIcon
                                            className="mb-2"
                                            style={{ color: disaster.color, fontSize: '2rem' }}
                                            icon={disaster.icon} />
                                        <p>{reportCounts[disaster.type]}</p>
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
