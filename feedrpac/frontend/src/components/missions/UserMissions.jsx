import { useEffect, useState } from 'react'; // Import React hooks for managing state and lifecycle
import { StopVolunteeringButton } from "../utils/AddOrRemoveVolunteer"; // Import custom button component
import { useAuth } from '../tobackend/AuthProvider'; // Import custom authentication context
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components for UI
import { Link } from 'react-router-dom'; // Import Link for navigation
import axiosInstance from '../tobackend/axiosInstance'; // Custom Axios instance for API requests
import './UserMission.css'; // Import custom CSS for styling the component

function UserMissions() {
  const { user } = useAuth(); // Retrieve current user from custom AuthProvider context
  const [ongoingMissions, setOngoingMissions] = useState([]); // State to store ongoing missions
  const [previousMissions, setPreviousMissions] = useState([]); // State to store previous missions
  const [missionDetails, setMissionDetails] = useState({}); // State to store detailed information about missions
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch user missions when the component mounts or when the user changes
  useEffect(() => {
    if (user) {
      fetchUserMissions(); // If user is authenticated, fetch their missions
    }

    // Clean up when component unmounts
    return () => {
      setOngoingMissions([]);
      setPreviousMissions([]);
      setMissionDetails({});
      setLoading(true);
    };
  }, [user]); // The effect runs whenever the user changes

  // Function to fetch user missions from the server
  const fetchUserMissions = async () => {
    setLoading(true); // Set loading state to true

    try {
      const response = await axiosInstance.get(`http://localhost:5050/api/auth/me`); // Get current user's mission data
      const userData = response.data;

      // Set ongoing and previous missions based on the user's data
      setOngoingMissions(userData.ongoingMission || []);
      setPreviousMissions(userData.prevMission || []);

      // Get all mission IDs from both ongoing and previous missions
      const missionIds = [
        ...userData.ongoingMission.map((mission) => mission.missionId),
        ...userData.prevMission.map((mission) => mission.missionId),
      ];

      // Fetch detailed data for each mission by ID
      const detailsResponses = await Promise.all(
        missionIds.map((id) => axiosInstance.get(`http://localhost:5050/api/reports/${id}`))
      );

      // Create an object that maps mission ID to mission details
      let details = detailsResponses.reduce((acc, curr) => {
        acc[curr.data._id] = curr.data;
        return acc;
      }, {});

      // Update mission details with the status from the user's mission data
      userData.prevMission.forEach(mission => {
        if (details[mission.missionId]) {
          details[mission.missionId].status = mission.status;
        }
      });

      userData.ongoingMission.forEach(mission => {
        if (details[mission.missionId]) {
          details[mission.missionId].status = mission.status;
        }
      });

      setMissionDetails(details); // Set detailed mission information in state
      setLoading(false); // Stop the loading state
    } catch (error) {
      console.error("Error fetching user missions:", error); // Handle errors
      setLoading(false);
    }
  };

  // Handle stopping a volunteering mission
  const handleStopVolunteering = async (reportId) => {
    try {
      await axiosInstance.post(`http://localhost:5050/api/stop-volunteering`, { reportId, userId: user._id }); // Send request to stop volunteering
      await fetchUserMissions(); // Re-fetch missions to reflect changes
    } catch (error) {
      console.error("Error stopping volunteering:", error); // Handle errors
    }
  };

  // If user is not authenticated, show a prompt to log in
  if (!user) {
    return (
      <Container fluid className="d-flex align-items-center justify-content-center vh-100">
        <Card className="text-center p-4 shadow-lg">
          <Card.Body>
            <Card.Title>Please Log In</Card.Title>
            <Card.Text>To view your missions.</Card.Text>
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <h1 className="display-4"><b>Your Missions Overview</b></h1>
            <p className="lead" style={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light semi-transparent background
              padding: '0.5rem',
              borderRadius: '5px'
            }}>
              Manage your ongoing and past missions here.
            </p>
          </Col>
        </Row>

        {/* Ongoing Missions */}
        <Row>
          <Col md={6}>
            <Card className="mt-3">
              <Card.Header>Your Ongoing Missions</Card.Header>
              <ListGroup variant="flush">
                {loading ? (
                  <ListGroup.Item>Loading...</ListGroup.Item>
                ) : ongoingMissions.length > 0 ? (
                  ongoingMissions.map((mission) => {
                    const missionDetail = missionDetails[mission.missionId] || {}; // Get mission details by ID
                    return (
                      <ListGroup.Item key={mission.missionId}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{missionDetail.name || 'No name available'}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {missionDetail.disastertype || 'No disaster type available'}
                            </Card.Subtitle>
                            <Card.Text>
                              <strong>Description:</strong> {missionDetail.description || 'No description available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Location:</strong> {missionDetail.city || 'No city available'}, {missionDetail.state || 'No state available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Phone:</strong> {missionDetail.phone || 'No phone number available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Severity:</strong> {missionDetail.severity || 'No severity available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Status: </strong>
                              <span className={`status-${missionDetail.status?.toLowerCase()}`}>
                                {missionDetail.status || 'No status available'}
                              </span>
                            </Card.Text>
                            {missionDetail.status === 'ongoing' && (
                              <StopVolunteeringButton
                                reportId={mission.missionId}
                                userId={user._id}
                                onClick={() => handleStopVolunteering(mission.missionId)} // Button to stop volunteering
                              />
                            )}
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <ListGroup.Item>No ongoing missions found.</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>

          {/* Previous Missions */}
          <Col md={6}>
            <Card className="mt-3">
              <Card.Header>Previous Missions</Card.Header>
              <ListGroup variant="flush">
                {loading ? (
                  <ListGroup.Item>Loading...</ListGroup.Item>
                ) : previousMissions.length > 0 ? (
                  previousMissions.map((mission) => {
                    const missionDetail = missionDetails[mission.missionId] || {}; // Get mission details by ID
                    return (
                      <ListGroup.Item key={mission.missionId}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{missionDetail.name || 'No name available'}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {missionDetail.disastertype || 'No disaster type available'}
                            </Card.Subtitle>
                            <Card.Text>
                              <strong>Description:</strong> {missionDetail.description || 'No description available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Location:</strong> {missionDetail.city || 'No city available'}, {missionDetail.state || 'No state available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Phone:</strong> {missionDetail.phone || 'No phone number available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Severity:</strong> {missionDetail.severity || 'No severity available'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Status: </strong>
                              <span className={`status-${mission.status.toLowerCase()}`}>
                                {mission.status || 'No status available'}
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <ListGroup.Item>No previous missions found.</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserMissions;
