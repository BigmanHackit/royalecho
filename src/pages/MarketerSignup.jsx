import Section from "../components/Section";
import Header from "../components/Header/Header";
import Register from "../components/Gateway/Register";
import "../components/PageStyle/MarketerSignup.css";
import "../App.css";

export default function AddMarketer() {
  return (
    <>
    <Header />
    <Section className="body">
      <div className="page-box">
        <Register />
      </div>

      {/* <div className="forms-container">
        <div className="forms">
          <form>
            

          </form>
        </div>
      </div> */}
    </Section>
    </>
  );
}
