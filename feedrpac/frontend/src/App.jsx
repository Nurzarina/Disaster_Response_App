import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmergencies from './components/displayreports/DisplayEmergencies';
import ReportForm from './components/createreport/ReportForm';
import SOSButton from './components/SOSButton';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './components/login/AuthProvider';
import ProtectedRoute from './components/login/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SOSButton />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sosreport" element={<ReportForm />} />
          <Route path="/emergencies" element={<DisplayEmergencies />}>
            <Route path=":disastertype" element={<DisplayEmergencies />} />
          </Route>
          {/* No routes for modals, they are managed internally in DisplayEmergencies */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
