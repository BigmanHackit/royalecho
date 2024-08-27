import React from "react";

import './Card.css';
import { BiLogoAndroid, BiLogoHtml5, BiLogoMarkdown } from "react-icons/bi";

const funnels = [
    {
        title: 'Accounts',
        icon: <BiLogoHtml5 />,
    },
    {
        title: 'Leads Generated',
        duration: 'Last 30 days',
        icon: <BiLogoAndroid />,
    },
    {
        title: 'Leads Converted',
        duration: 'Last 30 days',
        icon: <BiLogoMarkdown />,
    }
]

export default function Card() {
    return (
        <div className="card--container">
            {funnels.map((item) => (
                <div className="card">
                    <div className="card--cover">{item.icon}</div>
                    <div className="card--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}