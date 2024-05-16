import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customerPortal,
  logoutAction,
  verifyAccountSend,
} from "../../redux/slices/users/usersSlices.js";
import { MdManageHistory, MdOutlineMarkEmailRead } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import Cookies from "js-cookie";
import { TbStatusChange } from "react-icons/tb";
import moment from "moment";

const Profile = () => {
  const { innerWidth: width } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    customerPortalUrl: portalURL,
    userDetails,
    verificationUrl,
  } = useSelector((state) => state?.users);

  const logoutNavigate = () => {
    dispatch(logoutAction());
    Cookies.remove("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const checkSubStatus = Boolean(user?.subscriptions?.length > 0);
  const subPlanName = user?.subscriptions[0]?.plan?.nickname;
  const subPlanCost = user?.subscriptions[0]?.plan?.amount;
  const subPlanCurrency = user?.subscriptions[0]?.plan?.currency;

  const subPlanCurrencyConverted = subPlanCost
    ? (subPlanCost / 100).toLocaleString("en-US", {
        style: "currency",
        currency: subPlanCurrency,
      })
    : "";

  const expiresSubIn = moment(
    user?.subscriptions[0]?.current_period_end * 1000
  ).format("dddd, MMMM Do YYYY, h:mm a");

  const customerId = user?.stripe_customer_id;

  if (portalURL) {
    window.location.href = portalURL;
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // dispatch(userDetailsAction());
    }
  }, []);

  return (
    <div className="font-poppins overflow-hidden min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="bg-gray-100 w-full lg:w-1/4 h-auto lg:h-screen p-4">
          <h1 className="text-center lg:text-left text-xl">User Profile</h1>
          <div className="bg-gray-800/30 w-full h-[1px] my-2"></div>
          <div className="flex flex-col items-center lg:items-start mt-8">
            <img
              className="w-20 rounded-full cursor-pointer border-2 hover:border-green-600 border-white transition ease-in-out duration-300"
              src={user?.profilePhoto}
              alt="profilephoto"
            />
            <div className="text-center lg:text-left mt-4">
              <p>{user?.firstName + " " + user?.lastName}</p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="block mb-4">
              <div className="flex items-center">
                <MdManageHistory className="w-6 h-6 ml-4 mr-2" />
                <button onClick={() => dispatch(customerPortal(customerId))}>
                  Manage Subscriptions
                </button>
              </div>
            </div>
            <div className="block mb-4">
              <div className="flex items-center">
                <TbStatusChange className="w-6 h-6 ml-4 mr-2" />
                <Link to="/password-change">Change Password</Link>
              </div>
            </div>
            <div className="block mb-4">
              <div className="flex items-center">
                <PiPasswordBold className="w-6 h-6 ml-4 mr-2" />
                <Link to="/password-reset">Recover Password</Link>
              </div>
            </div>
            {!user?.isVerified ? (
              <div className="block mb-4">
                <div className="flex items-center">
                  <MdOutlineMarkEmailRead className="w-6 h-6 ml-4 mr-2" />
                  {verificationUrl ? (
                    <button className="text-green-600">
                      Verification E-Mail Sent
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(verifyAccountSend(user?._email))}
                    >
                      Verify E-Mail
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <button
            onClick={logoutNavigate}
            className="px-4 py-2 bg-red-500 hover:bg-red-500/90 rounded-xl w-full mt-6 text-white"
          >
            Logout
          </button>
        </div>
        <div className="bg-gray-100/50 w-full lg:w-3/4 p-4">
          <h1 className="text-xl">User Details</h1>
          <div className="border rounded-xl p-4 mt-4">
            <p className="bg-sky-300 py-2 rounded-md px-4 text-center">
              Membership Status:
              <span className="bg-purple-100/30 rounded-md px-2 ml-2">
                {user?.role === "Admin"
                  ? "Admin"
                  : user?.role === "subscriber"
                  ? "Premium Plan"
                  : user?.role === "freeuser"
                  ? "Free Plan"
                  : user?.role === "influencer"
                  ? "Influencer"
                  : null}
              </span>
            </p>
            {user?.isVerified ? (
              <p className="bg-emerald-300 py-2 rounded-md px-4 mt-4 text-center">
                Verified E-Mail: {user?.email}
              </p>
            ) : (
              <button
                onClick={() => dispatch(verifyAccountSend(user?.email))}
                className="bg-orange-300 rounded-md px-4 mt-4"
              >
                Verify Email
              </button>
            )}
            {checkSubStatus ? (
              <div className="mt-8">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">
                        Membership Details:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">
                        <span className="font-semibold">Plan: </span>
                        {subPlanName} - {subPlanCurrencyConverted}/month
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <span className="font-semibold">Pro Plan is: </span>
                        <span className="border rounded-lg border-blue-400/50 px-4 py-[2px]">
                          {user?.subscriptions?.[0]?.status === "active"
                            ? "Active"
                            : "Expired"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="block mt-8 text-center">
                <Link
                  className="hover:underline hover:text-blue-500 underline-offset-2 text-blue-400"
                  to="/pricing"
                >
                  Check out Premium Plans
                </Link>
              </div>
            )}
          </div>
          <p className="mt-6 bg-red-400/90 hover:bg-red-400 py-2 rounded-md px-4 text-center">
            <Link className="text-white font-semibold" to="/savedProducts">
              To Saved Products
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
