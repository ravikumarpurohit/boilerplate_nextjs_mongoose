"use client";
// import { userLogin } from "@/redux/actions/customerAuthActions";
import Link from "next/link";
// import { userLogin } from "@/redux/actions/authActions";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { useSession, signIn, signOut } from "next-auth/react";

const Page = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    if (userData.email === "" || userData.password === "") {
      // setFieldsEmpty(true);
      setMessage("Please fill up all fields");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false, // Prevent auto redirect
      email: userData.email,
      password: userData.password,
    });

    if (res.error) {
      // Authentication failed
      setMessage("Invalid email or password");
    } else {
      // Authentication successful
      setMessage("");
      router.push("/"); // Redirect to homepage or dashboard
    }
  };

  //   useEffect(() => {
  //     console.log(`user data ${JSON.stringify(user)}`);
  //     if (user) {
  //       router.push("/");
  //     }
  //   }, [user]);

  const handleChange = (e) => {
    // console.log(userData);
    // setFieldsEmpty(false);
    setMessage("");
    setUserData(
      Object.assign({}, userData, { [e.target.name]: e.target.value })
    );
  };
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div className=" h-screen w-full flex justify-center items-center bg-stone-100">
      <div className=" max-md:mx-4 bg-white shadow-md rounded-md p-5">
        <div className="flex items-center gap-5">
          <label
            htmlFor="email"
            className="w-1/3 text-lg md:text-2xl font-mono font-medium"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className=" bg-stone-200 w-2/3 rounded-md py-1 px-4"
            required
          />
        </div>
        <div className="flex items-center gap-5 mt-5">
          <label
            htmlFor="password"
            className=" w-1/3 text-lg md:text-2xl font-mono font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            className=" bg-stone-200 w-2/3 rounded-md py-1 px-4"
            required
          />
        </div>

        {message && (
          <div className=" my-3 text-sm text-red-500 font-medium text-center">
            {message}
          </div>
        )}

        <div className=" flex justify-center mt-5">
          <button
            className=" py-1 px-10 rounded-md border border-black bg-white text-black text-lg md:text-xl font-semibold hover:bg-black hover:text-white transition-all ease-in-out duration-300"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>

        <div className=" text-center mt-3">
          <h1>
            Don&#39;t have account{" "}
            <Link href={"/signup"} className=" text-blue-500">
              signup
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
