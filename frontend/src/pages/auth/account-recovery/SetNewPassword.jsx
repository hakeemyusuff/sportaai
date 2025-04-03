import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Background from "../../../components/ui/BackGround";
import GradientButton from "../../../components/ui/GradientButton";
import TextField from "../../../components/ui/TextField";
import { resetPasswordConfirm } from "../../../api/auth";

const schema = z
  .object({
    otp: z.string().length(4, "OTP must be exactly 4 digits"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const SetNewPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Set New Password | Sporta AI";
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleChange = (index, value) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("otp", newOtp.join("")); 

      if (index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setValue("otp", newOtp.join("")); 

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); 
    setError(null); 

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setError("No email found. Please restart the reset process.");
      setLoading(false); 
      return;
    }

    try {
      const { otp, newPassword, confirmNewPassword } = data;
      const response = await resetPasswordConfirm({
        email,
        otp: otp,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      });

      console.log("Password reset response:", response);

      if (response.success) {
        navigate("/login");
      } else {
        setError(response.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background bgImage="/images/bg.png">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-7 left-7 px-4 py-2 rounded-full hover:bg-white/20 transition-opacity duration-200"
      >
        <img src="/images/back.png" alt="Back" className="w-5 h-5" />
      </button>

      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex justify-center w-full p-8 h-screen max-1075:h-fit"
      >
        <div className="text-white text-center bg-opacity-50 rounded-lg">
          <div>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="mx-auto mb-[60px] mt-[30px]"
            />
          </div>
          <h1 className="text-white text-[30px] font-bold mb-[5px]">
            Set New Password
          </h1>
          <p className="w-[350px] text-center mx-auto opacity-80 shadow-md">
            Enter the OTP and your new password
          </p>

          <div className="flex code justify-center gap-4 mt-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-[60px] h-[60px] text-center text-white opacity-80 text-xl border-2 border-gray-500 rounded-md bg-transparent appearance-none focus:outline-none focus:border-yellow-400 transition-all"
              />
            ))}
          </div>

          <form
            className="flex w-[420px] max-600:w-[300px] flex-col items-start mt-[30px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="New Password"
              type="password"
              placeholder="Enter New Password"
              icon="/images/Lock.png"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />
            <TextField
              label="Confirm Password"
              type="password"
              placeholder="Confirm New Password"
              icon="/images/Lock.png"
              {...register("confirmNewPassword")}
              error={errors.confirmNewPassword?.message}
            />

            <div className="mt-[20px] w-full">
              <GradientButton
                text="Update Password"
                loading={loading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </Background>
  );
};

export default SetNewPassword;
