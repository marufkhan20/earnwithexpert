import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BreadCumb from "../component/BreadCumb";
import Input from "../component/utilities/Input";
import Label from "../component/utilities/Label";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // navigation
  const navigate = useNavigate();

  // registation function
  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      console.log(responseError);
      setErrors(responseError?.data?.error);
    }

    console.log(data);

    if (data?.user?._id) {
      // show aler message
      toast.success("User Logged In Successfully");

      // clear state
      setErrors({});
      setEmail("");
      setPassword("");

      // navigate to login page
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/profile/${data?.user?._id}`);
      }
    }
  }, [data, isLoading, isError, responseError, navigate]);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!email) {
      validationError.email = "Email is required";
    }

    if (!password) {
      validationError.password = "Password is required";
    }

    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }

    // create new user
    login({ email, password });
  };
  return (
    <main>
      <BreadCumb page="Login" />
      <div className="container mx-auto py-24">
        <div className="text-center">
          <h2 className="text-5xl mb-6">Login To Logo Here</h2>
          <span className="text-xl text-secondary">
            Welcome back! Log In now to start trading
          </span>
        </div>

        <div className="w-[50%] mx-auto mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.email}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.password}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" />
                    <label
                      className="text-base text-secondary"
                      htmlFor="remember"
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link className="text-red-600" to="/">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className="bg-primary text-white block w-full text-base font-medium py-4 outline-none transition-all hover:bg-primary/70 rounded-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <p>Not A Member?</p>
                <Link className="text-primary font-bold" to="/register">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
