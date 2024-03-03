import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please Fill all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        formData
      );
      // console.log(res);
      const data = await res.data;
      console.log(data);
      console.log(data);
      setFormData(data.message);
      if (data.success === true) {
        dispatch(signInSuccess(data.rest));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
    }
  };
  return (
    <div className="container " id="formWidth">
      <div className="row">
        <h1 className="text-center my-20 text-3xl font-bold">Sign In</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@example.com"
              onChange={handleChange}
              name="email"
              // value={author}
              // onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="*********"
              onChange={handleChange}
              name="password"
              // value={publishedYear}
              // onChange={(e) => setPublishedYear(e.target.value)}
            />
          </div>

          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="my-5">
          <span>Do not have an account? </span>
          <Link to="/register">
            <span className="text-center my-10 text-xl font-bold">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
