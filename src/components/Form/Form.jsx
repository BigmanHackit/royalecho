import "./Form.css";
import { motion } from "framer-motion";

export default function Form() {
  return (
    <motion.section
     className="form"
     initial={{translateY: -100, opacity: 0}}
     animate={{translateY: 0, opacity: 1}}
     transition={{
        duration: 0.6,
        ease: "easeInOut"
     }}
     >
      <div className="form-title">
        <h1>Get 5 Business-Ready Leads in A Month</h1>
        <p>Fill the Form Below To Get Quotes</p>
      </div>
      <div className="form-bod">
        <input type="text" placeholder="Full Name"/>
        <input type="text" placeholder="Address"/>
        <input type="email" placeholder="Email"/>
        <input type="tel" placeholder="Phone no."/>
        <button>Submit</button>
      </div>
    </motion.section>
  );
}
