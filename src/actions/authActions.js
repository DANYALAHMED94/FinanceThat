import {
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  USERS_LOGIN_FAILURE,
  USERS_LOGOUT,
  REGISTER_REQUEST,
  USERS_REGISTER_SUCCESS,
  USERS_REGISTER_SUCCESS_POST_APP,
  REGISTER_FAILURE,
  VERIFY_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  VERIFY_LOGIN_USER,
  ADMIN_LOGOUT,
  ADMIN_SCREENS,
  USER_FORGOT_PASSWORD_LOADING,
  RESET_EMAIL_SENT,
  RESET_PASSWORD_ERROR,
  REMOVE_ALL_PROFILE_DETAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_FAILURE,
  OTP_SEND_START,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAILURE,
  DEALER_REGISTER,
  IS_LOADING_TRUE,
  IS_LOADING_FALSE,
  CHANGE_OTP_PHONE_NO,
  PERSONAL_LOAN_ZAP_LOADING,
PERSONAL_LOAN_ZAP_SUCCESS
} from "../_constants/constants";
import { history } from "../_helpers";
import { toastr } from "react-redux-toastr";
import simpleAxios from "../_helpers/axios";
import jwt_decode from "jwt-decode";
import axios from "../_helpers/axiosInterceptors";
import firebaseConfig from "../_constants/chatConfig";
import "firebase/database";
import {
  get_user_profile_data,
  get_dealer_profile_data,
  get_dealer_user_profile_data
} from "./userProfileActions";
import { change_autoComplete_lng_lat, change_map_lng_lat } from "./homeActions";
var database = firebaseConfig.database();

export const register = (data, isFromModalView = false, callback) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const url = `/buyer_details/create/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ ...data, is_active: true }),
      url,
    };
    const emailVerifyOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ email: data?.email }),
      url: "/check-mail/",
    };

    isFromModalView
      ? simpleAxios(emailVerifyOptions)
        .then((response) => {
          console.log(response, "res");
          // toastr.success("Success", "User Register Successfully");
          if (
            response.data.success !== undefined &&
            response.data.success == true
          ) {
            callback && callback();
            dispatch({
              type: USERS_REGISTER_SUCCESS,
              response: data,
            });
          } else {
            console.log(response, "erro");
            dispatch({
              type: REGISTER_FAILURE,
            });
            toastr.error("Error", response.data.message.toString());
          }
        })
        .catch((err) => {
          console.log("error", err?.response?.data?.message, err);
          const message = err?.response?.data?.message;
          dispatch({
            type: REGISTER_FAILURE,
          });
          toastr.error("Error", message.toString());
        })
      : simpleAxios(options)
        .then((response) => {
          // toastr.success('Success', 'User Register Successfully')
          if (
            response.data.success !== undefined &&
            response.data.success == true
          ) {
            dispatch({
              type: USERS_REGISTER_SUCCESS,
              response: response.data.data,
            });
            // if (data.redirect === undefined) {
            //     history.push('/login')
            // }
          } else {
            dispatch({
              type: REGISTER_FAILURE,
            });
            toastr.error("Error", response.data.message.toString());
          }
        })
        .catch((err) => {
          const message = err.response
            ? err.response.data
              ? err.response.data.message.password
                ? err.response.data.message.password[0]
                  ? err.response.data.message.password[0]
                  : err.response.data.message
                    ? err.response.data.message
                    : err.message
                : err.message
              : err.messgae
            : err.message;
          dispatch({
            type: REGISTER_FAILURE,
          });
          toastr.error("Error", message.toString());
        });
  };
};
/***
 *
 * Sign Up Post App
 */
export const postAppRegister = (data, verifyData) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const url = `/buyer_details/create/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        // toastr.success('Success', 'User Register Successfully')
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: USERS_REGISTER_SUCCESS_POST_APP,
            response: response.data.data,
          });
          dispatch(verify_user(verifyData));
        } else {
          dispatch({
            type: REGISTER_FAILURE,
          });
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message = err.response
          ? err.response.data
            ? err.response.data.message.password
              ? err.response.data.message.password[0]
                ? err.response.data.message.password[0]
                : err.response.data.message
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae
          : err.message;
        dispatch({
          type: REGISTER_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const verify_user = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: VERIFY_REQUEST,
    });

    const state = getState();

    console.log(state, "state", data);
    const url = `/email-verify/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: VERIFY_USER_SUCCESS,
            response: response.data.data,
          });
          // registring user
          const registrationState = state.authReducer.registration?.user_detail;
          console.log("registerData", registrationState);
          const createUrl = `/buyer_details/create/`;
          const createOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
              ...registrationState,
              is_active: true,
              no_email: true,
            }),
            url: createUrl,
          };

          simpleAxios(createOptions)
            .then((res) => {
              // toastr.success('Success', 'User Register Successfully')
              if (res.data.success !== undefined && res.data.success == true) {
                dispatch({
                  type: USERS_REGISTER_SUCCESS,
                  response: res.data.data,
                });

                // callback

                callback && callback();
                //  Login user
                const loginData = {
                  email: registrationState.email,
                  password: registrationState.password,
                };

                console.log(loginData, "loginData");
                dispatch(login_post_app(loginData));

                // if (
                //   res.data.data.is_active !== undefined &&
                //   res.data.data.is_active !== false
                // ) {
                //   var decoded = jwt_decode(res.data.data.access_token);
                //   dispatch({
                //     type: USERS_LOGIN_SUCCESS,
                //     user: decoded,
                //   });
                //   localStorage.setItem("user_type", res.data.data.user_type);
                //   localStorage.setItem("user", JSON.stringify(res.data.data));
                //   localStorage.setItem(
                //     "userId",
                //     res.data.data
                //       ? res.data.data.id
                //         ? res.data.data.id
                //         : ""
                //       : ""
                //   );
                //   if (Number(res.data.data.user_type) === 2) {
                //     if (res.data.data.id) {
                //       dispatch(get_dealer_profile_data(res.data.data.id));
                //     }
                //   } else {
                //     if (res.data.data.id) {
                //       dispatch(get_user_profile_data(res.data.data.id));
                //     }
                //   }
                // } else {
                //   dispatch({
                //     type: USERS_LOGIN_FAILURE,
                //   });
                //   toastr.error("Error", response.data.message.toString());
                // }
              } else {
                dispatch({
                  type: REGISTER_FAILURE,
                });
                toastr.error("Error", res.data.message.toString());
              }
            })
            .catch((err) => {
              const message = err.response
                ? err.response.data
                  ? err.response.data.message.password
                    ? err.response.data.message.password[0]
                      ? err.response.data.message.password[0]
                      : err.response.data.message
                        ? err.response.data.message
                        : err.message
                    : err.message
                  : err.messgae
                : err.message;
              dispatch({
                type: REGISTER_FAILURE,
              });
              toastr.error("Error", message.toString());
            });
          if (response.data.data) {
            database
              .ref("users/" + response.data.data.id)
              .once("value")
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // console.log(snapshot.val());
                } else {
                  database.ref("users/" + response.data.data.id).set(
                    {
                      id:
                        response.data.data.id !== undefined
                          ? response.data.data.id
                          : "",
                      name:
                        response.data.data.user !== undefined
                          ? response.data.data.user.toLowerCase()
                          : "",
                      email:
                        response.data.data.email !== undefined
                          ? response.data.data.email
                          : "",
                    },
                    (error) => {
                      if (error) {
                        console.log(error);
                        // The write failed...
                      } else {
                        // Data saved successfully!
                      }
                    }
                  );
                  console.log("No data available");
                  // return false
                }
              });
          }
        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined || err.response !== null
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        dispatch({
          type: VERIFY_USER_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const send_otp = (data, resendOTP = false, callback) => {
  return (dispatch) => {
    resendOTP ||
      dispatch({
        type: OTP_SEND_START,
      });
    const url = `/send-otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        console.log(response, "OTP");
        dispatch({
          type: OTP_SEND_SUCCESS,
        });
        if (response.data.success === true) {
          toastr.success(
            "Success",
            resendOTP ? "OTP resend" : response.data.message.toString()
          );
          callback && callback();
        } else {
          toastr.error(
            "Error",
            resendOTP ? "OTP not resend" : response.data.message.toString()
          );
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.messgae;
        dispatch({
          type: OTP_SEND_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "Error in sending otp, please try later!"
        );
      });
  };
};

