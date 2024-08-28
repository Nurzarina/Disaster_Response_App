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
import ReportForm from '../createreport/ReportForm';

const ReportWidget = () => {
    const navigate = useNavigate();
    const [reportCounts, setReportCounts] = useState({
        Flood: 0,
        Earthquake: 0,
        Landslide: 0,
        Fire: 0,
        Tsunami: 0,
        Volcanoeruption: 0,
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
                Volcanoeruption: 0,
                Drought: 0,
                Tornado: 0
            };

            response.data.forEach(report => {
                if (report.disastertype === 'Flood') counts.Flood++;
                if (report.disastertype === 'Earthquake') counts.Earthquake++;
                if (report.disastertype === 'Landslide') counts.Landslide++;
                if (report.disastertype === 'Fire') counts.Fire++;
                if (report.disastertype === 'Tsunami') counts.Tsunami++;
                if (report.disastertype === "Volcano Eruption") counts.Volcanoeruption++;
                if (report.disastertype === 'Drought') counts.Drought++;
                if (report.disastertype === 'Tornado') counts.Tornado++;
            });

            setReportCounts(counts);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    

    //Pass the 'label' to URL instead of 'type' so that it will be the same as in DisplayEmergencies.js 
    const handleFilterClick = (filter) => {
        const typeLabel = DisasterIcons.find(disaster => disaster.type === filter).label;
        navigate(`/emergencies/${typeLabel}`, { state: { disasterType: typeLabel } });
    };

    return (
        <Container>
            <div className="card text-center shadow-md mx-3">
                <div className="card-header">
                    <h1 id="widgetTitle" className="text-center mb-0 bg-dark text-white">Current Situation</h1>
                    <Link to="/emergencies/All">
                    {/* Add a link to the AllEmergencies component */}
                        <Button variant="primary" className="mb-3" id="viewBtn">View All Emergencies</Button>
                    </Link>
                    {/* Start Icons display */}
                    <div id='icons_collection' className="card-body d-flex justify-content-around flex-wrap mt-2">
                        {DisasterIcons.map(disaster =>
                            reportCounts[disaster.type] > 0 && (
                                <div id='icon' key={disaster.type} onClick={() => handleFilterClick(disaster.type)} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon className="mb-2" style={{ color: disaster.color, fontSize: '2rem' }} icon={disaster.icon} />
                                    <p>{reportCounts[disaster.type]}</p>
                                </div>
                                ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ReportWidget;
