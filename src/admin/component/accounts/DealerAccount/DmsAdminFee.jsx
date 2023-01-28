/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { update_dealer_profile } from "../../../../actions/admin/accountActions";

const DmsAdminFee = (props) => {
  const dispatch = useDispatch();
  const { dealer_id, loading_dealer_detail, admin_fee } = useSelector(
    ({ adminReducer }) => {
      return {
        dealer_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
        admin_fee: adminReducer.adminAccounts.pendingAccountReducer.admin_fee,
        loading_dealer_detail:
          adminReducer.adminAccounts.pendingAccountReducer
            .loading_dealer_detail,
      };
    }
  );
  const [adminFee, setAdminFee] = useState("");

  useEffect(() => {
    setAdminFee(admin_fee);
  }, [admin_fee]);

  const updateAdminFee = () => {
    props.goToNext(false);
    const admin_fee = adminFee
      .toString()
      .split(",")
      .join("")
      .split("$")
      .join("");
    var formData = new FormData();
    formData.append("admin_fee", admin_fee);
    dispatch(update_dealer_profile(formData, dealer_id));
  };
  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable">
          <div className="col-12">
            <div className="row lh-lg my-4">
              <h5>Admin fee</h5>
              <p className="label__color">
                Enter the admin fee you want to show under each listing on our
                marketplace.
              </p>
            </div>
            <hr></hr>
          </div>

          <div class="col-12">
            <div class="row">
              <div className="col-md-3">
                <label> Admin Fee </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <NumberFormat
                    required
                    className="form-control"
                    placeholder="$500"
                    thousandSeparator={true}
                    prefix={"$"}
                    allowNegative={false}
                    value={adminFee}
                    onChange={(e) => {
                      setAdminFee(e.target.value);
                      props.goToNext(true);
                    }}
                    name="adminFee"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="row">
              <div class="Dealerfoobtn float-end my-3">
                <button
                  className="btn btn-primary float-right active"
                  disabled={loading_dealer_detail}
                  onClick={updateAdminFee}
                >
                  {loading_dealer_detail ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DmsAdminFee;
