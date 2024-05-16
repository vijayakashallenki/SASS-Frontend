import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/Shopper.png";
import {
  logoutAction,
  subAfterCancel,
  subPricesAction,
  userDetailsAction,
} from "../../redux/slices/users/usersSlices.js";
import Cookies from "js-cookie";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonCheck } from "react-icons/bs";

const Navbar = () => {
  const [Open, setOpen] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const location = useLocation();
  //get the user from the redux store
  const { user } = useSelector((state) => state?.users);

  //configure dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check the admin role
  const isAdmin = Boolean(user?.role === "Admin");
  //check if there is a user
  const isThereUser = Boolean(localStorage.getItem("userInfo"));

  //check the user role
  const isSubscribed = Boolean(
    user?.role === "Admin" ||
      user?.role === "subscriber" ||
      user?.role === "influencer"
  );

  //logout function
  const logoutNavigate = () => {
    dispatch(logoutAction());
    Cookies.remove("token");
    localStorage.clear();
    navigate("/login");
    setOpen(false);
  };

  //check for cookie
  const cookie = Cookies.get("token");

  //use effect hook, to run as soon as our website loads
  useEffect(() => {
    //check if the local storage user is defined if not clear
    if (
      !localStorage.getItem("userInfo") ||
      localStorage.getItem("userInfo") === "undefined"
    ) {
      localStorage.clear();
    }

    //if statement, no user or cookie clear storage
    if (!localStorage.getItem("userInfo") && !cookie) {
      localStorage.clear();
    }

    //if there is a user get his details
    // if (user) {
    //   dispatch(userDetailsAction());
    // }

    if (!cookie) {
      localStorage.clear();
    }

    //set mobile menu false and open to false
    setOpenMenuMobile(false);
    setOpen(false);
  }, []);

  //check if user canceled the plan
  useEffect(() => {
    const stripeCancelAt = new Date(user?.subscriptions[0]?.cancel_at * 1000);
    const now = new Date();

    if (now >= stripeCancelAt) {
      //revoke priviledges
      dispatch(subAfterCancel());
    }
  }, []);

  return (
    <div className="max-w-screen overflow-hidden font-poppins shadow-md">
      {/* desktop version */}
      <div className="flex w-full justify-between items-center bg-white h-32">
        {/* logo */}
        <div className="text-2xl text-black flex justify-start">
          <img src={logo} alt="logo" className="w-auto h-24"></img>
        </div>
        {/* menu items */}
        <div className="flex justify-end flex-1 mt-2">
          <ul className="justify-center text-2xl hidden md:flex text-black">
            <li
              className={`relative flex px-4 ${
                location.pathname === "/" ? "after:w-full" : "hover:after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
            >
              <Link className="mb-2" to={"/"}>
                Home
              </Link>
            </li>
            <li
              className={`relative flex px-2 ${
                location.pathname === "/about"
                  ? "after:w-full"
                  : "hover:after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
            >
              <Link to={"/about"}>About</Link>
            </li>
            <li
              className={`relative flex px-2 ${
                location.pathname === "/pricing"
                  ? "after:w-full"
                  : "hover:after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
            >
              <Link to={"/pricing"}>Pricing</Link>
            </li>
            <li
              className={`relative flex px-2 ${
                location.pathname === "/features"
                  ? "after:w-full"
                  : "hover:after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
            >
              <Link to={"/features"}>Features</Link>
            </li>
            <li
              className={`relative flex px-2 ${
                location.pathname === "/contact"
                  ? "after:w-full"
                  : "hover:after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
            >
              <Link to={"/contact"}>Contact</Link>
            </li>
            {isAdmin ? (
              <li
                className={`relative flex px-2 ${
                  location.pathname === "/createProduct"
                    ? "after:w-full"
                    : "hover:after:w-0"
                } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
              >
                <Link to={"/createProduct"}>CreateProduct</Link>
              </li>
            ) : null}
            {isSubscribed ? (
              <li
                className={`relative flex px-2 ${
                  location.pathname === "/premiumProducts"
                    ? "after:w-full"
                    : "hover:after:w-0"
                } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
              >
                <Link to={"/premiumProducts"}>Products</Link>
              </li>
            ) : (
              <li
                className={`relative flex px-2 ${
                  location.pathname === "/productsFree"
                    ? "after:w-full"
                    : "hover:after:w-0"
                } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#a2826d] after:transition-all after:duration-300`}
              >
                <Link to={"/productsFree"}>FreeProducts</Link>
              </li>
            )}
          </ul>
        </div>
        {/* login and logout */}

        {/* the small menu */}
        <div className="">
          <div
            className={`w-[30%] h-[16rem] bg-gray-800 absolute right-8 top-14 rounded-lg z-10 ${
              Open ? null : "hidden"
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium text-lg ml-6 mt-4 mb-4 text-white">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-[10px] text-white bg-emerald-500 w-[30%] h-6 mt-[20px] flex justify-center align-center rounded-lg mr-4">
                {isAdmin === "Admin" ||
                isAdmin === "subscriber" ||
                isAdmin === "influencer"
                  ? "Premium Plan"
                  : "Free Plan"}
              </p>
            </div>
            <div className="flex ml-6 ">
              <BsPersonCheck
                size={22}
                className="mr-[6px] mt-[1px] text-emerald-600"
              />{" "}
              <Link
                onClick={() => setOpen(false)}
                className=" mb-2 font-medium text-xl transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
                to={`/profile/${user?._id}`}
              >
                My Profile
              </Link>
            </div>
            <div className="w-[80%] bg-gray-300 h-[1px] flex justify-center"></div>
            <Link
              onClick={() => setOpen(false)}
              to={`/savedProducts`}
              className="ml-6 mb-2 mt-4 block transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
            >
              Saved Products
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to={`/password-change`}
              className="ml-6 mb-2 block transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
            >
              Forgot Password
            </Link>
            {/* {user.isVerified ? null : (
                <>
                  {" "}
                  <Link
                    onClick={() => setOpen(false)}
                    to={`/verifyEmail`}
                    className="ml-6 mb-2 block transition ease-in-out delay-150 duration-300 hover:text-indigo-500 text-blue-600"
                  >
                    Verify E-Mail
                  </Link>
                </>
              )} */}

            <div className="relative flex justify-start ml-6">
              <button
                onClick={() => logoutNavigate()}
                className="px-4 py-2 bg-red-500 hover:bg-red-500/90 rounded-xl w-[20%] mt-6 text-white "
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {user ? (
          <div className="mr-6">
            <img
              onClick={() => setOpen(!Open)}
              className={`hidden md:flex w-14 h-14 rounded-full cursor-pointer border-2 hover:border-[#a2826d] border-white transition ease-in-out delay-150 duration-300 ml-4`}
              src={user?.profilePhoto}
              alt="profilephoto"
            />
            <RxHamburgerMenu
              onClick={() => setOpenMenuMobile(!openMenuMobile)}
              size={30}
              className={`md:hidden flex cursor-pointer text-black`}
            />
            <div
              className={`w-full h-[39rem] border-y bg-gray-800 absolute left-0 top-14 z-10 ${
                openMenuMobile ? null : "hidden"
              }`}
            >
              <ul>
                <li
                  className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Link to={"/"}>Home</Link>
                </li>
                <li
                  className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Link to="/about">About</Link>
                </li>
                <li
                  className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li
                  className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Link to="/features">Features</Link>
                </li>
                <li
                  className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Link to="/contact">Contact</Link>
                </li>
                {isAdmin === "Admin" ? (
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/createProduct">Create Product</Link>
                  </li>
                ) : null}
                {isAdmin === "Admin" ||
                isAdmin === "subscriber" ||
                isAdmin === "influencer" ? (
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/premiumProducts">Products</Link>
                  </li>
                ) : (
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/productsFree">Free Products</Link>
                  </li>
                )}
                <div className="w-[80%] bg-gray-300 h-[1px] flex justify-start"></div>
                {user ? (
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-xl ml-6 mt-4 mb-4 text-white">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-[10px] text-white bg-emerald-500 w-[27%] h-4 mt-[20px] flex justify-center mr-8 rounded-lg">
                        {isAdmin === "Admin" ||
                        isAdmin === "subscriber" ||
                        isAdmin === "influencer"
                          ? "Premium Plan"
                          : "Free Plan"}
                      </p>
                    </div>
                    <div>
                      <div className="flex ml-6 ">
                        <BsPersonCheck
                          size={22}
                          className="mr-[6px] mt-[2px] text-emerald-600"
                        />{" "}
                        <Link
                          onClick={() => setOpenMenuMobile(false)}
                          className=" mb-2 text-xl font-medium transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
                          to={`/profile/${user?._id}`}
                        >
                          My Profile
                        </Link>
                      </div>
                      <div className="w-[80%] bg-gray-300/70 h-[1px] flex justify-center"></div>
                    </div>
                    <Link
                      onClick={() => setOpenMenuMobile(false)}
                      to={`/savedProducts`}
                      className="ml-6 mb-2 text-xl mt-4 block transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
                    >
                      Saved Products
                    </Link>
                    <Link
                      onClick={() => setOpenMenuMobile(false)}
                      to={`/planDetails`}
                      className="ml-6 mb-2 text-xl block transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
                    >
                      Plan Details
                    </Link>
                    <Link
                      onClick={() => setOpenMenuMobile(false)}
                      to={`/passwordReset`}
                      className="ml-6 mb-2 text-xl block transition ease-in-out delay-150 duration-300 hover:text-indigo-200 text-blue-100"
                    >
                      Forgot Password
                    </Link>
                    <div>
                      <button
                        onClick={() => logoutNavigate()}
                        className="px-4 py-2 bg-red-500 hover:bg-red-500/90 rounded-xl w-[40%] mt-6 ml-6 text-white "
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : null}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div className="mr-6">
              <RxHamburgerMenu
                onClick={() => setOpenMenuMobile(!openMenuMobile)}
                size={30}
                className={`md:hidden flex cursor-pointer text-black`}
              />
              <div
                className={`w-full h-[29rem] border-y bg-gray-800 absolute left-0 top-14 z-10 ${
                  openMenuMobile ? null : "hidden"
                }`}
              >
                <ul>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/about">About</Link>
                  </li>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/features">Features</Link>
                  </li>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li
                    className="text-xl text-blue-100 mb-2 mt-4 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/productsFree">Free Products</Link>
                  </li>
                  <div className="w-[80%] bg-gray-300 h-[1px] flex justify-start"></div>
                  <li
                    className="text-xl underline underline-offset-4 text-blue-100 mb-2 mt-10 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/register">Register</Link>
                  </li>
                  <li
                    className="text-xl underline underline-offset-4 text-blue-100 mb-2 mt-6 ml-6"
                    onClick={() => setOpenMenuMobile(false)}
                  >
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>{" "}
            <div className="justify-center hidden md:flex">
              {" "}
              <Link to={"/register"} className="px-2 py-2 text-black text-2xl">
                SignUp
              </Link>
              <Link
                to={"/login"}
                className="px-2 py-2 mr-6 text-black text-2xl bg-[#a2826d]"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