export const verify_otp_simple = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: VERIFY_REQUEST,
    });

    const state = getState();

    console.log(state, "state", data);
    const url = `/verify-otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          // verification

          dispatch({
            type: VERIFY_USER_SUCCESS,
            response: response.data.data,
          });

          callback && callback();
        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        dispatch({
          type: VERIFY_USER_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "Error in verifying otp, please try later!"
        );
      });
  };
};

export const verify_otp = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: VERIFY_REQUEST,
    });

    const state = getState();

    console.log(state, "state", data);
    const url = `/verify-otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          // // verification

          // dispatch({
          //   type: VERIFY_USER_SUCCESS,
          //   response: response.data.data,
          // });

          // registring user
          const registrationState = state.authReducer.registration?.user_detail;
          console.log("registerData", registrationState);
          const createUrl = `/buyer_details/create/`;
          const createOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
              ...registrationState,
              is_active: true,
              no_email: true,
              is_verified: true,
              phone_number: data.phone,
            }),
            url: createUrl,
          };

          simpleAxios(createOptions)
            .then((res) => {
              dispatch({ type: CHANGE_OTP_PHONE_NO });
              // toastr.success('Success', 'User Register Successfully')
              if (res.data.success !== undefined && res.data.success == true) {
               // verification
                dispatch({
                  type: VERIFY_USER_SUCCESS,
                  response: response.data.data,
                });

                dispatch({
                  type: USERS_REGISTER_SUCCESS,
                  response: res.data.data,
                });

                const loginData = res?.data?.data || ""
          var decoded = jwt_decode(loginData.data.access);
          dispatch({
            type: USERS_LOGIN_SUCCESS,
            user: decoded,
          });
          localStorage.setItem("user_type", loginData.data.user_type);
          localStorage.setItem("user", JSON.stringify(loginData.data));
          localStorage.setItem(
            "userId",
            loginData.data
              ? loginData.data.id
                ? loginData.data.id
                : ""
              : ""
          );
          if (Number(loginData.data.user_type) === 2) {
            dispatch(get_dealer_profile_data(loginData.data.id));
          } else {
            dispatch(get_user_profile_data(loginData.data.id));
          }
                // callback

                callback && callback();
                // //  Login user
                // const loginData = {
                //   email: registrationState.email,
                //   password: registrationState.password,
                // };

                // console.log(loginData, "loginData");
                // /** Comment because now user have to login using phone number 19-05-2022 MH */
                // dispatch(login_post_app(loginData));

                // if (
                //   res.data.data.is_active !== undefined &&
                //   res.data.data.is_active !== false
                // ) {
                //   var decoded = jwt_decode(res.data.data.access_token);
                //   dispatch({
                //     type: USERS_LOGIN_SUCCESS,
                //     user: decoded,
                //   });
                //   localStorage.setItem("user_type", res.data.data.user_type);
                //   localStorage.setItem("user", JSON.stringify(res.data.data));
                //   localStorage.setItem(
                //     "userId",
                //     res.data.data
                //       ? res.data.data.id
                //         ? res.data.data.id
                //         : ""
                //       : ""
                //   );
                //   if (Number(res.data.data.user_type) === 2) {
                //     if (res.data.data.id) {
                //       dispatch(get_dealer_profile_data(res.data.data.id));
                //     }
                //   } else {
                //     if (res.data.data.id) {
                //       dispatch(get_user_profile_data(res.data.data.id));
                //     }
                //   }
                // } else {
                //   dispatch({
                //     type: USERS_LOGIN_FAILURE,
                //   });
                //   toastr.error("Error", response.data.message.toString());
                // }
              } else {
                dispatch({
                  type: REGISTER_FAILURE,
                });
                toastr.error("Error", res.data.message.toString());
              }
            })
            .catch((err) => {
              const message = err.response
                ? err.response.data
                  ? err.response.data.message.password
                    ? err.response.data.message.password[0]
                      ? err.response.data.message.password[0]
                      : err.response.data.message
                        ? err.response.data.message
                        : err.message
                    : err.message
                  : err.messgae
                : err.message;
              dispatch({
                type: REGISTER_FAILURE,
              });
              toastr.error("Error", message.toString());
            });
          if (response.data.data) {
            database
              .ref("users/" + response.data.data.id)
              .once("value")
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // console.log(snapshot.val());
                } else {
                  database.ref("users/" + response.data.data.id).set(
                    {
                      id:
                        response.data.data.id !== undefined
                          ? response.data.data.id
                          : "",
                      name:
                        response.data.data.user !== undefined
                          ? response.data.data.user.toLowerCase()
                          : "",
                      email:
                        response.data.data.email !== undefined
                          ? response.data.data.email
                          : "",
                    },
                    (error) => {
                      if (error) {
                        console.log(error);
                        // The write failed...
                      } else {
                        // Data saved successfully!
                      }
                    }
                  );
                  console.log("No data available");
                  // return false
                }
              });
          }
        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        dispatch({
          type: VERIFY_USER_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "Error in verifying otp, please try later!"
        );
      });
  };
};

