// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmergencies from './components/displayreports/DisplayEmergencies';
import ReportForm from './components/createreport/ReportForm';
import SOSButton from './components/SOSButton';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './components/login/AuthProvider';
// import MoreDetail from './components/MoreDetail';
// import Buttons from './Buttons';
// import ReportWidget from './components/dashboard/ReportWidget';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <Buttons /> */}
        <SOSButton />
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sosreport" element={<ReportForm />} />
          <Route path="/emergencies" element={<DisplayEmergencies />}>
            {/* Nested route for detailed view */}
            <Route path=":disastertype" element={<DisplayEmergencies />} />
          </Route>
          {/* <Route path="/moredetail" element={<MoreDetail />} /> */}

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
