// "use client";
// import { useAuth } from "@/context/UserContext";
// import { authLoginAPI } from "@/lib/auth/authLoginAPI";
// import { authSignupAPI } from "@/lib/auth/authSignupAPI";
// import { useParams, useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";

// // app/[locale]/auth/page.tsx
// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const label_name = useRef<HTMLInputElement>(null);
//   const email = useRef<HTMLInputElement>(null);
//   const password = useRef<HTMLInputElement>(null);
//   const confirmPassword = useRef<HTMLInputElement>(null);
//   const { locale } = useParams();
//   const { user, setUser } = useAuth();
//   const route = useRouter();
//   const [signupMessage, setSignupMessage] = useState(null);

//   const normalizedLocale = Array.isArray(locale) ? locale[0] : locale; // ensure string
//   const loginSubmit = async () => {
//     const res = await authLoginAPI({
//       email: email.current?.value,
//       password: password.current?.value,
//       language_code: normalizedLocale,
//     });
//     setUser(res ?? null);
//     route.push("/");
//   };
//   const signupSubmit = async () => {
//     if (password.current?.value !== confirmPassword.current?.value) {
//       // show error
//       return;
//     }
//     const res = await authSignupAPI({
//       display_name: label_name.current?.value,
//       email: email.current?.value,
//       password: password.current?.value,
//       language_code: normalizedLocale,
//     });
//     setSignupMessage(res?.message);
//   };
//   const handleGoogleLogin = () => {
//     const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

//     const options = {
//       redirect_uri: "http://localhost:3000/auth/callback", // Your frontend callback
//       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//       access_type: "offline",
//       response_type: "code",
//       prompt: "consent",
//       scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//       ].join(" "),
//     };

//     const qs = new URLSearchParams(options).toString();
//     window.location.href = `${rootUrl}?${qs}`;
//   };
//   if (signupMessage) {
//     return (
//       <div className="flex flex-1 justify-center items-center">
//         {signupMessage}
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-1 justify-center items-center">
//       <div className="mt-4 w-[360] sm:w-xl h-fit flex flex-col bg-primary items-center gap-4 shadow-2xl rounded-2xl">
//         <h1 className="text-lg font-bold text-textPrimary">
//           {isLogin ? "Sign In" : "Sign Up"}
//         </h1>
//         {isLogin ? (
//           ""
//         ) : (
//           <input
//             ref={label_name}
//             placeholder="Enter your Name"
//             className="bg-white w-64 py-1 px-2 shadow rounded-lg"
//           />
//         )}
//         <input
//           ref={email}
//           placeholder="Enter your email id"
//           className="bg-white w-64 py-1 px-2 shadow rounded-lg"
//         />
//         <input
//           ref={password}
//           placeholder={isLogin ? "Enter your password" : "Create Password"}
//           className="bg-white w-64 py-1 px-2 shadow rounded-lg"
//         />
//         {isLogin ? (
//           ""
//         ) : (
//           <input
//             ref={confirmPassword}
//             placeholder="Confirm Password"
//             className="bg-white w-64 py-1 px-2 shadow rounded-lg"
//           />
//         )}
//         <div>
//           <button
//             onClick={isLogin ? () => loginSubmit() : () => signupSubmit()}
//             className="bg-red-600 text-white text-lg px-4 py-1 rounded-full"
//           >
//             Submit
//           </button>
//         </div>
//         <hr className="" />
//         <button
//           onClick={handleGoogleLogin}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Sign in with Google
//         </button>
//         <p>
//           Already have Account ?{" "}
//           <button onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Sign UP" : "Sign In"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

"use client";
import { useAuth } from "@/context/UserContext";
import { authLoginAPI } from "@/lib/auth/authLoginAPI";
import { authSignupAPI } from "@/lib/auth/authSignupAPI";
import { CURRENT_POLICY_VERSION } from "@/utils/constant";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const label_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  // Track state for the privacy policy explicit checkbox
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { locale } = useParams();
  const { user, setUser } = useAuth();
  const route = useRouter();
  const [signupMessage, setSignupMessage] = useState(null);

  const normalizedLocale = Array.isArray(locale) ? locale[0] : locale;

  const loginSubmit = async () => {
    if (!email.current?.value) {
      setValidationError("Enter Your Email");
      return;
    }
    if (!password.current?.value) {
      setValidationError("Enter Your Password");
      return;
    }
    setValidationError(null);
    const res = await authLoginAPI({
      email: email.current?.value,
      password: password.current?.value,
      language_code: normalizedLocale,
    });
    setUser(res ?? null);
    route.push("/");
  };

  const signupSubmit = async () => {
    if (!label_name.current?.value) {
      setValidationError("Enter Your Name");
      return;
    }
    if (!email.current?.value) {
      setValidationError("Enter Your Email");
      return;
    }
    if (!password.current?.value) {
      setValidationError("Enter Create Password");
      return;
    }
    if (!confirmPassword.current?.value) {
      setValidationError("Enter Confirm Password");
      return;
    }
    setValidationError(null);

    if (password.current?.value !== confirmPassword.current?.value) {
      setValidationError("Passwords do not match.");
      return;
    }

    // Block submission early if the explicit checkbox isn't checked
    if (!policyAccepted) {
      setValidationError("You must accept the Privacy Policy to proceed.");
      return;
    }

    const res = await authSignupAPI({
      display_name: label_name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      language_code: normalizedLocale,
      policy_version: CURRENT_POLICY_VERSION, // Sent directly to your database
    });

    setSignupMessage(res?.message);
  };

  const handleGoogleLogin = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: "http://localhost:3000/auth/callback",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options).toString();
    window.location.href = `${rootUrl}?${qs}`;
  };

  if (signupMessage) {
    return (
      <div className="flex flex-1 justify-center items-center">
        {signupMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="mt-4 w-90 sm:w-xl h-fit flex flex-col bg-primary items-center gap-4 shadow-2xl rounded-2xl p-6">
        <h1 className="text-lg font-bold text-textPrimary">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        {validationError && (
          <p className="text-sm text-red-500 font-medium">{validationError}</p>
        )}

        {!isLogin && (
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
          type="password"
          placeholder={isLogin ? "Enter your password" : "Create Password"}
          className="bg-white w-64 py-1 px-2 shadow rounded-lg"
        />
        {!isLogin && (
          <input
            ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="bg-white w-64 py-1 px-2 shadow rounded-lg"
          />
        )}

        {/* Explicit Privacy Policy Checkbox Implementation */}
        {!isLogin && (
          <div className="flex items-start w-64 gap-2 mt-2">
            <input
              type="checkbox"
              id="privacyPolicy"
              checked={policyAccepted}
              onChange={(e) => setPolicyAccepted(e.target.checked)}
              className="mt-1 cursor-pointer"
            />
            <label
              htmlFor="privacyPolicy"
              className="text-xs text-textSecondary cursor-pointer select-none"
            >
              I agree to the{" "}
              <a
                href={`/${normalizedLocale}/privacy`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Privacy Policy
              </a>{" "}
              and Terms of Service.
            </label>
          </div>
        )}

        <div>
          <button
            onClick={isLogin ? loginSubmit : signupSubmit}
            className="bg-red-600 text-white text-lg px-4 py-1 rounded-full hover:bg-red-700 transition"
          >
            Submit
          </button>
        </div>
        <hr className="w-full border-gray-300" />
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
        <p className="text-sm">
          {isLogin ? "Don't have an account? " : "Already have Account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setValidationError(null);
            }}
            className="text-blue-600 font-semibold ml-1 underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
