import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmergencies from './components/displayreports/DisplayEmergencies';
import ReportForm from './components/createreport/ReportForm';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
// import SidebarNavbar from './components/navbars/SidebarNavbar';
import BottomNavbar from './components/navbars/BottomNavbar';
import Profile from './components/userprofile/Profile';
import UserMissions from './components/missions/UserMissions';
import CreatePost from './components/community/CreatePost';
import Feed from './components/community/Feed';
import { AuthProvider, useAuth } from './components/tobackend/AuthProvider';
import './App.css';

const App = () => {
  return (

    <Router>
      <AuthProvider>
        <AppRoutes />
        <BottomNavbar />
      </AuthProvider>
    </Router>

  );
};

//    This component handles routing, but only renders after the authentication check is complete.
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Show loading while checking auth status
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/sosreport" element={<ReportForm />} />
      <Route path="/emergencies" element={<DisplayEmergencies />}>
        <Route path=":disastertype" element={<DisplayEmergencies />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/missions" element={<UserMissions />} />
      <Route path="/community/createpost" element={<CreatePost />} />
      <Route path="/community/feed" element={<Feed />} />
    </Routes>
  );
};

export default App;
