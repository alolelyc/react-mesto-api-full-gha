import { useState } from "react";

function Login(props) {
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
    props.onLogin(email, password);
  }

  return (
    <main className="content page__content">
      <section className="login">
        <h2 className="login__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
