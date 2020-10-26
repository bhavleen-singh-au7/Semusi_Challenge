import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-4">
          The Page Is Under Maintenance.
        </h2>
        <img
          alt="404"
          src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1603704820/logo/maintenance_a5jtvi.png"
        />

        <br />

        <button
          type="button"
          className="btn-lg btn-outline-primary px-4 mx-3"
        >
          <i class="fa fa-home"></i>{" "}
          <Link className="myLink" to="/signup">
            Sign Up
          </Link>
        </button>

        <button
          type="button"
          className="btn-lg btn-outline-primary px-4"
        >
          <i class="fa fa-home"></i>{" "}
          <Link className="myLink" to="/signin">
            Sign In
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

export default Landing;
