import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="container " id="formWidth">
      {/* {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )} */}
      <div className="row">
        <h1 className="text-center my-10 text-3xl font-bold">Sign In Form</h1>
        <form
        //  onSubmit={handleFormSubmit}
        >
          {/* <div className="mb-4 ">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mehdi Hasan"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div> */}
          <div className="mb-4">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@example.com"
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
              // value={publishedYear}
              // onChange={(e) => setPublishedYear(e.target.value)}
            />
          </div>

          <button
            id="submitButton"
            name="submitButton"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        <div>
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
