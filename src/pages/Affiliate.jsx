import Section from "../components/Section";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom"

import "../components/PageStyle/Affiliate.css";
import "../App.css";

export default function Affiliate() {
  return (
    <>
      <Header />
      <Section className="body">
        <div className="page-box">
          <div className="affiliate-intro">
            <div className="intro-details">
              <h1>
                Become an affiliate <span>Marketer</span> or{" "}
                <span>Developer</span> for RoyalEcho and <span>grow</span> with
                us financially.
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                vitae! Nesciunt modi rem, dolor perferendis enim, vel numquam
                quia placeat soluta cumque facere. Pariatur nisi labore
                repudiandae illo. Amet, rem? Molestiae reprehenderit quibusdam,
                voluptatibus rem molestias corporis eos nihil iusto possimus
                asperiores suscipit perspiciatis impedit enim officiis
                consectetur accusamus optio magni vitae illo repellendus dolore
                corrupti earum! Nobis, reiciendis dignissimos?
              </p>
              <div className="actions">
                <Link to="/signup-marketer">Marketer</Link>
                <Link to="/">Web Developer</Link>
              </div>
            </div>
            <img src="" alt="" />
          </div>

          <div className="top-marketers">
            <h1>
              Our Top <span>Marketers</span>
            </h1>
            <div className="marketers">
              <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                <div className="card-details">
                  <h4>Eke D. Nnanyereugo</h4>
                  <p>Facebook, Instagram</p>
                  <p>100 accounts</p>
                </div>
              </div>
              <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                <div className="card-details">
                  <h4>Eke D. Nnanyereugo</h4>
                  <p>Facebook, Instagram</p>
                  <p>100 accounts</p>
                </div>
              </div>
              <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                <div className="card-details">
                  <h4>Eke D. Nnanyereugo</h4>
                  <p>Facebook, Instagram</p>
                  <p>100 accounts</p>
                </div>
              </div>
              <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                <div className="card-details">
                  <h4>Eke D. Nnanyereugo</h4>
                  <p>Facebook, Instagram</p>
                  <p>100 accounts</p>
                </div>
              </div>
              <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                <div className="card-details">
                  <h4>Eke D. Nnanyereugo</h4>
                  <p>Facebook, Instagram</p>
                  <p>100 accounts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="marketing-details">
            <h3>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
              pariatur, necessitatibus aperiam sit harum maxime optio
              consectetur culpa placeat labore adipisci quaerat ratione incidunt
              alias voluptatibus facere, quidem, et debitis. Et, accusamus
              aliquid beatae odio mollitia reprehenderit nobis officiis dolorem
              ab at natus, harum dolore accusantium animi placeat vel sapiente
              quod quo, ipsum perspiciatis architecto iusto eius. Itaque,
              distinctio nisi. Sequi ipsum impedit, quasi nam excepturi eligendi
              ab molestiae autem, saepe maiores blanditiis fugiat non
              repellendus. Veniam sint illum enim, ipsa cupiditate voluptates,
              necessitatibus sapiente tenetur, repudiandae suscipit dolores
              nihil? Unde incidunt sequi ipsam laborum perspiciatis quae labore
              animi officia similique sapiente quisquam nisi doloribus ipsum
              modi praesentium et consequuntur autem corporis, delectus
              asperiores error aut, vero possimus. Quibusdam, ducimus.
            </h3>
          </div>

          <div className="top-developers">
            <h1>
              Our Top <span>Web Developers</span>
            </h1>
            <div className="developers">
              <div className="marketers">
                <div className="cards">
                  
                <img src="../../public/images/avatar.png" alt="" />
                  <div className="card-details">
                    <h4>Eke D. Nnanyereugo</h4>
                    <p>230 Websites</p>
                  </div>
                </div>
                <div className="cards">                  
                <img src="../../public/images/avatar.png" alt="" />
                  <div className="card-details">
                    <h4>Eke D. Nnanyereugo</h4>
                    <p>190 Websites</p>
                  </div>
                </div>
                <div className="cards">                  
                <img src="../../public/images/avatar.png" alt="" />
                  <div className="card-details">
                    <h4>Eke D. Nnanyereugo</h4>
                    <p>150 Websites</p>
                  </div>
                </div>
                <div className="cards">                  
                <img src="../../public/images/avatar.png" alt="" />
                  <div className="card-details">
                    <h4>Eke D. Nnanyereugo</h4>
                    <p>100 Websites</p>
                  </div>
                </div>
                <div className="cards">
                <img src="../../public/images/avatar.png" alt="" />
                  <div className="card-details">
                    <h4>Eke D. Nnanyereugo</h4>
                    <p>98 Websites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="developer-details">
            <h3>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
              pariatur, necessitatibus aperiam sit harum maxime optio
              consectetur culpa placeat labore adipisci quaerat ratione incidunt
              alias voluptatibus facere, quidem, et debitis. Et, accusamus
              aliquid beatae odio mollitia reprehenderit nobis officiis dolorem
              ab at natus, harum dolore accusantium animi placeat vel sapiente
              quod quo, ipsum perspiciatis architecto iusto eius. Itaque,
              distinctio nisi. Sequi ipsum impedit, quasi nam excepturi eligendi
              ab molestiae autem, saepe maiores blanditiis fugiat non
              repellendus. Veniam sint illum enim, ipsa cupiditate voluptates,
              necessitatibus sapiente tenetur, repudiandae suscipit dolores
              nihil? Unde incidunt sequi ipsam laborum perspiciatis quae labore
              animi officia similique sapiente quisquam nisi doloribus ipsum
              modi praesentium et consequuntur autem corporis, delectus
              asperiores error aut, vero possimus. Quibusdam, ducimus.
            </h3>
          </div>

        </div>
      </Section>
    </>
  );
}
