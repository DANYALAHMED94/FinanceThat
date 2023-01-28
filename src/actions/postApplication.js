import {
  START_POST_APPLICATION,
  POST_APPLICATION_SUCCESS,
  END_POST_APPLICATION,
  GET_POST_APPLICATIONS,
  GET_DMS_POST_APPLICATIONS,
  GET_STOCK_RECORD_BY_ID,
  REMOVE_ALL_POST_APP_STATE,
  RESUBMIT_POST_APP,
  SET_RESUBMIT_TRUE,
  CONFIRM_POST_APPLICATION,
  LOADING_STOCK_BY_ID,
  LOADING,
  DISCARD_POST_STATE,
  PUT_UPDATE_SIN_REQUEST,
} from "../_constants/constants";
import { toastr } from "react-redux-toastr";
import axios from "../_helpers/axiosInterceptors";
function creditScore(credit700score) {
  let credit = `${credit700score}`;
  let start = credit.indexOf("SRC");
  let end = credit.indexOf("HEIGHT");
  return credit.slice(start + 12, end - 2);
}
function titleCase(str) {
  str = str.replace("_", " ");
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
function getProvince(str) {
  const isLargeNumber = (element) => element.value == str;
  const array1 = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NS", label: "Nova Scotia" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NU", label: "Nunavut" },
    { value: "YT", label: "Yukon" },
  ];
  let i = array1.findIndex(isLargeNumber);
  return array1[i]?.label;
}
export const save_post_application = (data, callback) => {
  return (dispatch) => {
    dispatch({
      type: START_POST_APPLICATION,
    });
    console.log("save_post_application", data);
    const url = `/application/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: { ...data },
      url,
    };
    axios(options)
      .then(async (response) => {
        // console.log(response)
        if (response.data.success == true) {
          dispatch({
            type: POST_APPLICATION_SUCCESS,
            response: response.data.response_type,
            message: response.data.message,
            amount: response.data.amount,
            app_id: response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : "",
            jumio_url: response.data.data.jumio_url,
            jumio_reference: response.data.data.jumio_reference,
            credit_score: response.data.data.score,
          });
          console.log(response.data.data, data);

          const { vehicle, seller } = response.data.data;
          let zapierPostData = {};
          if (data?.getFinancingAddPost != "yes") {
            // Post App Zapia
            zapierPostData = {
              // Applicant Data
              Applicant_Number: response?.data?.data?.id || "",
              Applicant_Email: data?.applicant_email || "",
              Application_Status: titleCase(
                response?.data?.data?.application_status_text || ""
              ),

              Applicant_credit_score: response?.data?.data?.score || "",
              Applicant_credit_report:
                creditScore(response?.data?.data?.credit700iframe) || "",
              Applicant_first_name: data.first_name || "",
              Applicant_last_name: data.last_name || "",
              Applicant_date_of_birth: data.dob || "",
              Applicant_phone_number: data.telephone || "",
              Applicant_marital_status: data.marital_status
                ? titleCase(data.marital_status)
                : "",
              Applicant_ssn: data.sin || "",
              Applicant_street_address: data.street_address || "",
              Applicant_city: data.city || "",
              Applicant_Postal_Code: data.postal_code || "",
              Applicant_country: data.country || "",
              Applicant_years_at_address: data.duration_address_yr || "",
              Applicant_home_status: data.status || "",
              Applicant_mortgage_amount: data.mortgage_amount || "",
              Applicant_employment_status: data.employement_status || "",
              Applicant_employment_type: data.type_of_employment || "",
              Applicant_employer_name: data.employer_name || "",
              Applicant_occupation: data.occupation || "",
              Applicant_employment_since: data.employment_since || "",
              Applicant_annual_income: data.gross_income || "",
              Applicant_business_name: data.business_name || "",
              // Applicant_business_start_date: "",
              Applicant_business_type: data.employer_address || "",
              Applicant_employer_street_address: data.type_of_business || "",
              Applicant_employer_city: data.employer_city || "",
              Applicant_employer_state: data.employer_province || "",
              Applicant_employer_phone: data.employer_telephone || "",
              Applicant_employer_email: data.employer_email || "",
              Loan_amount_requested: data?.financing_amount || "",
              Down_payment: data?.down_payment || "",
              iframe_link:
                response?.data?.data?.iframe_link?.replace(/["]+/g, "") || "",
            };
            if (data?.co_applicant) {
              zapierPostData = {
                ...zapierPostData,
                Co_applicant_first_name: data?.co_applicant.first_name || "",
                Co_applicant_last_name: data?.co_applicant.last_name || "",
                Co_applicant_date_of_birth: data?.co_applicant.dob || "",
                Co_applicant_phone_number: data?.co_applicant.telephone || "",
                Co_applicant_marital_status: titleCase(
                  data?.co_applicant.marital_status || ""
                ),
                Co_applicant_ssn: data?.co_applicant.sin || "",
                Co_applicant_street_address:
                  data?.co_applicant.street_address || "",
                Co_applicant_city: data?.co_applicant.city || "",
                Co_applicant_state: data?.co_applicant.province || "",
                Co_applicant_Postal_Code: data?.co_applicant.postal_code || "",
                Co_applicant_country: data?.co_applicant.country || "",
                Co_applicant_years_at_address:
                  data?.co_applicant.duration_address_yr || "",
                Co_applicant_home_status: data?.co_applicant.status || "",
                Co_applicant_mortgage_amount:
                  data?.co_applicant.mortgage_amount || "",
                Co_applicant_employment_status:
                  data?.co_applicant.employement_status || "",
                Co_applicant_employment_type:
                  data?.co_applicant.type_of_employment || "",
                Co_applicant_employer_name:
                  data?.co_applicant.employer_name || "",
                Co_applicant_occupation: data?.co_applicant.occupation || "",
                Co_applicant_employment_since:
                  data?.co_applicant.employment_since || "",
                Co_applicant_annual_income:
                  data?.co_applicant.gross_income || "",
                Co_applicant_business_name:
                  data?.co_applicant.business_name || "",
                // Co_applicant_business_start_date:data?.co_applicant || "",
                Co_applicant_business_type:
                  data?.co_applicant.type_of_business || "",
                Co_applicant_employer_street_address:
                  data?.co_applicant.employer_address || "",
                Co_applicant_employer_city:
                  data?.co_applicant.employer_city || "",
                Co_applicant_employer_state:
                  data?.co_applicant.employer_province || "",
                Co_applicant_employer_phone:
                  data?.co_applicant.employer_telephone || "",
                Co_applicant_employer_email:
                  data?.co_applicant.employer_email || "",
              };
            }
            const { vehicle, seller } = response.data.data;
            if (seller) {
              const sellerObj = {
                Seller_city: seller?.city || "",
                Seller_email: seller?.email || "",
                Seller_phone: seller?.telephone || "",
                Seller_state: seller?.province || "",
                Seller_street_address: seller?.street || "",
                Seller_Postal_Code: seller?.postal_code || "",
                Seller_name:
                  seller?.first_name || "" + " " + seller?.last_name || "",
              };

              zapierPostData = { ...zapierPostData, ...sellerObj };
            }
            if (vehicle && vehicle?.length > 0) {
              const vehicleObj = vehicle[0];
              const dataVehicle = data.vehicle[0];
              const velObj = {
                Applicant_Number: response?.data?.data?.id || "",
                Type_of_vehicle: dataVehicle?.type_of_vehicle_name || "",
                Sub_Type_Of_Vehicle: dataVehicle?.sub_type_of_vehicle_name || "",
                Vehicle_price: vehicleObj?.price || "",
                Vehicle_year: vehicleObj?.year || "",
                Vehicle_make: vehicleObj?.make || "",
                Vehicle_model: vehicleObj?.model || "",
                Vehicle_mileage: vehicleObj?.kilometer || "",
                Vehicle_VIN: vehicleObj?.vin || "",
                Vehicle_condition: vehicleObj?.condition || "",
                Fin_Vehicle_Stock: vehicleObj?.stock_id || "",
                Fin_Vehicle_price: vehicleObj.stock_id
                  ? vehicleObj?.price || ""
                  : "",
              };
              zapierPostData = { ...zapierPostData, ...velObj };
            } else if (data?.interested_vehicle_type) {
              zapierPostData.Type_of_vehicle =
                data?.interested_vehicle_type || "";
            }
          } else {
            // Quick App Zapia
            zapierPostData = {
              Type_Of_Vehicle: data?.vehicle_type || "",
              Sub_Type_Of_Vehicle: data?.sub_vehicle_type || "",
              Monthly_Budget: data?.monthly_budget || "",
              Down_Payment: data?.down_payment || "",
              Private_Seller:
                data && data.looking_for_private_seller === true ? "Yes" : "No",
              Employment_Status: data?.employement_status || "",
              Monthly_Income: data?.monthly_income || "",
              Employer_Name: data?.business_name || "",
              Street_Address: data?.street_address || "",
              City: data?.city || "",
              Postal_Code: data?.postal_code || "",
              Country: data?.country || "",

              Years_At_Address: data?.duration_address_yr || "",
              Phone_Number: data?.telephone || "",
              Application_Status: titleCase(
                response?.data?.data?.application_status_text || ""
              ),
              Date_Of_Birth: data?.dob || "",
              First_Name: data.first_name || "",
              Last_Name: data.last_name || "",
              Email_Address: data?.applicant_email || "",
              Credit_Score: response?.data?.data?.score || "",
              Credit_Report_Url:
                creditScore(response?.data?.data?.credit700iframe) || "",
              Province: getProvince(response?.data?.data?.province),
              // Occupation:data?.occupation || "",

              // Zip_Code:data?.postal_code || "",
              // State:state || "",
            };
            zapierPostData.iframe_link =
              response?.data?.data?.iframe_link?.replace(/["]+/g, "") || "";
          }
          // if(response?.data?.data?.application_status_text){
          //   let s = response?.data?.data?.application_status_text;
          //   zapierPostData.application_status =  s.charAt(0).toUpperCase() + s.slice(1);
          // }
          console.log(response, "response");

          console.log("zapierPostData", zapierPostData);
          if (data?.getFinancingAddPost == "yes") {
            if (
              process.env.NODE_ENV !== "development" &&
              process.env.NODE_ENV !== "staging"
            ) {
              let zapURL =
                "https://hooks.zapier.com/hooks/catch/6115399/ba14jol/";
              // if (data?.vehicle_type === "Construction") {
              //   zapURL =
              //     "https://hooks.zapier.com/hooks/catch/6115399/bwns5p6/";
              // }
              fetch(zapURL, {
                method: "POST",
                body: JSON.stringify(zapierPostData),
              })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((err) => console.log(err));
            }
          } else {
            if (
              process.env.NODE_ENV !== "development" &&
              process.env.NODE_ENV !== "staging"
            ) {
              fetch("https://hooks.zapier.com/hooks/catch/6115399/ba14jol/", {
                method: "POST",
                body: JSON.stringify(zapierPostData),
              })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((err) => console.log(err));
            }
          }
          callback && callback();
          toastr.success("Success", "Post App Created");
        }
      })
      .catch((err) => {
        dispatch({
          type: END_POST_APPLICATION,
        });
        const message = err?.response?.message?.postal_code
          ? err?.response?.message?.postal_code
          : err.response !== undefined && err.response !== null
          ? err.response.data.message !== undefined
            ? err.response.data.message
            : err.message
          : err.message;
        toastr.error(
          "Error",
          message?.postal_code ? "Invalid Postal Code" : message.toString()
        );
      });
  };
};

export const update_post_application = (data) => {
  return (dispatch) => {
    dispatch({
      type: START_POST_APPLICATION,
    });
    const url = `/application/${data.id}/`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: { ...data },
      url,
    };
    axios(options)
      .then(async (response) => {
        // console.log(response)
        if (response.data.success == true) {
          dispatch({
            type: POST_APPLICATION_SUCCESS,
            response: response.data.response_type,
            message: response.data.message,
            amount: response.data.amount,
            app_id: response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : "",
            jumio_url: response.data.data.jumio_url,
            jumio_reference: response.data.data.jumio_reference,
            credit_score: response.data.data.score,
          });
          console.log(response.data.data, data);

          let zapierPostData = { ...response.data.data };
          const { vehicle, seller } = response.data.data;
          if (vehicle?.length > 0 && seller) {
            const vehicleObj = vehicle[0];
            const sellerObj = {
              seller_city: seller.city,
              seller_dealership_name: seller.dealership_name,
              seller_email: seller.email,
              seller_fax: seller.fax,
              seller_first_name: seller.first_name,
              seller_id: seller.id,
              seller_last_name: seller.last_name,
              seller_telephone: seller.telephone,
              seller_street: seller.street,
              seller_postal_code: seller.postal_code,
            };

            zapierPostData = { ...zapierPostData, ...vehicleObj, ...sellerObj };
          }

          console.log("zapierPostData", zapierPostData);

          // if (process.env.NODE_ENV != "development" || "staging") {
          //   fetch("https://hooks.zapier.com/hooks/catch/6115399/buv8bb8/", {
          //     method: "POST",
          //     body: JSON.stringify(zapierPostData),
          //   })
          //     .then((response) => response.json())
          //     .then((json) => console.log(json))
          //     .catch((err) => console.log(err));
          // }

          toastr.success("Success", "Post App Created");
        }
      })
      .catch((err) => {
        dispatch({
          type: END_POST_APPLICATION,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const get_post_applications = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_POST_APPLICATIONS,
      response: [],
    });
    // http://127.0.0.1:8000/application?user_id=my_applications
    // const url = `/application/`
    // http://127.0.0.1:8000/application?user_id=my_applications
    const url = `/application/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      params: data,
      // params: {
      //   user_id: "my_applications",
      // },
      // params: data,
      url,
    };
    axios(options)
      .then((response) => {
        console.log(response);
        if (response.data.success == true) {
          dispatch({
            type: GET_POST_APPLICATIONS,
            response: response.data.data,
          });
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_dms_post_applications = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      response: true,
    });
    var data = {};
    console.log(
      localStorage.getItem("user_type"),
      "localStorage.getItem('user_type')"
    );
    if (Number(localStorage.getItem("user_type")) === 1) {
      data = {
        user_id: "my_applications",
      };
    } else {
      data = {
        user_id: "apps_on_my_listings",
      };
    }

    const url = `/application/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      params: data,
      // params: {
      //   user_id: "my_applications",
      // },
      // params: data,
      url,
    };
    axios(options)
      .then((response) => {
        if (response.data.success == true) {
          let obj = {
            General: response?.data?.data,
            Inventory: [],
            Manual: [],
            Approved: [],
            Declined: [],
            Withdrawn: [],
            Deleted: [],
          };
          response?.data?.data?.map((item) => {
            if (item.application_status == "1") {
              obj?.Inventory?.push(item);
            } else if (item.application_status == "2") {
              obj?.Manual?.push(item);
            } else if (item.application_status == "3") {
              obj?.Approved?.push(item);
            } else if (item.application_status == "4") {
              obj?.Declined?.push(item);
            } else if (item.application_status == "5") {
              obj?.Withdrawn?.push(item);
            } else if (item.application_status == "6") {
              obj?.Deleted?.push(item);
            }
          });
          dispatch({
            type: GET_DMS_POST_APPLICATIONS,
            response: obj,
          });
        }
        dispatch({
          type: LOADING,
          response: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          response: false,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const delete_single_row = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      response: true,
    });
    const url = `/del-application/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: { id: [id] },
      url,
    };
    axios(options)
      .then((response) => {
        if (response.data.success == true) {
          const message =
            response.data.message !== undefined &&
            response.data.message !== null
              ? response.data.message
              : "Deleted Successfully";
          toastr.success("Success", message.toString());
          dispatch(get_dms_post_applications());
          dispatch({
            type: LOADING,
            response: false,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          response: false,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const delete_multi_row = (ids) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      status: true,
    });
    const url = `/del-application/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: { id: ids },
      url,
    };
    axios(options)
      .then((response) => {
        if (response.data.success == true) {
          dispatch(get_dms_post_applications());
          const message =
            response.data.message !== undefined &&
            response.data.message !== null
              ? response.data.message
              : "Deleted Successfully";
          toastr.success("Success", message.toString());
        }
        dispatch({
          type: LOADING,
          status: false,
        });
      })

      .catch((err) => {
        dispatch({
          type: LOADING,
          status: false,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const get_stock_by_id = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_STOCK_BY_ID,
      status: true,
    });
    dispatch({
      type: GET_STOCK_RECORD_BY_ID,
      response: [],
      message: "",
    });
    // const url = `/ads/${id}/`;
    const url = `/listing/${id}/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          dispatch({
            type: GET_STOCK_RECORD_BY_ID,
            response: [response.data.data],
            message: "Vehicle Found!",
          });
        }
        dispatch({
          type: LOADING_STOCK_BY_ID,
          status: false,
        });
      })
      .catch((err) => {
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        // toastr.error('Error', message.toString())
        dispatch({
          type: GET_STOCK_RECORD_BY_ID,
          response: [],
          message: "We couldn’t find this stock number in our inventory",
        });
        dispatch({
          type: LOADING_STOCK_BY_ID,
          status: false,
        });
      });
  };
};
export const reSubmit_post_application = () => {
  return (dispatch) => {
    dispatch({
      type: RESUBMIT_POST_APP,
    });
  };
};

