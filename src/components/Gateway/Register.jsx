import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Section from "../Section";
import "./Register.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%].{8,24})/;

export default function Register() {
  const [action, setAction] = useState("Sign Up");

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button is enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section className="success-container">
          <h1>Success</h1>
          <p>
            <Link to='/marketer-dashboard'>Go to Dashboard</Link>
          </p>
        </section>
      ) : (
        <Section className="body">
          <div className="forms-container">
            {/* <div className="header">
        <div className="text">Sign Uo</div>
      </div> */}
            <div className="forms">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>{action}</h1>
              {/* <div className="underline"></div> */}

              <form onSubmit={handleSubmit}>
                {action == "Login" ? (
                  <div></div>
                ) : (
                  <div className="input">
                    {/* <label htmlFor="username">
              Name: */}
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    {/* </label> */}
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Full Name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters. <br />
                      Must begin with a letter. Letters, numbers, underscores,
                      hyphens allowed.
                    </p>
                  </div>
                )}

                <div className="input">
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    autoComplete="on"
                  />
                </div>

                <div className="input">
                  {/* <label htmlFor="password">Password:</label> */}
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character. Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent sign">%</span>
                  </p>
                </div>

                {action == "Login" ? (
                  <div></div>
                ) : (
                  <div className="input">
                    {/* <label htmlFor="password">Password:</label> */}
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <input
                      type="password"
                      id="confirm_pwd"
                      placeholder="Confirm Password"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters. <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character. Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent sign">%</span>
                    </p>
                  </div>
                )}
                {action == "Login" ? (
                  <div className="forgot-password">
                    Forgot Password? <span>click here</span>
                  </div>
                ) : (
                  <div></div>
                )}

                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Proceed
                </button>
              </form>

              <div className="submit-container">
                <div
                  className={action === "Login" ? "submit gray" : "submit"}
                  onClick={() => setAction("Sign Up")}
                >
                  Sign Up
                </div>
                <div
                  className={action === "Sign Up" ? "submit gray" : "submit"}
                  onClick={() => setAction("Login")}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
