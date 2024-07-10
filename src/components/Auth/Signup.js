import React from "react";
import { FaAt, FaLock, FaUser } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="center-wrap">
      <div className="section text-center">
        <h4 className="mb-4 pb-3">Sign Up</h4>
        <div className="form-group">
          <input
            type="text"
            name="logname"
            className="form-style"
            placeholder="Your Full Name"
            id="logname"
            autoComplete="off"
          />
          <i className="input-icon">
            <FaUser />
          </i>
        </div>
        <div className="form-group mt-2">
          <input
            type="email"
            name="logemail"
            className="form-style"
            placeholder="Your Email"
            id="logemail"
            autoComplete="off"
          />
          <i className="input-icon">
            <FaAt />
          </i>
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            name="logpass"
            className="form-style"
            placeholder="Your Password"
            id="logpass"
            autoComplete="off"
          />
          <i className="input-icon">
            <FaLock />
          </i>
        </div>
        <a href="#" className="btn mt-4">
          submit
        </a>
      </div>
    </div>
  );
};

export default SignUp;
