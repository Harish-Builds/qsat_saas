import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FlightDataCenter from './pages/flight-data-center';
import ParticipantPortal from './pages/participant-portal';
import MissionControlDashboard from './pages/mission-control-dashboard';
import StudentInnovationShowcase from './pages/student-innovation-showcase';
import LaunchEventHub from './pages/launch-event-hub';
import RecoveryOperations from './pages/recovery-operations';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FlightDataCenter />} />
        <Route path="/flight-data-center" element={<FlightDataCenter />} />
        <Route path="/participant-portal" element={<ParticipantPortal />} />
        <Route path="/mission-control-dashboard" element={<MissionControlDashboard />} />
        <Route path="/student-innovation-showcase" element={<StudentInnovationShowcase />} />
        <Route path="/launch-event-hub" element={<LaunchEventHub />} />
        <Route path="/recovery-operations" element={<RecoveryOperations />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
