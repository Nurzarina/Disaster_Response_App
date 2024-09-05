
import { useEffect, useState } from 'react';
import { StopVolunteeringButton } from "../utils/AddOrRemoveVolunteer";
import { useAuth } from '../tobackend/AuthProvider';
import { Container, Card, Button, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import axiosInstance from '../tobackend/axiosInstance';
import './UserMission.css';

function UserMissions() {
  const { user } = useAuth();
  const [ongoingMissions, setOngoingMissions] = useState([]);
  const [previousMissions, setPreviousMissions] = useState([]);
  const [missionDetails, setMissionDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserMissions();
    }

    return () => {
      setOngoingMissions([]);
      setPreviousMissions([]);
      setMissionDetails({});
      setLoading(true);
    };
  }, [user]);

  const fetchUserMissions = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`http://localhost:5050/api/auth/me`);
      const userData = response.data;

      setOngoingMissions(userData.ongoingMission || []);
      setPreviousMissions(userData.prevMission || []);

      const missionIds = [
        ...userData.ongoingMission.map((mission) => mission.missionId),
        ...userData.prevMission.map((mission) => mission.missionId),
      ];

      const detailsResponses = await Promise.all(
        missionIds.map((id) => axiosInstance.get(`http://localhost:5050/api/reports/${id}`))
      );

      let details = detailsResponses.reduce((acc, curr) => {
        acc[curr.data._id] = curr.data;
        return acc;
      }, {});

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

      setMissionDetails(details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user missions:", error);
      setLoading(false);
    }
  };

  const handleStopVolunteering = async (reportId) => {
    try {
      await axiosInstance.post(`http://localhost:5050/api/stop-volunteering`, { reportId, userId: user._id });
      await fetchUserMissions(); // Ensure fresh data is fetched after stopping volunteering
    } catch (error) {
      console.error("Error stopping volunteering:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Ongoing Missions Column */}
        <Col md={6}>
          <Card >
            <Card.Header>Your Ongoing Missions</Card.Header>
            <ListGroup variant="flush">
              {loading ? (
                <ListGroup.Item className="text-center">
                  <Spinner animation="border" variant="primary" />
                </ListGroup.Item>
              ) : ongoingMissions.length > 0 ? (
                ongoingMissions.map((mission) => {
                  const missionDetail = missionDetails[mission.missionId] || {};
                  return (
                    <ListGroup.Item key={mission.missionId}>
                      <Card className={`mission-card mission-${missionDetail.severity?.toLowerCase()}`}>
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
                            <strong>Status: </strong>
                            <span className={`status-${missionDetail.status?.toLowerCase()}`}>
                              {missionDetail.status || 'No status available'}
                            </span>
                          </Card.Text>
                          {missionDetail.status === 'ongoing' && (
                            <StopVolunteeringButton
                              reportId={mission.missionId}
                              userId={user._id}
                              onClick={() => handleStopVolunteering(mission.missionId)}
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

        {/* Previous Missions Column */}
        <Col md={6}>
          <Card className="mt-3">
            <Card.Header>Previous Missions</Card.Header>
            <ListGroup variant="flush">
              {previousMissions.length > 0 ? (
                previousMissions.map((mission) => {
                  const missionDetail = missionDetails[mission.missionId] || {};
                  return (
                    <ListGroup.Item key={mission.missionId}>
                      <Card className={`mission-card mission-${missionDetail.severity?.toLowerCase()}`}>
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
                            <strong>Status: </strong>
                            <span className={`status-${mission.status?.toLowerCase()}`}>
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

export default UserMissions;
