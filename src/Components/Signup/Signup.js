import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import auth from "../../firebase-config";
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPass, setConfirmPass] = useState({ value: "", error: "" });
  const navigate = useNavigate();

  const handleEmail = (value) => {
    const required = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (required.test(value)) {
      setEmail({ value: value, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid Email" });
    }
  };
  const handlePass = (value) => {
    if (value.length > 5) {
      setPassword({ value: value });
    } else {
      setPassword({ error: "Password is short" });
    }
  };
  const handleConfirmPass = (value) => {
    password.value === value
      ? setConfirmPass({ value: value })
      : setConfirmPass({ error: "Password does not match" });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(email.value, password.value, confirmPass.value);
    if (email?.value && password?.value && confirmPass?.value) {
      createUserWithEmailAndPassword(auth, email.value, confirmPass.value)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            toast.success("Successfully created!", {
              id: "userCreate",
              duration: 5000,
              icon: "👏",
              style: { color: "green", backgroundColor: "whitesmoke" },
            });
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.message.includes("auth/email-already-in-use")) {
            toast.error("User already exists", {
              id: "already",
              style: { color: "red", backgroundColor: "whitesmoke" },
              duration: 6000,
              icon: "X",
            });
          }
        });
    } else {
      toast.error("Invalid Information", {
        id: "invalid-info",
        style: { color: "red", backgroundColor: "whitesmoke" },
        duration: 6000,
        icon: "🚫",
      });
    }
  };
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        if (result.user) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleForm}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onInput={(e) => handleEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <p className="error">{email?.error}</p>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onInput={(e) => handlePass(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <p className="error">{password?.error}</p>
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                onBlur={(e) => handleConfirmPass(e.target.value)}
                type="password"
                id="confirmPassword"
              />
            </div>
            <p className="error">{confirmPass?.error}</p>
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth" onClick={handleGoogleSignUp}>
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
