import { useEffect, useState } from 'react';
import { StopVolunteeringButton } from "../utils/AddOrRemoveVolunteer";
import { useAuth } from '../tobackend/AuthProvider';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../tobackend/axiosInstance';

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

      const missionIds = [...userData.ongoingMission.map(mission => mission.missionId), ...userData.prevMission.map(mission => mission.missionId)];
      const detailsResponses = await Promise.all(
        missionIds.map(id => axiosInstance.get(`http://localhost:5050/api/reports/${id}`))
      );

      const details = detailsResponses.reduce((acc, curr) => {
        acc[curr.data._id] = curr.data;
        return acc;
      }, {});

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
      fetchUserMissions(); // Re-fetch missions to update state
    } catch (error) {
      console.error("Error stopping volunteering:", error);
    }
  };

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
        <Card className="mt-3">
          <Card.Header>Your Ongoing Missions</Card.Header>
          <ListGroup variant="flush">
            {loading ? (
              <ListGroup.Item>Loading...</ListGroup.Item>
            ) : ongoingMissions.length > 0 ? (
              ongoingMissions.map((mission) => {
                const missionDetail = missionDetails[mission.missionId] || {};
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
                          <strong>Location:</strong> {missionDetail.location?.city || 'No city available'}, {missionDetail.location?.state || 'No state available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Phone:</strong> {missionDetail.phone || 'No phone number available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Severity:</strong> {missionDetail.severity || 'No severity available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Status:</strong> {missionDetail.status || 'No status available'}
                        </Card.Text>
                        <StopVolunteeringButton
                          reportId={mission.missionId}
                          userId={user._id}
                          onClick={() => handleStopVolunteering(mission.missionId)}
                        />
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

        <Card className="mt-3">
          <Card.Header>Previous Missions</Card.Header>
          <ListGroup variant="flush">
            {loading ? (
              <ListGroup.Item>Loading...</ListGroup.Item>
            ) : previousMissions.length > 0 ? (
              previousMissions.map((mission) => {
                const missionDetail = missionDetails[mission.missionId] || {};
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
                          <strong>Location:</strong> {missionDetail.location?.city || 'No city available'}, {missionDetail.location?.state || 'No state available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Phone:</strong> {missionDetail.phone || 'No phone number available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Severity:</strong> {missionDetail.severity || 'No severity available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Status:</strong> {missionDetail.status || 'No status available'}
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
      </Container>
    );
  }
}

export default UserMissions;
