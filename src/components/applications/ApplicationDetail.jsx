import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import { capitalize, capsProvince } from "./../../_helpers/capitalize";

class ApplicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVehicleType: "",
      vehicleModel: "",
      vehicleMake: "",
      vehicleVin: "",
      selectVehicleYear: "",
      kilometer: "",
      price: "",
      condition: "",
      sellerName: "",
      dealerName: "",
      email: "",
      fax: "",
      streetAddress: "",
      province: "",
      city: "",
      postalCode: "",
      searchStockNumber: "",
      fileType: "",
    };
  }
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="MyApp-Head">
                <h1>Application 1123</h1>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="AppInfo-Container">
                <div class="AppInfo-Head">
                  <h1>
                    Applicant Information <span>Conditionally approved</span>
                  </h1>
                </div>

                <div class="AppContent-Container">
                  <div class="AppContent-Left">
                    <h1>John Doe</h1>
                    <h2>
                      john.doe@gmail.com
                      <br />
                      647-745-4543
                    </h2>
                  </div>

                  <div class="AppContent-Right">
                    <h3>Amount Requested</h3>
                    <h4>
                      <span>$</span> 2498.00
                    </h4>
                    <h5>July 23, 2020</h5>
                  </div>
                </div>
              </div>

              <div class="AppFinance-Container">
                <div class="AppFinance-Head">
                  <h1>Financing information</h1>
                </div>

                <div class="AppInner-Container">
                  <div class="AppInner-Left">
                    <h1>
                      Approved Amount <br />
                      <span>
                        <small>$</small> 2,000.00
                      </span>
                    </h1>
                    <h1>
                      Downpayment <br />
                      <span>
                        <small>$</small> 2,000.00
                      </span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      Amortization <br />
                      <span>108 Months</span>
                    </h1>
                    <h1>
                      Interest Rate <br />
                      <span>5.99%</span>
                    </h1>
                  </div>

                  <div class="AppInner-Btm">
                    <h4>Payments</h4>
                    <h5>
                      <small>$</small>2498.00<span>Monthly</span>
                    </h5>
                  </div>
                </div>
              </div>

              <div class="AppFinance-Container">
                <div class="AppFinance-Head">
                  <h1>Finance That Vehicle Information</h1>
                </div>

                <div class="FinanceThat-Form">
                  <label>Finance That Stock Number:</label>
                  <input
                    class="form-control"
                    type="text"
                    id="searchStockNumber"
                    name="searchStockNumber"
                    value={this.state.searchStockNumber}
                    onChange={this.handleOnChange}
                    placeholder="Type the stock number here"
                  />
                  <button type="submit">Search</button>
                </div>

                <div class="StockFound-Container">
                  <h4>Stock Found!</h4>

                  <div class="StockFound-InnerCont">
                    <h3>1231</h3>
                    <h4>1905 Can-Am Defender DPS HD10</h4>
                    <h5>$24,999</h5>
                  </div>

                  <div class="Attach-upload">
                    <label for="file-input">Attach</label>
                    <input id="file-input" type="file" />
                  </div>
                </div>
              </div>

              <div class="AppFinance-Container">
                <div class="AppFinance-Head">
                  <h1>Finance That Seller Information</h1>
                </div>

                <div class="AppInner-Container">
                  <div class="AppInner-Left">
                    <h1>
                      Seller Name <br />
                      <span>John Doe</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      Downpayment <br />
                      <span>2,000.00</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      Dealership Name <br />
                      <span>Dealership inc.</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      Email Address <br />
                      <span>info@dealership.ca</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      Street Address <br />
                      <span>123 Street Blvd</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1>
                      City <br />
                      <span>Brampton</span>
                    </h1>
                  </div>

                  <div class="AppInner-Left">
                    <h1 class="mb-0">
                      Postal Code <br />
                      <span>L6T 3J5</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="AppFinance-Container">
                <form>
                  <div class="AppFinance-Head">
                    <h1>Third Party Vehicle Information</h1>
                  </div>

                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Type of Vehicle</label>
                        <select
                          class="form-control"
                          id="selectVehicleType"
                          name="selectVehicleType"
                          onChange={this.handleOnChange}
                          value={this.state.selectVehicleType}
                        >
                          <option>Select one</option>
                          <option>Select two</option>
                          <option>Select three</option>
                          <option>Select four</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Vehicle Make</label>
                        <input
                          class="form-control"
                          type="text"
                          id="vehicleMake"
                          name="vehicleMake"
                          onChange={this.handleOnChange}
                          value={this.state.vehicleMake}
                          placeholder="Enter Make"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Vehicle Model</label>
                        <input
                          class="form-control"
                          type="text"
                          id="vehicleModel"
                          name="vehicleModel"
                          value={this.state.vehicleModel}
                          onChange={this.handleOnChange}
                          placeholder="Enter Model"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Vehicle Year</label>
                        <select
                          class="form-control"
                          id="selectVehicleYear"
                          name="selectVehicleYear"
                          value={this.state.selectVehicleYear}
                          onChange={this.handleOnChange}
                        >
                          <option>Select one</option>
                          <option>Select two</option>
                          <option>Select three</option>
                          <option>Select four</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>VIN</label>
                        <input
                          class="form-control"
                          type="text"
                          id="vehicleVin"
                          name="vehicleVin"
                          value={this.state.vehicleVin}
                          onChange={this.handleOnChange}
                          placeholder="Enter Make"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Kilometers</label>
                        <input
                          class="form-control"
                          type="number"
                          id="kilometer"
                          name="kilometer"
                          value={this.state.kilometer}
                          onChange={this.handleOnChange}
                          placeholder="Enter KM"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Price</label>
                        <input
                          class="form-control"
                          type="number"
                          id="price"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleOnChange}
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Form">
                        <label>Condition</label>
                        <select
                          class="form-control"
                          id="condition"
                          name="condition"
                          onChange={this.handleOnChange}
                        >
                          <option>Select one</option>
                          <option>Select two</option>
                          <option>Select three</option>
                          <option>Select four</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="ThirdParty-Btn">
                        <button type="submit">Save</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div class="AppFinance-Container">
                <form>
                  <div class="AppFinance-Head">
                    <h1>Third Party Seller Information</h1>
                  </div>

                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Seller Name</label>
                      <input
                        class="form-control"
                        type="text"
                        id="sellerName"
                        name="sellerName"
                        value={this.state.sellerName}
                        onChange={this.handleOnChange}
                        placeholder="Enter Name"
                      />
                      <div class="ThirdParty-Seller-Form"></div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Dealership Name</label>
                        <input
                          class="form-control"
                          type="text"
                          id="dealerName"
                          name="dealerName"
                          value={this.state.dealerName}
                          onChange={this.handleOnChange}
                          placeholder="Enter Dealership"
                        />
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Email Address</label>
                        <input
                          class="form-control"
                          type="text"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleOnChange}
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Telephone</label>
                        <input
                          class="form-control"
                          type="text"
                          id="telephone"
                          name="telephone"
                          value={this.state.telephone}
                          onChange={this.handleOnChange}
                          placeholder="Enter Telephone"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Fax number</label>
                        <input
                          class="form-control"
                          type="text"
                          id="fax"
                          name="fax"
                          value={this.state.fax}
                          onChange={this.handleOnChange}
                          placeholder="Enter Fax number"
                        />
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Street Address</label>
                        <input
                          class="form-control"
                          type="text"
                          id="streetAddress"
                          name="streetAddress"
                          value={this.state.streetAddress}
                          onChange={this.handleOnChange}
                          placeholder="Enter Street Address"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>Province</label>
                        <select
                          class="form-control"
                          id="province"
                          name="province"
                          value={capsProvince(this.state.province)}
                          onChange={this.handleOnChange}
                        >
                          <option>Select one</option>
                          <option>Select two</option>
                          <option>Select three</option>
                          <option>Select four</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form">
                        <label>City</label>
                        <input
                          class="form-control"
                          type="text"
                          id="city"
                          name="city"
                          value={capitalize(this.state.city)}
                          onChange={this.handleOnChange}
                          placeholder="Enter City"
                        />
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Seller-Form mb-0">
                        <label>Postal Code</label>
                        <MaskedInput
                          mask={[
                            /[a-zA-Z0-9]/i,
                            /[a-zA-Z0-9]/,
                            /[a-zA-Z0-9]/i,
                            " ",
                            /[a-zA-Z0-9]/,
                            /[a-zA-Z0-9]/i,
                            /[a-zA-Z0-9]/,
                          ]}
                          className="form-control"
                          guide={false}
                          placeholder="A2A 2A2"
                          id="postalCode"
                          name="postalCode"
                          // onBlur={() => this.validator.showMessageFor('Postal Code')}
                          value={this.state.postalCode}
                          onChange={this.handleOnChange}
                        />
                        {/* <input class="form-control" type="text" id="postalCode" name="postalCode" value={this.state.postalCode} onChange={this.handleOnChange} placeholder="Enter Postal Code" /> */}
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="ThirdParty-Btn mb-0">
                        <button type="submit" class="Mt-top">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="UpldDment-Container">
                <div class="UpldDment-Header">
                  <h1>Documents</h1>
                  <p>
                    You may upload documents related to your loan application
                    below. Please refer to File Type to see which documents are
                    requested for your application. Only PDF, JPG, JPEG, PNG
                    format allowed and with maximum size of 5MB per file.
                  </p>
                </div>

                <div class="DropZone-Container">
                  <div id="actions" class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="row">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                          <div class="Filetype-form">
                            <label>File Type</label>
                            <select
                              class="form-control"
                              id="fileType"
                              name="fileType"
                              value={this.state.fileType}
                              onChange={this.handleOnChange}
                            >
                              <option>Select One</option>
                              <option>Select Two</option>
                              <option>Select Four</option>
                              <option>Select Five</option>
                              <option>Select Six</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                          <div class="Filetype-form">
                            <span class="fileinput-button dz-clickable">
                              <i class="icon-upload-cloud"></i>
                              <span>Add files...</span>
                            </span>
                          </div>
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                          <div class="Filetype-form">
                            <button type="submit" class="start">
                              <span>Upload</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="table table-striped files" id="previews">
                    <div id="template" class="file-row dz-image-preview">
                      <div class="AddText">
                        <p class="name" data-dz-name></p>
                        <strong
                          class="error text-danger"
                          data-dz-errormessage
                        ></strong>
                      </div>

                      <div class="AddText">
                        <p class="size" data-dz-size></p>
                      </div>

                      <div class="HeadLast-Text">
                        <h3>January 23, 2020</h3>
                        <button data-dz-remove class="cancel">
                          <i class="icon-delete-trash"></i>
                        </button>
                      </div>
                    </div>
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
export default ApplicationDetail;
