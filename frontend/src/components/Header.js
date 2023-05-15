import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="место россия" />
      <nav className="header__menu">
        <p className="header__user-lk">{props.email}</p>
        <Link
          to={props.route}
          type="button"
          className="header__link-btn"
          onClick={props.onClick}
        >
          {props.title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
