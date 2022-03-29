import { useState } from "react";
import "../App.css";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [submitDisable, setSubmitDisable] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputs = [
    {
      id: 1,
      name: "fname",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      autoComplete: "off",
    },
    {
      id: 2,
      name: "lname",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      autoComplete: "off",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
      autoComplete: "off",
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: true,
    },
    {
      id: 5,
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
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password don't Match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
      autoComplete: "off",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, email, birthday, password, confirmPassword } = values;
    if (fname && lname && email && birthday && password && confirmPassword) {
      const res = fetch(
        "https://validation-a2b6e-default-rtdb.firebaseio.com/Records.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            email,
            birthday,
            password,
            confirmPassword,
          }),
        }
      );
      if (res) {
        handleSubmission();
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmission = () => {
    setErrorMsg("");
    if (!values.fname || !values.email || !values.password) {
      setErrorMsg("Please Filled the Required Fields");
      return;
    }
    setErrorMsg("");
    setSubmitDisable(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitDisable(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.fname,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitDisable(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <b className="error">{errorMsg}</b>
        <button disabled={submitDisable}>Submit</button>
        <Link to="/" className="link">
          Already Have An Account
        </Link>
      </form>
        {/* <h1>{inputs}</h1> */}
    </div>
  );
};

export default SignUp;
