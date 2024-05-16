import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, config } from "../../../utils/baseURL";

//redirect actions
const redirectRegister = createAction("redirect/register");
const redirectLogin = createAction("redirect/login");
const redirectLogout = createAction("redirect/logout");
const redirectEmailSend = createAction("redirect/email");

export const registerUserAction = createAsyncThunk(
  "register/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const sendData = {
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        password: user.password,
      };
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/register`,
        sendData,
        config
      );

      //after user registers store him to local state
      localStorage.setItem("userInfo", JSON.stringify(data.createdUser));
      localStorage.setItem("token", JSON.stringify(data.token));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login user action
export const loginUserAction = createAsyncThunk(
  "login/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const userFromState = getState()?.users?.userAuth;

    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/login`,
        user,
        config
      );

      //store user to the local state aka browser memory
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      //return the data to the frontend
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutAction = createAsyncThunk(
  "logout/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //remove user from browser
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");

      //dispatch redirect action
      dispatch(redirectLogout());
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get all of users details
export const userDetailsAction = createAsyncThunk(
  "user/details",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;

    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/users/userDetails`,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data?.user));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//save a product
export const saveProductAction = createAsyncThunk(
  "save/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    console.log(payload);

    //send back the id in propper format
    const sendId = {
      productId: payload,
    };

    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/saveProduct`,
        sendId,
        config
      );

      //update the local storage and user
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//unsave a product
export const unsaveProductAction = createAsyncThunk(
  "unsave/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //send back the id in propper format
    const sendId = {
      productId: payload,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/unSaveProduct`,
        sendId,
        config
      );
      //update the local storage and user
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get subscription prices and plans from stripe
export const subPricesAction = createAsyncThunk(
  "sub/prices",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //hit the endpoint
      const { data } = await axios.get(
        `${baseURL}/api/v1/users/stripePrices`,
        config
      );
      //return the data
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//send email
export const sendEmail = createAsyncThunk(
  "send/email",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log("🚀sendEmail");
    const sendData = {
      to: "lazyyshoppers@gmail.com",
      subject: payload?.subject,
      message: payload?.message,
      recipientEmail: payload?.recipientEmail,
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/email`,
        sendData,
        config
      );

      dispatch(redirectEmailSend());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create subscription window hosted by stripe
export const subSessionStripe = createAsyncThunk(
  "stripe/session",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //formated data
    console.log(payload);
    const sendData = {
      priceId: payload?.priceId,
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/createSessionStripe`,
        sendData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//sub status update after success
export const subStatusCtrl = createAsyncThunk(
  "subStatus/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;

    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/subStatusUpdate`,
        payload,
        config
      );

      console.log(data);
      //store user to local state
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//customer portal access
export const customerPortal = createAsyncThunk(
  "customer/portal",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/users/customerPortal`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get all users
export const getAllUsers = createAsyncThunk(
  "getAll/users",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/users/allUsers`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//change user password
export const changePassword = createAsyncThunk(
  "change/password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      password: payload,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/updatePassword`,
        sendData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//password reset url send to email
export const passwordResetUrl = createAsyncThunk(
  "password/resetUrl",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      email: payload?.email,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/passwordReset`,
        sendData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//password reset after clikcing the url
export const passwordResetClick = createAsyncThunk(
  "passwordReset/click",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      password: payload?.password,
      token: payload?.token,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/passwordResetAfter`,
        sendData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//verify users account - send verify email
export const verifyAccountSend = createAsyncThunk(
  "verify/send",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      email: payload,
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/verifyAccount`,
        sendData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//verify account url - after click
export const verifyAccountClick = createAsyncThunk(
  "verify/click",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      token: payload,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/verifyAccountAfter`,
        sendData,
        config
      );

      console.log(data);

      //store new verified user to the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update a user field
export const updateUserField = createAsyncThunk(
  "updateUser/field",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {
      firstName: payload,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/updateUser`,
        sendData,
        config
      );

      //store new verified user to the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update sub after cancel
export const subAfterCancel = createAsyncThunk(
  "subUpdate/cancel",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {};

    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/subStatusUpdateCancel`,
        sendData,
        config
      );
      //store new verified user to the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//sub update after renew
export const subAfterRenew = createAsyncThunk(
  "subAfter/renew",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const sendData = {};
    try {
      const { data } = await axios.put(
        `${baseURL}/api/v1/users/subStatusUpdateRenew`,
        sendData,
        config
      );
      //store new verified user to the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local state and put him into the store
let userAuth;

const userInfoToStr = localStorage.getItem("userInfo");

if (userInfoToStr && userInfoToStr !== "undefined") {
  try {
    userAuth = JSON.parse(userInfoToStr);
  } catch (error) {
    console.error("Failed to parse userInfo from localstorage", error);
    userAuth = null;
  }
} else {
  userAuth = null;
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: userAuth,
  },
  extraReducers: (builder) => {
    //register a user
    builder.addCase(redirectRegister, (state, action) => {
      state.redirectRegister = true;
    });
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectRegister = false;
      state.user = action?.payload?.createdUser;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //login a user
    builder.addCase(redirectLogin, (state, action) => {
      state.redirectLogin = true;
    });
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectLogin = false;
      state.user = action?.payload?.user;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //logout a user
    builder.addCase(redirectLogout, (state, action) => {
      state.redirectLogout = true;
    });
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectLogout = false;
      state.user = null;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //get user details
    builder.addCase(userDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.user;
      state.userDetails = action?.payload?.user;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(userDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //save a product
    builder.addCase(saveProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(saveProductAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //unsave a product
    builder.addCase(unsaveProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unsaveProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(unsaveProductAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //get subscription prices and plans
    builder.addCase(subPricesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subPricesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.subPrices = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subPricesAction.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //send email
    builder.addCase(redirectEmailSend, (state, action) => {
      state.redirectEmail = true;
    });
    builder.addCase(sendEmail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectEmail = false;
      state.emailSend = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //create session stripe aka checkout window
    builder.addCase(subSessionStripe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subSessionStripe.fulfilled, (state, action) => {
      state.loading = false;
      state.stripeSessionUrl = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subSessionStripe.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //sub status update after sucessfull payment
    builder.addCase(subStatusCtrl.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subStatusCtrl.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subStatusCtrl.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //customer portal creation
    builder.addCase(customerPortal.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(customerPortal.fulfilled, (state, action) => {
      state.loading = false;
      state.customerPortalUrl = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(customerPortal.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //get all users
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action?.payload?.user;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //update password
    builder.addCase(changePassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.updatedUser;
      state.userPassChange = action?.payload?.updatedUser;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //reset password url send to email
    builder.addCase(passwordResetUrl.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(passwordResetUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordResetUrl = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(passwordResetUrl.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //reset password after clicking the url
    builder.addCase(passwordResetClick.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(passwordResetClick.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordResetClick = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(passwordResetClick.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //send verification url
    builder.addCase(verifyAccountSend.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyAccountSend.fulfilled, (state, action) => {
      state.loading = false;
      state.verificationUrl = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(verifyAccountSend.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //verify after clicking the email link
    builder.addCase(verifyAccountClick.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyAccountClick.fulfilled, (state, action) => {
      state.loading = false;
      state.verifyAccountClick = action?.payload;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(verifyAccountClick.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //update user field
    builder.addCase(updateUserField.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserField.fulfilled, (state, action) => {
      state.loading = false;
      state.updateUserField = action?.payload;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(updateUserField.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //update sub after cancel
    builder.addCase(subAfterCancel.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subAfterCancel.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subAfterCancel.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //update sub renew
    builder.addCase(subAfterRenew.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subAfterRenew.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subAfterRenew.rejected, (state, action) => {
      state.loading = false;
      state.serverErr = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
  },
});

export default userSlice.reducer;
