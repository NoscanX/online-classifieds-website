import "../styles/login-failure-styles.css";
import { Link } from "react-router-dom";

const LoginFailure = () => {
  return (
    <div className="main-failure-container">
      <div className="header-wrapper">
        <h2>Coś poszło nie tak.</h2>
        <h3>
          <Link to="/">Kliknij tutaj</Link>, aby wrócić do strony głównej i
          spróbuj ponownie.
        </h3>
      </div>
    </div>
  );
};

export default LoginFailure;
