import { Routes, Route, Navigate } from "react-router-dom";

//public pages
import VisitorsLayout from "./visitors/layout/Layout";
import Home from "./visitors/Home";

//visitors page
import OpenAccount from "./customers/pages/OpenAccount";

//customers pages
import Layout from "./customers/layout/CustomerLayout";
import Dashboard from "./customers/pages/Dashboard";
import Profile from "./customers/pages/Profile";

import ApplyAccounts from "./customers/pages/ApplyAccounts";
import Account from "./customers/pages/Accounts";
import Transfer from "./customers/pages/Transfer";

import ApplyCard from "./customers/pages/ApplyCard";
import Cards from "./customers/pages/Cards";

import Bills from "./customers/pages/Bills";
import Statement from "./customers/pages/Statement";
import Logout from "./customers/pages/Logout";

//security
import { AuthProvider } from "./security/AuthContext";

import AdminAuth from "./security/AdminAuth";
import OpenAuth from "./security/OpenAuth";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<VisitorsLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/" element={<AdminAuth />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply-account" element={<ApplyAccounts />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/apply-card" element={<ApplyCard />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Route>

        <Route path="/" element={<OpenAuth />}>
          <Route path="/open-account" element={<OpenAccount />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