export const verify_otp_dealer = (data, callback) => {

  return (dispatch, getState) => {
    dispatch({
      type: VERIFY_REQUEST,
    });
    dispatch({ type: IS_LOADING_TRUE });

    const state = getState();

    console.log(state, "state", data);
    const url = `/verify-otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {

          // verification

          // dispatch({
          //   type: VERIFY_USER_SUCCESS,
          //   response: response.data.data,
          // });

          // registring user

          let registrationState = state.authReducer.registration?.dealer_data;
         let dealerPreference =  state.authReducer.registration?.dealer_preference
          registrationState.append("phone_number", data.phone);
          console.log("registerData", registrationState);
          const createUrl = `/dealer_details/create/`;
          const createOptions = {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            data: registrationState,
            url: createUrl,
          };

          simpleAxios(createOptions)
            .then((res) => {

              dispatch({ type: CHANGE_OTP_PHONE_NO });
              // toastr.success('Success', 'User Register Successfully')
              if (res.data.success !== undefined && res.data.success == true) {
                dealerPreference = {...dealerPreference, user_id:res.data.user_id}
                if(dealerPreference.unmanaged){
                dispatch(add_unmanaged_dealer(dealerPreference))
              }
                dispatch({
                  type: VERIFY_USER_SUCCESS,
                  response: response.data.data,
                });
                dispatch({
                  type: DEALER_REGISTER,
                  response: res.data.data,
                });
                dispatch({ type: IS_LOADING_FALSE });
                console.log("1")
                // callback

                callback && callback();
                //  Login user
                // const loginData = {
                //   email: registrationState.email,
                //   password: registrationState.password,
                // };

                // console.log(loginData, "loginData");
                // dispatch(login_post_app(loginData));
              } else {
                dispatch({
                  type: REGISTER_FAILURE,
                });
                dispatch({ type: IS_LOADING_FALSE });
                console.log("6")
                toastr.error("Error", res.data.message.toString());
              }
            })
            .catch((err) => {
              dispatch({ type: IS_LOADING_FALSE });
              console.log("2")

              dispatch({ type: CHANGE_OTP_PHONE_NO });
              const message = err.response
                ? err.response.data
                  ? err.response.data.message.password
                    ? err.response.data.message.password[0]
                      ? err.response.data.message.password[0]
                      : err.response.data.message
                        ? err.response.data.message
                        : err.message
                    : err.message
                  : err.messgae
                : err.message;
              dispatch({
                type: REGISTER_FAILURE,
              });
              toastr.error("Error", message.toString());
            });
          if (response.data.data) {
            database
              .ref("users/" + response.data.data.id)
              .once("value")
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // console.log(snapshot.val());
                } else {
                  database.ref("users/" + response.data.data.id).set(
                    {
                      id:
                        response.data.data.id !== undefined
                          ? response.data.data.id
                          : "",
                      name:
                        response.data.data.user !== undefined
                          ? response.data.data.user.toLowerCase()
                          : "",
                      email:
                        response.data.data.email !== undefined
                          ? response.data.data.email
                          : "",
                    },
                    (error) => {
                      if (error) {
                        console.log(error);
                        // The write failed...
                      } else {
                        // Data saved successfully!
                      }
                    }
                  );
                  console.log("No data available");
                  // return false
                }
              });
          }
        } else {
          dispatch({ type: IS_LOADING_FALSE });
          console.log("4")
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        dispatch({ type: IS_LOADING_FALSE });
        console.log("5")
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        dispatch({
          type: VERIFY_USER_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "Error in verifying otp, please try later!"
        );
      });
  };
};

export const add_unmanaged_dealer = (data) => {
  return (dispatch) => {
    const url = `/makeunmanaged/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          toastr.success("Success", response.data.message.toString());
        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message = err.message || "Error In Un managed Dealer"
        toastr.error("Error", message.toString());
      });
  };
}


