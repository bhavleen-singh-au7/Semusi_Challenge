import React, { Fragment, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Fallback = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-4">
          Ooops! Look like you've got lost...
        </h2>

        <img
          alt="404"
          src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294456/logo/404_a68e8s.png"
        />
        <br />

        <button
          type="button"
          className="btn-lg btn-outline-primary px-4"
        >
          <i className="fa fa-home"></i>{" "}
          <Link className="myLink" to="/">
            Go Home
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

export default Fallback;
