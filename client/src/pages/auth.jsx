import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      // console.log('response.data', response.data);

      if (response.data.message) {
        alert(response.data.message);
        setPassword('');
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration completed. Login now");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>

        <div className="form-group">
          <label htmlFor={label + '-username'}>Username: </label>
          <input
            type="text"
            id={label + '-username'}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor={label + '-password'}>Password: </label>
          <input
            type="password"
            id={label + '-password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth;