export const resend_email = (data) => {
  return (dispatch) => {
    const url = `/request-reset-email/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          toastr.success("Success", response.data.message.toString());
        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined || err.response !== null
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        toastr.error("Error", message.toString());
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch({
      type: USERS_LOGIN_REQUEST,
    });
    const url = `/api/token/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        localStorage.setItem('is_staff',response.data.data.is_staff)
        if (
          response.data.success === true &&
          response.data.data !== undefined &&
          response.data.data !== null &&
          response.data.data.is_staff === false
        ) {
          console.log(response.data.data);
          var decoded = jwt_decode(response.data.data.access);
          dispatch({
            type: USERS_LOGIN_SUCCESS,
            user: decoded,
          });
          localStorage.setItem("user_type", response.data.data.user_type);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "userId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
          if (Number(response.data.data.user_type) === 2) {
            dispatch(get_dealer_profile_data(response.data.data.id));
          } else {
            dispatch(get_user_profile_data(response.data.data.id));
          }
          if (data.redirect === undefined) {
            const redirectTo =
              history.location.state !== undefined &&
                history.location.state !== null
                ? history.location.state.prevLocation !== undefined &&
                  history.location.state.prevLocation !== null
                  ? history.location.state.prevLocation
                  : "/"
                : "/";
            history.push(redirectTo);
          }
        } else if (response.data.success === true &&
          response.data.data !== undefined &&
          response.data.data !== null &&
          response.data.data.is_staff === true && +response.data.data.user_type === 2) {
            localStorage.setItem('staff_dealer',response.data.data.dealer_id);
            var decoded = jwt_decode(response.data.data.access);
            dispatch({
              type: USERS_LOGIN_SUCCESS,
              user: decoded,
            });
            localStorage.setItem("user_type", response.data.data.user_type);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            localStorage.setItem(
              "userId",
              response.data.data
                ? response.data.data.id
                  ? response.data.data.id
                  : ""
                : ""
            );
            if (Number(response.data.data.user_type) === 2) {
              dispatch(get_dealer_user_profile_data(response.data.data.id))
              // dispatch(get_dealer_profile_data(response.data.data.id));
            } else {
              // dispatch(get_user_profile_data(response.data.data.id));
            }
            if (data.redirect === undefined) {
              const redirectTo =
                history.location.state !== undefined &&
                  history.location.state !== null
                  ? history.location.state.prevLocation !== undefined &&
                    history.location.state.prevLocation !== null
                    ? history.location.state.prevLocation
                    : "/"
                  : "/";
              history.push(redirectTo);
            }

          }else if (
          response.data.success === true &&
          response.data.data &&
          response.data.data.is_staff === true
        ) {
          dispatch({
            type: USERS_LOGIN_FAILURE,
          });
          toastr.error("Error", "Please Enter Valid Credentials");
        } else {
          if (
            response.data.success === false &&
            response.data.data !== undefined &&
            response.data.data !== null &&
            response.data.data.is_verified === false
          ) {
            dispatch({
              type: VERIFY_LOGIN_USER,
            });
            toastr.error("Error", response.data.message.toString());
          } else {
            dispatch({
              type: USERS_LOGIN_FAILURE,
            });
            // toastr.error('Error', 'Please Enter Valid Credentials')
            toastr.error("Error", response.data.message.toString());
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: USERS_LOGIN_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const login_post_app = (data) => {
  return (dispatch) => {
    dispatch({
      type: USERS_LOGIN_REQUEST,
    });
    const url = `/api/token/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success === true &&
          response.data.data !== undefined &&
          response.data.data !== null &&
          response.data.data.is_staff === false
        ) {
          console.log(response.data.data);
          var decoded = jwt_decode(response.data.data.access);
          dispatch({
            type: USERS_LOGIN_SUCCESS,
            user: decoded,
          });
          localStorage.setItem("user_type", response.data.data.user_type);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "userId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
          if (Number(response.data.data.user_type) === 2) {
            dispatch(get_dealer_profile_data(response.data.data.id));
          } else {
            dispatch(get_user_profile_data(response.data.data.id));
          }
          if (data.redirect === undefined) {
            const redirectTo =
              history.location.state !== undefined &&
                history.location.state !== null
                ? history.location.state.prevLocation !== undefined &&
                  history.location.state.prevLocation !== null
                  ? history.location.state.prevLocation
                  : "/"
                : "/";
            // history.push(redirectTo);
          }
        } else if (
          response.data.success === true &&
          response.data.data &&
          response.data.data.is_staff === true
        ) {
          dispatch({
            type: USERS_LOGIN_FAILURE,
          });
          toastr.error("Error", "Please Enter Valid Credentials");
        } else {
          if (
            response.data.success === false &&
            response.data.data !== undefined &&
            response.data.data !== null &&
            response.data.data.is_verified === false
          ) {
            dispatch({
              type: VERIFY_LOGIN_USER,
            });
            toastr.error("Error", response.data.message.toString());
          } else {
            dispatch({
              type: USERS_LOGIN_FAILURE,
            });
            // toastr.error('Error', 'Please Enter Valid Credentials')
            toastr.error("Error", response.data.message.toString());
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: USERS_LOGIN_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const admin_login = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });
    const url = `/api/token/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success === true &&
          response.data.data !== undefined &&
          response.data.data !== null &&
          response.data.data.is_staff === true
        ) {
          if(response.data.data.dealer_id === null && ![1, 2].includes(+response.data.data.user_type)){
            localStorage.setItem("admin_user_type", response.data.data.user_type);
            localStorage.setItem("admin", JSON.stringify(response.data.data));
            localStorage.setItem(
              "adminId",
              response.data.data
                ? response.data.data.id
                  ? response.data.data.id
                  : ""
                : ""
            );
            var decoded = jwt_decode(response.data.data.access);
            dispatch({
              type: ADMIN_LOGIN_SUCCESS,
              admin: decoded,
            });
            dispatch(get_agents_screens(response.data.data.id));
          }else {
            dispatch({
              type: ADMIN_LOGIN_FAILURE,
            });
            toastr.error("Error", "Please Enter Valid Credentials");
          }

        } else if (
          response.data.success === true &&
          response.data.data &&
          response.data.data.is_staff === false
        ) {
          dispatch({
            type: ADMIN_LOGIN_FAILURE,
          });
          toastr.error("Error", "Please Enter Valid Credentials");
        } else {
          if (
            response.data.success === false &&
            response.data.data !== undefined &&
            response.data.data !== null &&
            response.data.data.is_verified === false
          ) {
            dispatch({
              type: VERIFY_LOGIN_USER,
            });
            toastr.error("Error", response.data.message.toString());
          } else {
            dispatch({
              type: ADMIN_LOGIN_FAILURE,
            });
            toastr.error("Error", response.data.message.toString());
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: ADMIN_LOGIN_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const forgot_password = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_FORGOT_PASSWORD_LOADING,
      status: true,
    });
    dispatch({
      type: RESET_PASSWORD_ERROR,
      message: "",
    });
    const url = `/password-reset/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success === true
        ) {
          dispatch({
            type: RESET_EMAIL_SENT,
          });
          toastr.success("Success", response.data.message.toString());
        } else {
          dispatch({
            type: RESET_PASSWORD_ERROR,
            message: response.data.message,
          });
          // toastr.error('Error', response.data.message.toString())
        }
        dispatch({
          type: USER_FORGOT_PASSWORD_LOADING,
          status: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: USER_FORGOT_PASSWORD_LOADING,
          status: false,
        });
        toastr.error("Error", message.toString());
      });
  };
};
export const update_forgot_password = (data, token) => {
  return (dispatch) => {
    dispatch({
      type: USER_FORGOT_PASSWORD_LOADING,
      status: true,
    });
    const url = `/password-reset-done/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        console.log(response);
        if (
          response.data.success === true &&
          response.data.data.is_staff === false
        ) {
          console.log(response.data.data);
          var decoded = jwt_decode(response.data.data.access);
          dispatch({
            type: USERS_LOGIN_SUCCESS,
            user: decoded,
          });
          localStorage.setItem("user_type", response.data.data.user_type);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "userId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
          if (data.redirect === undefined) {
            const redirectTo =
              history.location.state !== undefined &&
                history.location.state !== null
                ? history.location.state.prevLocation !== undefined &&
                  history.location.state.prevLocation !== null
                  ? history.location.state.prevLocation
                  : "/"
                : "/";
            history.push(redirectTo);
          }
        } else if (
          response.data.success === true &&
          response.data.data.is_staff === true
        ) {
          localStorage.setItem("admin_user_type", response.data.data.user_type);
          localStorage.setItem("admin", JSON.stringify(response.data.data));
          localStorage.setItem(
            "adminId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
          var decoded = jwt_decode(response.data.data.access);
          dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            admin: decoded,
          });
          dispatch(get_agents_screens(response.data.data.id));
        } else {
          if (
            response.data.success === false &&
            response.data.data.is_verified === false
          ) {
            // dispatch({
            //     type: VERIFY_LOGIN_USER,

            // })
            toastr.error("Error", response.data.message.toString());
          } else {
            dispatch({
              type: USER_FORGOT_PASSWORD_LOADING,
              status: false,
            });
            toastr.error("Error", response.data.message.toString());
          }
          dispatch({
            type: USER_FORGOT_PASSWORD_LOADING,
            status: false,
          });
        }

        // if (response.data.success !== undefined && response.data.success == true) {
        //     toastr.success('Success', response.data.message.toString())
        // } else {
        //     toastr.error('Error', response.data.message.toString())
        // }
        // dispatch({
        //     type: USER_FORGOT_PASSWORD_LOADING,
        //     status: false
        // })
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: USER_FORGOT_PASSWORD_LOADING,
          status: false,
        });
        toastr.error("Error", message.toString());
      });
  };
};

