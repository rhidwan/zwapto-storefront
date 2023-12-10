"use client";
import React, { useEffect } from "react";
import signin from "@/public/assets/signin.svg";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { setCookie } from "cookies-next";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSignupMutation } from "@/apollograph/generated";
import toast from 'react-hot-toast';
import { redirect } from "next/navigation";


const formSchema = Yup.object({
  username : Yup.string().min(5).required("Username is required"),
  password: Yup.string().min(5).max(30).required("Password is required"),
  email: Yup.string().email().required("Email is required")
})

const SignUpPage = () => {
  useEffect(() => {
    setCookie("host", window.location.origin);
  }, []);
  const [signup, {data:signupData, loading:signupLoading, error:signupError}] = useSignupMutation()
  const initialValues = {
    username: "",
    password: "",
    email : ""
  }

  const {
    values,
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    handleSubmit, 
    setFieldValue
  } = useFormik({initialValues, 
    validationSchema: formSchema,
    onSubmit: async(values, action) => {
      console.log("Submitting the form with values")
      const res = signup({
        variables: {
          userData: {
            email: values.email,
            password: values.password,
            username: values.username
          }
        }
      })
      if (signupError){
        
        toast.error("we have trouble signing you up. Please try again")
      }
      if (signupData){
        action.resetForm()
        // console.log("success")
        toast.success("Sign Up successfull. Please login to your account to continue")
        window.location.replace('/signin')
      }
    }
    
  })


  return (
    <section className="fixed top-0 left-0 w-full min-h-screen h-full bg-white">
      <div className="  w-full h-full flex items-center custom-container">
        <div className="lg:w-[50%] w-[35%] h-full md:flex   min-h-screen  items-center   hidden">
          <div className="lg:w-2/3  lg:h-2/3 h-full m-auto">
            <Image src={signin} alt="" className="w-full  h-full" />
          </div>
          {/* <div className="absolute left-0 bottom-0 ">
            <Image
              src="/assets/loginDesign.png"
              width={100}
              height={100}
              className="w-full h-full"
              alt="design"
            />
          </div> */}
        </div>
        <div className=" bg-white lg:w-[50%] md:w-[75%] w-full ">
          <div className="lg:px-24 md:px-16 ">
            <Link href="/" className="">
              <Image
                src="/assets/swojon.svg"
                width={100}
                height={500}
                alt="logo"
                className="lg:w-[90px] md:w-20 w-16  "
              />
            </Link>

            <form onSubmit={handleSubmit} className="lg:space-y-4 md:space-y-3 space-y-2 mx-auto pt-3">
              <div>
                <h2 className="lg:text-2xl md:text-lg text-base font-semibold font-lexed">
                  Sign Up
                </h2>
                <p className="lg:text-base md:text-sm text-[10px] text-secondColor">
                  Please enter your details.
                </p>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block lg:text-base md:text-sm text-xs font-medium text-primaryColor font-lexed"
                >
                  Username
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-200 pr-10 text-primaryColor placeholder-[#717171] focus:border-activeColor focus:outline-none focus:ring-activeColor  lg:p-2.5 md:p-2 py-1 px-2 sm:text-sm text-xs"
                    placeholder="Enter a username"
                  />
                  
                </div>
                {errors.username && touched.username ? (
                  <p className="text-red-400	pt-1  text-xs">{errors.username}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block lg:text-base md:text-sm text-xs font-medium text-primaryColor font-lexed"
                >
                  Email
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-200 pr-10 text-primaryColor placeholder-[#717171] focus:border-activeColor focus:outline-none focus:ring-activeColor lg:p-2.5 md:p-2 py-1 px-2 sm:text-sm text-xs"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-400	pt-1  text-xs">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block lg:text-base md:text-sm text-xs font-medium text-primaryColor font-lexed"
                >
                  Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-200 pr-10 text-primaryColor placeholder-[#717171] focus:border-activeColor focus:outline-none focus:ring-activeColor lg:p-2.5 md:p-2 py-1 px-2 sm:text-sm text-xs"
                    placeholder="Create a password"
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="text-red-400	pt-1  text-xs">{errors.password}</p>
                ) : null}
              </div>
              {signupError ? (
                  <p className="text-red-400	pt-1  text-xs">{signupError.message}</p>
                ) : null}
              <button
                type="submit"
                className="lg:py-3 md:py-2 py-1.5 border border-activeColor bg-activeColor lg:text-sm md:text-xs text-[12px] text-white w-full rounded font-lexed"
              >
                Sign up
              </button>
            </form>

            <div className="space-y-2 pt-2">
              <Link
                href="/"
                className="md:py-2 py-1.5 flex justify-center items-center space-x-2 border border-[#E6E6E6]  lg:text-sm md:text-xs text-[12px] text-primaryColor w-full rounded font-lexed"
              >
                <span>
                  <FcGoogle />
                </span>
                <span>Continue with Google</span>
              </Link>
              {/* <Link
                href="/"
                className="md:py-2 py-1.5 flex justify-center items-center space-x-2 border border-[#E6E6E6]  lg:text-sm md:text-xs text-[12px] text-primaryColor w-full rounded font-lexed"
              >
                <span>
                  <FaApple />
                </span>
                <span>Continue with Apple</span>
              </Link> */}
              <h6 className="text-center text-secondColor lg:text-sm md:text-xs text-[13px]">
                already have an account !{" "}
                <Link href="/signin">
                  <span className="text-activeColor">Login</span>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
