/** @format */

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "@/validations/validation";
import { login } from "../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginValidation.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
      // console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    dispatch(login(email, password, navigate));
  };

  return (
    <div className="">
      <form
        noValidate
        onSubmit={handleOnSubmit}
        className="flex w-full font-semibold flex-col gap-y-6  border-[2px] border-black p-6 rounded-md"
      >
        <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.375rem] font-semibold text-richblack-5">
            Email Address
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="form-style  w-full font-semibold p-2 rounded-md bg-white border-[1px] border-black text-black"
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}
        </label>
        <label className="relative">
          <p className="mb-1 text-[1rem] leading-[1.375rem] font-semibold text-richblack-5">
            Password
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="form-style w-full font-semibold !pr-10 p-2 border-[1px] bg-white rounded-md border-black  text-black"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[26px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#000000" />
            )}
          </span>
          {errors.password && (
            <div className="text-red-600">{errors.password}</div>
          )}
        </label>
        <button
          type="submit"
          className="mt-6 font-semibold py-[8px] px-[12px] p-2 text-white bg-red-600 hover:bg-red-700  rounded-md border-[2px] border-red-800"
        >
          Sign In
        </button>

        <div className="flex gap-2 flex-col mt-2">
          <div className="flex gap-2 justify-center items-center">
            <span className="h-[1px] bg-black w-[70%]"></span>
            <span>OR</span>
            <span className="h-[1px] bg-black w-[70%]"></span>
          </div>
          <div className="flex flex-row gap-4 mx-auto justify-center items-center">
            <div className=" font-normal select-none">
              Don't have an account?
            </div>
            <button
              className="text-blue-700 hover:text-blue-950 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              New Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
