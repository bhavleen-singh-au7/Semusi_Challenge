import React, { Fragment } from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-4">Page Under Construction</h2>

        <img
          alt="404"
          src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1603704820/logo/maintenance_a5jtvi.png"
          width="40%"
        />
        <br />

        <div className="w-50 bg-danger text-left text-light p-2">
          <p className="mt-4">
            <strong>Signup/Signin with PERN Stack</strong>
            <ul>
              <li>PostgreSQL</li>
              <li>ExpressJs</li>
              <li>ReactJs</li>
              <li>NodeJs</li>
            </ul>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
