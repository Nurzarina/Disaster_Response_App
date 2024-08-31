import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmergencies from './components/displayreports/DisplayEmergencies';
import ReportForm from './components/createreport/ReportForm';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import SidebarNavbar from './components/navbars/SidebarNavbar';
import BottomNavbar from './components/navbars/BottomNavbar';
import Profile from './components/userprofile/Profile';
import { AuthProvider, useAuth } from './components/backendAddress/AuthProvider';
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
    </Routes>
  );
};

export default App;
