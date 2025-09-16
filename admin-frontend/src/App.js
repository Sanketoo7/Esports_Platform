// /Users/sanket/Desktop/esports-platform/admin-frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import CreateTournament from "./pages/CreateTournament";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import TournamentManagement from "./pages/TournamentManagement";
import Analytics from "./pages/Analytics";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-tournament"
          element={
            <PrivateRoute>
              <Layout>
                <CreateTournament />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/user-management"
          element={
            <PrivateRoute>
              <Layout>
                <UserManagement />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tournament-management"
          element={
            <PrivateRoute>
              <Layout>
                <TournamentManagement />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Layout>
                <Analytics />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Catch-all → redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;