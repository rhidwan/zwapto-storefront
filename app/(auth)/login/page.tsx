"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { setCookie } from "cookies-next";

import {
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useApolloClient } from "@apollo/client";
// import { setCookie } from "cookies-next" ;

interface Props {}

// const handleGoogleClick = () => {
//   window.open(`${process.env.NEXT_PUBLIC_BACKEND_AUTH_URL}/google`, "_self");
//   // window.open(`http://localhost:3005/auth/google`, '_self')
// };


const SignIn: NextPage = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [formUploading, setFormUploading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string|null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParams = searchParams.get("error")  
  const callbackUrl = searchParams.get("callbackUrl") 
  const next_url = searchParams.get("next");
  if (next_url) setCookie("next", next_url, { maxAge: 60 * 5 });

  const handleLogin = async () => {
    setFormUploading(true);
    setError(null);

    const res = await signIn("credentials", {
      email : userInfo.email,
      password: userInfo.password,
      redirect: false,
      callbackUrl: callbackUrl ?? "/",
    });
    console.log("response from site", res)
    if (res?.ok){
      setFormUploading(false);
      toast.success("Successfully Logged in")
      console.log("res.url", res.url)
      if (!!res?.url){
       
        window ? window.location.replace(`/${res.url.split("/").at(-1)}`) : location.replace(`/${res.url.split("/").at(-1)}`);
      }else{
        window ? window.location.reload() : location.reload()
      }

    }else{
      setFormUploading(false);
      setError(res?.error ?? "")
    }
  };
  
  const handleGoogleClick = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    const res = await signIn("google", { callbackUrl: "/", redirect: false });
    
    if (res?.ok){
      setGoogleLoading(false);
      toast.success("Successfully Logged in")
      if (res?.url){
        console.log("res.url", res.url)
        window ? window.location.replace(`/${res.url.split("/").at(-1)}`) : location.replace(`/${res.url.split("/").at(-1)}`);
      }else{
        window ? window.location.reload() : location.reload()
      }
    }else{
      setGoogleLoading(false);
      setGoogleError(res?.error ?? "")
    }
    
  };

  const handleChange = (e: any) => {
    if (e.target.name === "email")
      setUserInfo({ email: e.target.value, password: userInfo.password });
    if (e.target.name === "password")
      setUserInfo({ email: userInfo.email, password: e.target.value });
  };

  useEffect(()=>{
      if (errorParams === "OAuthCallback" || errorParams === "AccessDenied"){
        toast.error("Oops! Something went wrong logging in. Please ensure you're using the same method you originally used to sign in.")
      }
  }, [errorParams])

  return (
    <div className=" bg-white lg:w-[50%] md:w-[75%] w-full">
      <div className="lg:px-24 md:px-16 flex flex-col items-center space-y-5">
        <Link href="/">
          <Image
            src="/assets/swojon.svg"
            width={100}
            height={500}
            alt="logo"
            className="lg:w-[120px] md:w-20 w-16  "
          />
        </Link>

        <div
          className="lg:space-y-4 md:space-y-3 space-y-2 mx-auto pt-1 w-full"
        >
          <div className="text-center">
            <h2 className="lg:text-2xl text-lg  font-bold font-lexed text-primaryColor">
              Log in
            </h2>
            <p className="text-sm text-secondColor pt-1">
              Your marketplace journey continues here
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block  text-base  font-medium text-primaryColor font-lexed"
            >
              Email
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 pr-10 text-primaryColor placeholder-[#717171] focus:border-activeColor focus:outline-none focus:ring-activeColor  py-2.5 px-2 md:text-lg text-base "
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-primaryColor font-lexed"
            >
              Password
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 text-primaryColor placeholder-[#717171] focus:border-activeColor focus:outline-none focus:ring-activeColor py-2.5 pl-2 pr-10 md:text-lg text-base"
                placeholder="Enter your password"
              />

              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                {showPassword ?  <FaRegEyeSlash onClick={() => setShowPassword(false)} /> : 
                <FaRegEye onClick={() => setShowPassword(true)} /> }
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pb-2">
            <div className="flex items-center space-x-2 ">
              {/* <div className="flex h-5 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="md:h-4 h-2.5 md:w-4 w-2.5 rounded border-gray-300 text-activeColor focus:ring-activeColor custom-checkedInput"
                />
              </div>
              <label
                htmlFor="comments"
                className="text-secondColor lg:text-sm text-xs "
              >
                remember me
              </label> */}
            </div>

            <Link
              href="/forgot-password"
              className="lg:text-sm text-xs text-activeColor"
            >
              Forgot password
            </Link>
          </div>
          {error && (
            <div>
              <div className="text-center text-red-500">
                {error}
              </div>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="py-2.5  border border-activeColor lg:text-lg text-base  text-activeColor w-full rounded-md font-lexed font-bold flex justify-center "
          >
            {formUploading ? (
              <BiLoaderCircle className=" text-xl animate-spin" />
            ) : (
              "Log in"
            )}
          </button>
        </div>

        <div className="w-full h-px bg-gray-200 my-7 relative">
          <span className="h-6 w-6  bg-white  absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  flex justify-center items-center">
            <span className="text-0.5px text-gray-500 italic">or</span>
          </span>
        </div>

        <div className=" gap-4 w-full">
          {/* <button
            onClick={handleGoogleClick}
            className=" py-2 px-2 flex justify-center items-center  border border-red-500   text-primaryColor rounded-full "
          >
            <FaGoogle className="lg:text-sm md:text-xs text-[12px] text-red-500" />
          </button>

          <button
            onClick={handleGoogleClick}
            className=" py-2 px-2 flex justify-center items-center  border border-blue-700   text-primaryColor rounded-full "
          >
            <FaFacebookF className="lg:text-sm md:text-xs text-[12px] text-blue-700" />
          </button> */}
          {googleError && (
            <div>
              <div className="text-center text-red-500">
                {googleError}
              </div>
            </div>
          )}
          <div
            className="mb-2 flex items-center justify-center py-2 px-5 border gap-4 rounded-md w-full hover:border-activeColor cursor-pointer"
            onClick={handleGoogleClick}
          >
            <span className="">
              <FcGoogle className="float-right text-lg" />
            </span>
            <span className="lg:text-lg text-base text-secondColor font-bold">
            {googleLoading ? ( 
              <BiLoaderCircle className=" text-xl animate-spin" />
            ) : (
              "Continue with Google"
            )}
              
            </span>
          </div>

          {/* <div className="flex items-center  py-2 px-5 border gap-4 rounded-md w-full hover:border-activeColor cursor-pointer">
            <span className="w-[30%] ">
              <FaFacebookSquare className="float-right  text-blue-600 text-lg" />
            </span>

            <span className="text-sm text-secondColor">
              Continue with Facebook
            </span>
          </div> */}
          {/* <Link
                href="/"
                className="md:py-2 py-1.5 flex justify-center items-center space-x-2 border border-[#E6E6E6]  lg:text-sm md:text-xs text-[12px] text-primaryColor w-full rounded font-lexed"
              >
                <span>
                  <FaApple />
                </span>
                <span>Continue with Apple</span>
              </Link> */}
        </div>

        <h6 className="text-center text-secondColor lg:text-sm text-xs  pt-1">
          {" "}
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-activeColor">Sign up !</span>
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
