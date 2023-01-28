import React from "react";
import { Component } from "react";

class ConfirmDecline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      declineReason: this.props.declineReason,
    };
  }
  handleOnChnage = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="application-modal-container">
          <div
            className="modal fade"
            id="confirmDecline"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              tabIndex="-1"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="delete-ad-head">
                    <h2>{this.props.heading}</h2>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="declineReason" placeholder="Please specify a reason for the decline. (this information will be shared with the buyer/dealer)"
                      onChange={this.handleOnChnage}
                      value={this.state.declineReason}
                    ></textarea>
                  </div>
                  <div className="delete-ad-button float-right">
                    <button
                      type="butoon"
                      data-dismiss="modal"
                      onClick={() =>
                        {
                          this.setState({ ...this.state, declineReason: "" })
                          window.$("#confirmDecline").modal("hide");
                          window.$("#updateStatusModel").modal("hide");
                        }
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="active"
                      onClick={() =>
                        this.props.update_application_decline(
                          this.props.tempSelect,
                          this.state.declineReason
                        )
                      }
                      data-dismiss="modal"
                    >
                      {" "}
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ConfirmDecline;
