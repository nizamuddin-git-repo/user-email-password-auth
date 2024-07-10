import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "your password should have a least one upper case characters."
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and conditions!");
      return;
    }
    // create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        updateProfile(result.user, {
          displayName: name,
          photoURL: 'https://example.com/jane-q-user/profile.jpg'
        })
        .then(()=> console.log('Profile update'))
        .catch()










        if (result.user.emailVerified) {
          setSuccess("User Creatd Successfull.");
        } else {
          alert("Please Verify Your Email Address");
        }
        sendEmailVerification(result.user).then(() => {
          alert("Please Check Your Email And Verify Your Account");
        });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="mx-auto">
        <h2 className="text-3xl p-4">Please Register</h2>
        <form onSubmit={handleRegister}>
          <div className="relative">
            <input
              className="mb-4 w-full py-2 px-4 rounded-lg"
              type="text"
              name="name"
              placeholder="Name"
              required
              id=""
            />
            <br />
            <input
              className="mb-4 w-full py-2 px-4 rounded-lg"
              type="email"
              name="email"
              placeholder="Email Adderss"
              required
              id=""
            />
            <br />
            <input
              className="w-full py-2 px-4 rounded-lg mt-1"
              type={showPassword ? "test" : "password"}
              name="password"
              placeholder="Password"
              required
              id=""
            />
            <span
              className="absolute right-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              <div className="flex justify-end mt-3 relative">
                {showPassword ? (
                  <FaEyeSlash className="text-2xl"></FaEyeSlash>
                ) : (
                  <FaEye className="text-2xl"></FaEye>
                )}
              </div>
            </span>
            <br />
            <div className="flex mt-4">
              <input type="checkbox" name="terms" id="terms" />
              <label className="ml-2" htmlFor="terms">
                <a href="">Accept Terms And Conditions</a>
              </label>
            </div>
            <input
              className="btn btn-secondary mt-4 w-full"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        {registerError && <p className="text-red-600 mt-4">{registerError}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