export const Update_Sin_Number = ({ id, sin }) => {
  return (dispatch) => {
    dispatch({
      type: PUT_UPDATE_SIN_REQUEST,
    });
    // dispatch({
    //   type: PUT_UPDATE_SIN_SUCCESS,
    // });
    // dispatch({
    //   type: PUT_UPDATE_SIN_FAILED,
    // });
    const url = `sin-verify/${id}/`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: { sin },
      url,
    };
    axios(options)
      .then(async (response) => {
        // console.log(response)
        if (response.data.success == true) {
          dispatch({
            type: POST_APPLICATION_SUCCESS,
            response: response.data.response_type,
            message: response.data.message,
            amount: response.data.amount,
            app_id: response.data.data
              ? response.data.data.id
                ? response.data.data.id
                : ""
              : "",
            jumio_url: response.data.data.jumio_url,
            jumio_reference: response.data.data.jumio_reference,
            credit_score: response.data.data.score,
          });

          toastr.success("Success", "Post App Created");
        }
      })
      .catch((err) => {
        dispatch({
          type: END_POST_APPLICATION,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const set_resubmit_application_true = () => {
  return (dispatch) => {
    dispatch({
      type: SET_RESUBMIT_TRUE,
    });
  };
};
export const confirm_post_application = () => {
  return (dispatch) => {
    dispatch({
      type: CONFIRM_POST_APPLICATION,
    });
  };
};
export const remove_all_post_state = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ALL_POST_APP_STATE,
    });
  };
};
export const discard_post_state = () => {
  return (dispatch) => {
    return dispatch({
      type: DISCARD_POST_STATE,
    });
  };
};
