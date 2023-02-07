import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BreadCumb from "../component/BreadCumb";
import Input from "../component/utilities/Input";
import Label from "../component/utilities/Label";
import Select from "../component/utilities/Select";
import { useRegisterMutation } from "../features/auth/authApi";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [trcCode, setTrcCode] = useState("");
  const [referralId, setReferralId] = useState("");
  const [errors, setErrors] = useState({});

  // navigation
  const navigate = useNavigate();

  // registation function
  const [register, { data, isLoading, isError, error: responseError }] =
    useRegisterMutation();

  useEffect(() => {
    if (isError) {
      console.log(responseError);
      setErrors(responseError?.data?.error);
    }

    if (data?.user?._id) {
      // show aler message
      toast.success("User Created Successfully");

      // clear state
      setErrors({});
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // navigate to login page
      navigate("/login");
    }
  }, [data, isLoading, isError, responseError, navigate]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // check validation
    const validationErrors = {};

    if (!firstName) {
      validationErrors.firstName = "First Name is required!";
    }

    if (!lastName) {
      validationErrors.lastName = "Last Name is required!";
    }

    if (!email) {
      validationErrors.email = "Email is required!";
    }

    if (!gender) {
      validationErrors.gender = "Gender is required!!";
    }

    if (!phone) {
      validationErrors.phone = "Phone Number is required!!";
    }

    if (!nationalId) {
      validationErrors.nationalId = "National ID number is required!!";
    }

    if (!password) {
      validationErrors.password = "Password is required!!";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required!!";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword =
        "Password and Confirm Password don't match!!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    register({
      firstName,
      lastName,
      phone,
      trcCode,
      email,
      referralId,
      password,
      gender,
      nationalId,
    });
  };
  return (
    <main>
      <BreadCumb page="Register" />
      <div className="container mx-auto py-24">
        <div className="text-center">
          <h2 className="text-5xl mb-6">Register To Logo Here</h2>
          <span className="text-xl text-secondary">
            Register in advance and enjoy the event benefits
          </span>
        </div>

        <div className="w-[50%] mx-auto mt-10">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-8">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.firstName}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.lastName}</p>
                  </div>
                )}
              </div>
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
                <Label htmlFor="referralId">Referral ID</Label>
                <Input
                  type="text"
                  id="referralId"
                  placeholder="Enter your referral Id."
                  value={referralId}
                  onChange={(e) => setReferralId(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="trc">TRC20</Label>
                <Input
                  type="text"
                  id="trc"
                  placeholder="Enter your binance TRC20."
                  value={trcCode}
                  onChange={(e) => setTrcCode(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="whatsappNo">Phone No</Label>
                <Input
                  type="text"
                  id="whatsappNo"
                  placeholder="Enter your phone no with country code."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="nationalId">National ID</Label>
                <Input
                  type="text"
                  id="nationalId"
                  placeholder="Enter your national id number."
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
                {errors.nationalId && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.nationalId}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select id="gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                {errors.gender && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.gender}</p>
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
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="confirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your confirm password."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <div className="mt-2 text-red-600">
                    <p>{errors?.confirmPassword}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input id="radio" type="radio" />
                <Label htmlFor="radio" none>
                  I Verify that I'm 18+
                </Label>
              </div>
              <div>
                <button
                  className="bg-primary text-white block w-full text-base font-medium py-4 outline-none transition-all hover:bg-primary/70 rounded-full"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <p>Already Have An Account?</p>
                <Link className="text-primary font-bold" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
