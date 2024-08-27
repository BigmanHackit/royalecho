import React, { useState } from "react";

import Section from "../components/Section";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import "../components/PageStyle/MarketerDashboard.css";
import Profile from "../components/Dashboard/Profile/Profile";
import Content from "../components/Dashboard/Content/Content";

export default function MarketerDash() {
  return (
    <div className="board--body">
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard--content">
          <Content />
          <Profile />
        </div>
      </div>
    </div>
  );
}
