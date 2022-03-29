import { useState } from "react";
import "../App.css";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
      autoComplete: "off",
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      autoComplete: "off",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  

  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Please Fill All The Fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };



  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Sign In </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <b className="error">{errorMsg}</b>
        <button onClick={handleSubmission} disabled={submitButtonDisabled}>Log In</button>
        <Link to="/SignUp" className="link">
        Register Account
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