export const user_remian_login = (data) => {
  return (dispatch) => {
    var decoded = jwt_decode(data.access);
    dispatch({
      type: USERS_LOGIN_SUCCESS,
      user: decoded,
    });
  };
};
export const admin_remian_login = (data) => {
  return (dispatch) => {
    var decoded = jwt_decode(data.access);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      admin: decoded,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: USERS_LOGOUT,
    });
    dispatch({
      type: REMOVE_ALL_PROFILE_DETAIL,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("user_type");
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEdit");
    localStorage.removeItem("coApplicantEditPostApp");
    localStorage.removeItem("lastStepDealerPostAppEdit");
    localStorage.removeItem("coApplicantDealerEditPostApp");
    localStorage.removeItem("userId");
    localStorage.removeItem("is_staff")
    localStorage.removeItem("staff_dealer")
    localStorage.removeItem("dealerSccrens")
    history.push("/");
  };
};
export const admin_logout = () => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_LOGOUT,
    });
    localStorage.removeItem("admin_user_type");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminSccrens");
    localStorage.removeItem("lastAdminStepPostAppEdit");
    localStorage.removeItem("coAdminApplicantEditPostApp");
    localStorage.removeItem("adminId");
    // history.push("/");
    window.location("/");
  };
};

export const logout_session = () => {
  return (dispatch) => {
    dispatch({
      type: USERS_LOGOUT,
    });
    dispatch({
      type: REMOVE_ALL_PROFILE_DETAIL,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("user_type");
    localStorage.removeItem("dealerScreens");
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEdit");
    localStorage.removeItem("coApplicantEditPostApp");
    localStorage.removeItem("lastStepDealerPostAppEdit");
    localStorage.removeItem("coApplicantDealerEditPostApp");
    localStorage.removeItem("userId");
  };
};

export const refresh_token = (refresh_token, screen) => {
  return (dispatch) => {
    const url = `/api/token/refresh/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(refresh_token),
      url,
    };
    axios(options)
      .then((response) => {
        if (screen === "admin") {
          localStorage.setItem("admin_user_type", response.data.data.user_type);
          localStorage.setItem("admin", JSON.stringify(response.data.data));
          localStorage.setItem(
            "adminId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
        } else {
          localStorage.setItem("user_type", response.data.data.user_type);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "userId",
            response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : ""
          );
          // localStorage.setItem('user', JSON.stringify(response.data))
        }
      })
      .catch((err) => {
        console.log("err", err);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
          toastr.error("Error", message.toString());
        } else if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          (err.response.status === 403 || err.response.status === 401)
        ) {
          if (screen === "admin") {
            localStorage.removeItem("admin_user_type");
            localStorage.removeItem("admin");
            localStorage.removeItem("adminSccrens");
            localStorage.removeItem("lastAdminStepPostAppEdit");
            localStorage.removeItem("coAdminApplicantEditPostApp");
            localStorage.removeItem("adminId");
            history.push("/secure/admin-login");
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("user_type");
            localStorage.removeItem("dealerSccrens");
            localStorage.removeItem("lastStepPostAppEditAdmin");
            localStorage.removeItem("coApplicantEditPostAppAdmin");
            localStorage.removeItem("lastStepPostAppEditAdmin");
            localStorage.removeItem("coApplicantEditPostAppAdmin");
            localStorage.removeItem("lastStepPostAppEdit");
            localStorage.removeItem("coApplicantEditPostApp");
            localStorage.removeItem("lastStepDealerPostAppEdit");
            localStorage.removeItem("coApplicantDealerEditPostApp");
            localStorage.removeItem("userId");
            history.push("/");
          }
        } else {
          message =
            err.response !== undefined || err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.detail
                : err.message
              : err.message;
          toastr.error("Error", message.toString());
        }
        // console.log(message)
        dispatch({
          type: USERS_LOGIN_FAILURE,
        });
        // typeof message.toString() !== "undefined" ? message.toString() :
      });
  };
};

export const get_agents_screens = (id) => {
  return (dispatch) => {
    const url = `/ap_adminuser/${id}/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (response.data.success === true) {
          const screens =
            response.data.data !== undefined && response.data.data !== null
              ? response.data.data[0] !== undefined &&
                response.data.data[0] !== null
                ? response.data.data[0].upuser_id !== undefined &&
                  response.data.data[0].upuser_id !== null
                  ? response.data.data[0].upuser_id
                  : []
                : []
              : [];
          localStorage.setItem("adminSccrens", JSON.stringify(screens));
          // history.push('/admin')
          dispatch({
            type: ADMIN_SCREENS,
            screens: screens,
          });
          const redirectTo =
            history.location.state !== undefined &&
              history.location.state !== null
              ? history.location.state.prevLocation !== undefined &&
                history.location.state.prevLocation !== null
                ? history.location.state.prevLocation
                : "/admin"
              : "/admin";
          window.location.href = redirectTo;
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        toastr.error("Error", message.toString());
      });
  };
};
export const get_agents_screen = (id) => {
  return (dispatch) => {
    const url = `/ap_adminuser/${id}/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (response.data.success === true) {
          const screens =
            response.data.data !== undefined && response.data.data !== null
              ? response.data.data[0] !== undefined &&
                response.data.data[0] !== null
                ? response.data.data[0].upuser_id !== undefined &&
                  response.data.data[0].upuser_id !== null
                  ? response.data.data[0].upuser_id
                  : []
                : []
              : [];
              if(response.data.data[0].dealer_id){
                localStorage.setItem("dealerSccrens", JSON.stringify(screens));
              }else {
                localStorage.setItem("adminSccrens", JSON.stringify(screens));
              }
          // history.push('/admin')
          dispatch({
            type: ADMIN_SCREENS,
            screens: screens,
          });
        }else {
          localStorage.setItem("adminSccrens", JSON.stringify([]));
          localStorage.setItem("dealerSccrens", JSON.stringify([]));
          dispatch({
            type: ADMIN_SCREENS,
            screens: [],
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        localStorage.setItem("dealerSccrens", JSON.stringify([]));
        localStorage.setItem("adminSccrens", JSON.stringify([]));
        dispatch({
          type: ADMIN_SCREENS,
          screens: [],
        });
        toastr.error("Error", message.toString());
      });
  };
};
export const logout_session_admin = () => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_LOGOUT,
    });
    localStorage.removeItem("admin_user_type");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminSccrens");
    localStorage.removeItem("lastAdminStepPostAppEdit");
    localStorage.removeItem("coAdminApplicantEditPostApp");
    localStorage.removeItem("adminId");
  };
};
export const admin_screens = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_SCREENS,
      screens: data,
    });
  };
};

export const get_user_location_by_ip = () => async (dispatch) => {
  try {
    const res = await simpleAxios.get(
      `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_IP_LOOKUP_KEY}`
    );

    const data = {
      lat: res.data.lat,
      lng: res.data.lon,
      city: res.data.city,
      state: res.data.regionName,
    };
    console.log("location DATAtaaa", res.data);

    dispatch(change_autoComplete_lng_lat(data));
    dispatch(change_map_lng_lat(data));
  } catch (error) {
    console.log(error);
  }
};

export const verfiy_dealer_telephone =(data, resendOTP = false, setUserId) => {
  return (dispatch) => {
    resendOTP ||
      dispatch({
        type: OTP_SEND_START,
      });
    const url = `/verifyuser/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        console.log(response, "Verify Phone");
        if (response.data.success === true) {
          setUserId(response?.data?.data?.id || "")
         dispatch(send_otp(data, resendOTP))
        } else {
          dispatch({
            type: OTP_SEND_FAILURE,
          });
          toastr.error(
            "Error",
            resendOTP ? "Phone number is not verify" : response.data.message.toString()
          );
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.messgae;
        dispatch({
          type: OTP_SEND_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "in verifying the number, please try later!"
        );
      });
  };
}

