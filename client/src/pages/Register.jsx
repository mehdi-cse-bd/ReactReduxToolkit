import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  // console.log(formData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("please Fill all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      // console.log(res.data.success);
      const data = await res.data;
      setFormData(data.message);
      if (res.data.success === true) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.data.message);
      setLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="container " id="formWidth">
      <div className="row">
        <h1 className="text-center my-20 text-3xl font-bold">Registration</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 ">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mehdi Hasan"
              onChange={handleChange}
              name="username"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>
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
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="my-5">
          <span>Have an account already? </span>
          <Link to="/sign-in">
            <span className="text-center my-10 text-xl font-bold">SignIn</span>
          </Link>
        </div>

        {/* {errorMessage && (
          <Alert className="mt-1" color="failure">
            {errorMessage}
          </Alert>
        )} */}
      </div>
    </div>
  );
};

export default Register;
