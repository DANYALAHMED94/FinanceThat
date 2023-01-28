import React from "react";
import { Component } from "react";

class ConfirmAlertChangeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        {console.log("showww")}
        <div className="delete-add-modal-container">
          <div
            className="modal fade"
            id="confirmModelChangeRoute"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            {console.log("show 2")}
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
                    <h2 style={{ fontSize: "16px", marginBottom: "15px" }}>
                      {this.props.bottomHeading}
                    </h2>
                  </div>
                  <div className="delete-ad-button">
                    <button
                      type="button"
                      className="active"
                      onClick={() => {
                        window.$('#confirmModelChangeRoute').modal('hide')
                        this.props.buttonAction()
                      }}
                      data-dismiss="modal"
                    >
                      {" "}
                      Yes
                    </button>
                    <button
                      type="butoon"
                      data-dismiss="modal"
                      onClick={() => {
                        window.$('#confirmModelChangeRoute').modal('hide')
                        this.props.cancel()
                      }}
                    >
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
export default ConfirmAlertChangeRoute;
