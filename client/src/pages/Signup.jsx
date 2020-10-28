import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";

const Signup = ({ history, location }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(
    ""
  );
  const [message, setMessage] = useState(null);

  const userRegister = useSelector(
    (state) => state.userRegister
  );
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(signup(name, email, password));
    }
  };

  const SignupForm = () => (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <form
          className="p-5 rounded-lg bg-primary"
          onSubmit={submitHandler}
        >
          <h2 className="text-light mb-5 text-center">
            <ins>Sign Up</ins>
          </h2>

          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fa fa-user"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fa fa-at"></i>
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="far fa-key"></i>
              </span>
            </div>
            <input
              type="password"
              className="form-control input_pass"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
              className="form-control input_pass"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-block btn-outline-light"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <h6>
          Have an Account? <Link to="/signin">SignIn</Link>
        </h6>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Navbar />
      <ToastContainer />
      {message && toast.error(message)}
      {error && toast.error(error)}
      {loading && <Loader />}
      {SignupForm()}
    </Fragment>
  );
};

export default Signup;
