import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signin = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div
          className="d-flex justify-content-center  align-items-center"
          style={{ height: "80vh" }}
        >
          <form className="p-5 rounded bg-primary">
            <h2 className="text-light mb-5 text-center">
              <ins>Sign In</ins>
            </h2>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa fa-at"></i>
                </span>
              </div>
              <input
                type="email"
                // name=""
                className="form-control"
                // value=""
                placeholder="Enter Email"
              />
            </div>

            <div className="input-group mb-5">
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
              </div>
              <input
                type="password"
                // name=""
                className="form-control input_pass"
                // value=""
                placeholder="Password"
              />
            </div>

            <div className="d-flex justify-content-center mt-3 login_container">
              <button
                type="submit"
                className="btn btn-block btn-outline-light"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <h6>
            Don't have an Account?{" "}
            <Link to="/signup">SignUp</Link>
          </h6>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
