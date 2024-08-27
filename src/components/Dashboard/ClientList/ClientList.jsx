import React, { useState } from "react";
import "./ClientList.css";
import Logo1 from "../../../../public/images/favicon.png";

const CLIENTS = {
  solar: [
    {
      image: Logo1,
      name: "RoyalEcho",
      mail: "royalechoads@gmail.com",
      a: "https://www.royalecho.ng",
      web: "royalecho.ng",
    },
  ],
  realestate: [
    {
    image: Logo1,
    name: "AATSolar",
    mail: "aatsolar@gmail.com",
    a: "https://www.aatsolar.com",
    web: "aatsolar.com",
  },
]
  
};

export default function ClientList() {
  const [clientGroup, setClientGroup] = useState("");

  function clickSelected(select) {
    setClientGroup(select)
  }

  let sectionContent = <h2>Select client group</h2>;

  if (clientGroup) {
    sectionContent = (
      <ul>
        <li>
        <div className="list--container">
      {/* {CLIENTS.map((client) => ( */}
          <div className="list">
            <div className="client--detail">
              <img src={CLIENTS[clientGroup].image} alt={CLIENTS[clientGroup].name} />
              <h2>{CLIENTS[clientGroup].name}</h2>

            </div>
            <span><a href={CLIENTS[clientGroup].a}>{CLIENTS[clientGroup].web}</a></span>
            <span>{CLIENTS[clientGroup].mail}</span>
          </div>
        {/* ))} */}
      </div>
        </li>
      </ul>
    )
  }
  return (
    <div className="client--list">
      <div className="list--header">
        <h2>Clients</h2>
        <select>
          <option value="">Select Client Group</option>
          <option
           value="solar" 
           onClick={() => clickSelected("solar")}
           >
            Solar
          </option>
          <option value="realEstate">Real Estate</option>
          <option value="architecture">Architecture</option>
          <option value="interior">Interior Decorations</option>
          <option value="catering">Catering</option>
          <option value="event">Event Management</option>
        </select>
      </div>
      {sectionContent}
    </div>
  );
}
