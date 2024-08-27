import React from "react";
import { BiBookAlt, BiHelpCircle, BiHome, BiMessage, BiSolidReport, BiStats, BiTask } from 'react-icons/bi';
import './Sidebar.css'

export default function Sidebar () {
    return (
        <>
            <div className="menu">
                <div className="logo">
                    <BiBookAlt className="logo-icon"/>
                    <h2>RoyalEcho</h2>
                </div>

                <div className="menu--list">
                    <a href="#" className="item active">
                        <BiHome className="icon"/>
                        Dashboard
                    </a>
                    <a href="#" className="item">
                        <BiTask className="icon"/>
                        Assignments
                    </a>
                    <a href="#" className="item">
                        <BiSolidReport className="icon"/>
                        Report
                    </a>
                    <a href="#" className="item">
                        <BiStats className="icon"/>
                        Stats
                    </a>
                    <a href="#" className="item">
                        <BiMessage className="icon"/>
                        Message
                    </a>
                    <a href="#" className="item">
                        <BiHelpCircle className="icon"/>
                        Help
                    </a>
                </div>
            </div>
        </>
    )
}