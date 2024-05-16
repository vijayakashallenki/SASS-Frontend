import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Shopper.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  logoutUserAction,
  subAfterCancel,
  userDetailsAction,
} from "../../redux/slices/user/UserSlice";
const Nav = () => {
  //get the user from redux store
  const { user } = useSelector((state) => state?.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAdmin = Boolean(user?.role === "Admin");
  const isThereUser = Boolean(localStorage.getItem("userInfo"));

  const isSubscribed = Boolean(
    user?.role === "Admin" ||
      user?.role === "subscriber" ||
      user?.role === "influencer"
  );

  //@dev logout function
  const logoutNavigate = () => {
    dispatch(logoutUserAction());
    Cookies.remove("token");
    localStorage.clear();
    navigate("/login");
  };

  //@dev check for cookie
  const cookie = Cookies.get("token");

  //@dev use effect hook, to run as soon as the website loads
  useEffect(() => {
    //@dev logic of checking if the local storage user as defined if not clear
    if (
      !localStorage.getItem("userInfo") ||
      localStorage.getItem("userInfo") === "undefined"
    ) {
      localStorage.clear();
    }

    //@dev logic for no user or cookie clear storage
    if (!localStorage.getItem("userInfo") && !cookie) {
      localStorage.clear();
    }

    if (user) {
      dispatch(userDetailsAction());
    }

    if (!cookie) {
      localStorage.clear();
    }
  }, []);

  //@dev check if user cancelled the plan
  // useEffect(() => {
  //   const stripeCancelAt = new Date(user?.subscriptions?.[0]?.cancel_at * 1000);
  //   const now = new Date();

  //   if (now >= stripeCancelAt) {
  //     dispatch(subAfterCancel());
  //   }
  // }, []);

  return (
    <div className=" h-24 flex mb-2 items-center justify-between box-border shadow-md">
      <img src={logo} alt="logo" className="w-auto h-24"></img>
      <div className="flex items-center p-4 m-4 box-border">
        <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
          <Link to={"/"}>Home</Link>
        </h4>
        <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
          <Link to={"/about"}>About</Link>
        </h4>
        <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
          <Link to={"/pricing"}>Pricing</Link>
        </h4>
        <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
          <Link to={"/features"}>Features</Link>
        </h4>
        <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
          <Link to={"/contact"}>Contact</Link>
        </h4>
        {isAdmin ? (
          <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
            <Link to={"/createProduct"}>Create Product</Link>
          </h4>
        ) : null}
        {isSubscribed ? (
          <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
            <Link to={"/premiumProducts"}>Products</Link>
          </h4>
        ) : (
          <h4 className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition">
            <Link to={"/ProductsFree"}>Free Products</Link>
          </h4>
        )}
        {user ? (
          <button
            className="m-4 p-2 text-xl border-b-4 border-transparent hover:border-[#a2826d] transition"
            onClick={() => logoutNavigate()}
          >
            LogOut
          </button>
        ) : (
          <button
            className="rounded text-xl bg-[#a77555] px-4 py-2 font-poppins mx-4"
            onClick={() => navigate("/login")}
          >
            LogIn
          </button>
        )}
      </div>

      {/* @dev for small menu */}
    </div>
  );
};

export default Nav;
