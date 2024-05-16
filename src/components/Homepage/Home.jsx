import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAction,
  sendEMail,
  subPriceActions,
  userDetailsAction,
  subSessionStripe,
  subStatusCtrl,
  customerPortal,
  changePassword,
  updateUserField,
  subAfterCancel,
  subAfterRenew,
} from "../../redux/slices/user/UserSlice";
import Cookies from "js-cookie";
import {
  createProduct,
  fetchAllProducts,
  fetchFreeProd,
  fetchPaidProd,
  fetchFacebook,
  fetchTiktok,
  fetchGoogle,
  fetchSingleProd,
  singleProdFree,
  updateProduct,
  deleteSingleProd,
} from "../../redux/slices/products/ProductSlices";

export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeData = useSelector((store) => store?.users);
  const stripeSessionUrl = useSelector(
    (store) => store?.users?.stripeWindowUrl
  );
  const customerPortalUrl = useSelector((store) => store?.users?.portalUrl);
  const { appErr, serverErr, user, redirectLogout } = storeData;

  useEffect(() => {
    if (stripeSessionUrl) {
      window.open(stripeSessionUrl, "_blank");
    }
    if (customerPortalUrl) {
      window.open(customerPortalUrl, "_blank");
    }
  }, [stripeSessionUrl, customerPortalUrl]);

  //@dev logout user logic
  const logoutNavigate = () => {
    dispatch(logoutUserAction());
    Cookies.remove("token");
    localStorage.clear();
    navigate("/login");
  };

  const stripeSessionId = {
    priceId: "price_1P85Y8SEv9jesbU4kbLINfW3",
  };

  return (
    <div className="p-5 flex justify-between flex-wrap">
      <h2 className="text-3xl font-poppins">
        Homepage:{storeData?.user?.firstName}
      </h2>
      <div className="flex gap-4 flex-wrap">
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(userDetailsAction())}
        >
          Get Details
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(subPriceActions())}
        >
          Get Started
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(sendEMail())}
        >
          Send Email
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(subStatusCtrl())}
        >
          Success Payment
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(customerPortal())}
        >
          Customer Portal
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(subAfterCancel())}
        >
          Sub Cancel
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(subAfterRenew())}
        >
          Sub Renew
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(changePassword("admin@123"))}
        >
          Change Password
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
          onClick={() => dispatch(updateUserField())}
        >
          Update Details{" "}
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-red-500 p-2 font-poppins"
          onClick={() => dispatch(subSessionStripe(stripeSessionId))}
        >
          Subscribe 🔒
        </button>
        {user ? (
          <button
            className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
            onClick={logoutNavigate}
          >
            LogOut
          </button>
        ) : (
          <button
            className="rounded py-2 px-4 text-2xl bg-blue-500 p-2 font-poppins"
            onClick={() => navigate("/login")}
          >
            LogIn
          </button>
        )}
      </div>
      <div className="flex gap-4 mt-4 flex-wrap">
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(createProduct())}
        >
          Create Product
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(fetchAllProducts())}
        >
          Get Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(fetchFreeProd())}
        >
          Free Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(fetchPaidProd())}
        >
          Paid Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-google p-2 font-poppins"
          onClick={() => dispatch(fetchGoogle())}
        >
          Google Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl text-white font-bold bg-facebook p-2 font-poppins"
          onClick={() => dispatch(fetchFacebook())}
        >
          Facebook Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-tiktok p-2 font-poppins"
          onClick={() => dispatch(fetchTiktok())}
        >
          TikTok Products
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(fetchSingleProd("662bdc51bfa13bd05fbcef9a"))}
        >
          Single Product
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(singleProdFree("662bdc51bfa13bd05fbcef9a"))}
        >
          Free Single Product
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(updateProduct("662bdc51bfa13bd05fbcef9a"))}
        >
          Update Product
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(deleteSingleProd("662bdc51bfa13bd05fbcef9a"))}
        >
          Delete A Product
        </button>
        <button
          className="rounded py-2 px-4 text-2xl bg-blue-400 p-2 font-poppins"
          onClick={() => dispatch(updateProduct())}
        >
          Delete All Products
        </button>
      </div>
    </div>
  );
}