export const dealer_login_with_phone = (data) => {
  return dispatch => {
    const url = `/login_with_otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        const loginData = response?.data?.data || ""
        if (
          loginData.success === true &&
          loginData.data !== undefined &&
          loginData.data !== null &&
          loginData.data.is_staff === false
        ) {
          var decoded = jwt_decode(loginData.data.access);
          dispatch({
            type: USERS_LOGIN_SUCCESS,
            user: decoded,
          });
          localStorage.setItem("user_type", loginData.data.user_type);
          localStorage.setItem("user", JSON.stringify(loginData.data));
          localStorage.setItem(
            "userId",
            loginData.data
              ? loginData.data.id
                ? loginData.data.id
                : ""
              : ""
          );
          if (Number(loginData.data.user_type) === 2) {
            dispatch(get_dealer_profile_data(loginData.data.id));
          } else {
            dispatch(get_user_profile_data(loginData.data.id));
          }
          if (data.redirect === undefined) {
            const redirectTo =
              history.location.state !== undefined &&
                history.location.state !== null
                ? history.location.state.prevLocation !== undefined &&
                  history.location.state.prevLocation !== null
                  ? history.location.state.prevLocation
                  : "/"
                : "/";
            history.push(redirectTo);
          }
        } else if (
          loginData.success === true &&
          loginData.data &&
          loginData.data.is_staff === true
        ) {
          dispatch({
            type: USERS_LOGIN_FAILURE,
          });
          toastr.error("Error", "Please Enter Valid Credentials");
        } else {
          if (
            loginData.success === false &&
            loginData.data !== undefined &&
            loginData.data !== null &&
            loginData.data.is_verified === false
          ) {
            dispatch({
              type: VERIFY_LOGIN_USER,
            });
            toastr.error("Error", loginData.message.toString());
          } else {
            dispatch({
              type: USERS_LOGIN_FAILURE,
            });
            // toastr.error('Error', 'Please Enter Valid Credentials')
            toastr.error("Error", loginData.message.toString());
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = "";
        if (
          err.response !== undefined &&
          err.response.status !== undefined &&
          err.response.status === 500
        ) {
          message = err.response.statusText;
        } else {
          message =
            err.response !== undefined && err.response !== null
              ? err.response.data !== undefined
                ? err.response.data.message
                : err.message
              : err.message;
        }
        dispatch({
          type: USERS_LOGIN_FAILURE,
        });
        toastr.error("Error", message.toString());
      });
  }
}

export const dealer_verify_with_phone =(data, userId) => {
  return (dispatch) => {
    dispatch({
      type: VERIFY_REQUEST,
    });

    console.log(data, "dealer_login_with_phone");
    const url = `/verify-otp/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          // verification

          dispatch({
            type: VERIFY_USER_SUCCESS,
            response: response.data.data,
          });
const loginData = {
  id:userId || "",
  user:true
}
          // Login Dealer With Phone
        dispatch(dealer_login_with_phone(loginData))

        } else {
          toastr.error("Error", response.data.message.toString());
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined &&
            err.response !== null &&
            err.response.data
            ? err.response.data !== undefined &&
              err.response.data.message !== undefined
              ? err.response.data.message.password !== undefined
                ? err.response.data.message.password[0]
                : err.response.data.message !== undefined
                  ? err.response.data.message
                  : err.message
              : err.message
            : err.messgae;
        dispatch({
          type: VERIFY_USER_FAILURE,
        });
        toastr.error(
          "Error",
          message
            ? message.toString()
            : "Error in verifying otp, please try later!"
        );
      });
  };
}

