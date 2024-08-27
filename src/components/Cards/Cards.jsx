import { Link } from "react-router-dom";
import "./Cards.css";

export default function Cards({ wideImg, cost, url, phoneImg, title }) {
  return (
    <li>
      <div className="cards">
        <div className="cards-wide">
          <img src={wideImg} alt="" />
        </div>
        <div className="buy">
          <h2># {cost}</h2>
          <button>Buy</button>
        </div>
        <Link to={url}>Preview</Link>

        <div className="cards-phone">
          <img src={phoneImg} alt="" />
        </div>
      </div>
      <h3>{title}</h3>
    </li>
  );
}
