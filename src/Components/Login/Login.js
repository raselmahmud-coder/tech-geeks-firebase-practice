import React from "react";
import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase-config";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            toast.success("Successfully Logged in!", {
              id: "userCreate",
              duration: 5000,
              icon: "👏",
              style: { color: "green", backgroundColor: "whitesmoke" },
            });
            navigate("/");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (
            errorMessage.includes(
              "auth/wrong-password" || "auth/user-not-found"
            )
          ) {
            toast.error("User not found", {
              id: "invalid-info",
              style: { color: "red", backgroundColor: "whitesmoke" },
              duration: 6000,
              icon: "🚫",
            });
          }
        });
    } else {
      toast.error("invalid or empty", {
        id: "empty",
        duration: 5000,
        style: { color: "red", backgroundColor: "whitesmoke" },
        icon: "❌",
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
        <h1>Login</h1>
        <form onSubmit={handleForm}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input type="text" id="email" />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input type="password" id="password" />
            </div>
          </div>
          <button type="submit" className="auth-form-submit">
            Login
          </button>
        </form>
        <p className="redirect">
          New to Tech Geeks?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button onClick={handleGoogleSignUp} className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