export const save_personal_loan_zap =(data) => {
  return (dispatch) => {
  // https://dev-api.financethat.ca/personal/loan/mail/
  let zapierPostData = {
    Loan_Amount:data.loan_amount,
    Type_Of_Loan: data.type_of_loan,
    Sub_Type_Of_Loan:data.sub_type_of_loan,
    Employement_Status: data.employement_status,
    Occupation:data.employment_designation,
    //  monthly income can be a range as well
    Monthly_Income: data.monthly_income,
    Employer_Name: data.employer_name,
    Employment_Designation: data.employment_designation,
    Street_Address: data.street_address,
    Unit_Number:data.unit_number,
    City: data.city,
    Province: data.province_full,
    Postal_Code: data.postal_code,
    Country: data.country,
    // address yr can be in range
    // -1 , 1-3 , 3-5 , 5+
    dob:data.dob,
    First_Name: data.first_name,
    Last_Name: data.last_name,
    Telephone: data.telephone,
    Applicant_Email: data.applicant_email,
    Existing_Loan:data.existingLoan||"",
    Bankruptcy:data.bankRuptcy||"",

  }
  const url = `/personal/loan/mail/`
  const options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      data: (zapierPostData),
      url
  }
  simpleAxios(options)
      .then(response => {
        if (
          process.env.NODE_ENV != "development" &&
          process.env.NODE_ENV != "staging"
        ) {
         delete zapierPostData.Employment_Designation
          console.log(zapierPostData, "PERSONAL LOAN ZAP")
          dispatch({
            type: PERSONAL_LOAN_ZAP_LOADING,
            status:true
          });
          fetch("https://hooks.zapier.com/hooks/catch/6115399/bwns5p6/", {
            method: "POST",
            body: JSON.stringify(zapierPostData),
          })
            .then((response) => response.json())
            .then((json) => {
              dispatch({
                type: PERSONAL_LOAN_ZAP_LOADING,
                status:false
              });
              dispatch({
                type:PERSONAL_LOAN_ZAP_SUCCESS
              })
              console.log(json)})
            .catch((err) =>{
              dispatch({
                type: PERSONAL_LOAN_ZAP_LOADING,
                status:false
              });
              toastr.error("Error", err.message.toString());
              console.log(err)});
        }

      })
      .catch(err => {
          dispatch({
              type: REGISTER_FAILURE
          })
          const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
          toastr.error('Error', message)
      })
  }
}