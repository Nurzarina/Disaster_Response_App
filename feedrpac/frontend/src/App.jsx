import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmergencies from './components/displayreports/DisplayEmergencies';
import ReportForm from './components/createreport/ReportForm';
import SOSButton from './components/SOSButton';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './components/login/AuthProvider';
import ProtectedRoute from './components/login/ProtectedRoute'; // Import ProtectedRoute
import SidebarNavbar from './components/navbars/SidebarNavbar';
import BottomNavbar from './components/navbars/BottomNavbar';
import Profile from './components/userprofile/Profile';
import './App.css'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <SOSButton /> */}
        {/* <SidebarNavbar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sosreport" element={<ReportForm />} />
          {/* Nested Route */}
          <Route path="/emergencies" element={<DisplayEmergencies />}>
            <Route path=":disastertype" element={<DisplayEmergencies />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          {/* No routes for modals, they are managed internally in DisplayEmergencies */}
        </Routes>
        <BottomNavbar />
      </AuthProvider>
    </Router>
  );
};

export default App;
