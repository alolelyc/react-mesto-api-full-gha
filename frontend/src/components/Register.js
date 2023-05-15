import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailClick(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordClick(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          className="login__input"
          value={email}
          onChange={handleEmailClick}
          required
        />

        <input
          placeholder="Пароль"
          type="password"
          className="login__input"
          value={password}
          autoComplete="on"
          onChange={handlePasswordClick}
          required
        />

        <button type="submit" className="login__btn">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__title-end">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>{" "}
      </p>
    </section>
  );
}

export default Register;
