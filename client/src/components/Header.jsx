import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link to="/">
        <span>MehdiMyMan</span>
      </Link>
      <Link to="/projects">
        <span>Projects</span>
      </Link>

      <Link to="/dashboard">
        <span>Dashboard</span>
      </Link>
      <Link to="/about">
        <span>About</span>
      </Link>
      <Link to="/register">
        <span>Register</span>
      </Link>
      <Link to="/sign-in">
        <span>SignIn</span>
      </Link>
      <form>
        <TextInput type="text" placeholder="Search..." />
      </form>
    </Navbar>
  );
};

export default Header;
