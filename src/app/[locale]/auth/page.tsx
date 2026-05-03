"use client";
import { useAuth } from "@/context/UserContext";
import { authLoginAPI } from "@/lib/auth/authLoginAPI";
import { authSignupAPI } from "@/lib/auth/authSignupAPI";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const label_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const { locale } = useParams();
  const { user, setUser } = useAuth();

  const normalizedLocale = Array.isArray(locale) ? locale[0] : locale; // ensure string
  const loginSubmit = async () => {
    const res = await authLoginAPI({
      email: email.current?.value,
      password: password.current?.value,
      language_code: normalizedLocale,
    });
    setUser(res?.user ?? null);
  };
  const signupSubmit = async () => {
    const res = await authSignupAPI({
      display_name: label_name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      language_code: normalizedLocale,
    });
    setUser(res?.user ?? null);
  };
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="mt-4 w-[360] sm:w-xl h-fit flex flex-col bg-primary items-center gap-4 shadow-2xl rounded-2xl">
        <h1 className="text-lg font-bold text-textPrimary">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        {isLogin ? (
          ""
        ) : (
          <input
            ref={label_name}
            placeholder="Enter your Name"
            className="bg-white w-64 py-1 px-2 shadow rounded-lg"
          />
        )}
        <input
          ref={email}
          placeholder="Enter your email id"
          className="bg-white w-64 py-1 px-2 shadow rounded-lg"
        />
        <input
          ref={password}
          placeholder={isLogin ? "Enter your password" : "Create Password"}
          className="bg-white w-64 py-1 px-2 shadow rounded-lg"
        />
        {isLogin ? (
          ""
        ) : (
          <input
            ref={confirmPassword}
            placeholder="Confirm Password"
            className="bg-white w-64 py-1 px-2 shadow rounded-lg"
          />
        )}
        <div>
          <button
            onClick={isLogin ? () => loginSubmit() : () => signupSubmit()}
            className="bg-red-600 text-white text-lg px-4 py-1 rounded-full"
          >
            Submit
          </button>
        </div>
        <p>
          Already have Account ?{" "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign UP" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
