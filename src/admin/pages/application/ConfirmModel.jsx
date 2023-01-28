import React from "react";
import { Component } from "react";

class ConfirmModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="delete-add-modal-container">
          <div
            className="modal fade"
            id="updateStatusModel"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
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
                    <p>
                      {this.props.section1} <br />
                      {this.props.section2}
                    </p>
                  </div>
                  <div className="delete-ad-button">
                    <button
                      type="button"
                      className="active"
                      onClick={() =>
                        this.props.update_application_status(
                          this.props.tempSelect
                        )
                      }
                      data-dismiss="modal"
                    >
                      {" "}
                      Yes
                    </button>
                    <button onClick={() => {
                      window.$("#confirmDecline").modal("hide");
                      window.$("#updateStatusModel").modal("hide");
                    }
                    }
                      type="butoon" data-dismiss="modal">
                      No
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
export default ConfirmModel;
