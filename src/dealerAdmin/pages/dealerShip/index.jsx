import React, { Component } from "react";
import DealerShipGeneral from "../../component/DealerShip/DealerShipGeneral";
import DealerOwners from "../../component/DealerShip/DealerOwners";
import DmsDocument from "../../component/DealerShip/DmsDocument";
import DmsVehical from "../../component/DealerShip/DmsVehical";
import ApplicationType from "../../component/DealerShip/ApplicationType"
import DmsLocation from "../../component/DealerShip/DmsLocation";
import DmsAdminFee from "../../component/DealerShip/DmsAdminFee";
import CreditScore from "../../component/DealerShip/CreditScore";
import { get_dealer_profile_data, get_dealer_credit_score } from "../../../actions/dealer/dealerShipActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";


class DealerShip extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (localStorage.getItem("userId")) {
      const dealerId = localStorage.getItem("userId")
      if(localStorage.getItem("is_staff") !== "true"){
        this.props.get_dealer_profile_data(dealerId)
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.dealer_id !== this.props.dealer_id && this.props.dealer_id){
      this.props.get_dealer_credit_score(this.props.dealer_id)
    }
  }

  componentWillUnmount() {
    // this.props.remove_all_state();
  }
  emptyFun = () => {
    return true;
  };
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Dealership</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Dealership</h1>
          <p style={{ color: "#667085" }} class="py-2">Manage your dealership information and application preferences.</p>
          <hr></hr>
        </div>

        <div className="container pe-5">

          <nav>
            <div class="dealership nav nav-tabs " id="nav-tab" role="tablist">
              <button class="nav-link rounded-0 rounded-start active " id="nav-General-tab" data-bs-toggle="tab" data-bs-target="#nav-General" type="button" role="tab" aria-controls="nav-General" aria-selected="true" >General</button>
              <button class="nav-link rounded-0" id="nav-Owner-tab" data-bs-toggle="tab" data-bs-target="#nav-Owner" type="button" role="tab" aria-controls="nav-Owner" aria-selected="false">Owner</button>
              <button class="nav-link rounded-0" id="nav-Documents-tab" data-bs-toggle="tab" data-bs-target="#nav-Documents" type="button" role="tab" aria-controls="nav-Documents" aria-selected="false">Documents</button>
              <button class="nav-link rounded-0 rounded-end" id="nav-AdminFee-tab" data-bs-toggle="tab" data-bs-target="#nav-applicationtype" type="button" role="tab" aria-controls="nav-applicationtype" aria-selected="false">Application Type</button>
              <button class="nav-link rounded-0" id="nav-Vehicles-tab" data-bs-toggle="tab" data-bs-target="#nav-Vehicles" type="button" role="tab" aria-controls="nav-Vehicles" aria-selected="false">Vehicles</button>
              <button class="nav-link rounded-0" id="nav-Locations-tab" data-bs-toggle="tab" data-bs-target="#nav-Locations" type="button" role="tab" aria-controls="nav-Locations" aria-selected="false">Locations</button>
              <button class="nav-link rounded-0" id="nav-creditscore-tab" data-bs-toggle="tab" data-bs-target="#nav-creditscore" type="button" role="tab" aria-controls="nav-creditscore" aria-selected="false">Credit Score</button>
              <button class="nav-link rounded-0 rounded-end" id="nav-AdminFee-tab" data-bs-toggle="tab" data-bs-target="#nav-AdminFee" type="button" role="tab" aria-controls="nav-AdminFee" aria-selected="false">Admin Fee</button>

            </div>
          </nav>

          <div class="dealership tab-content" id="nav-tabContent">

            <div class="tab-pane fade show active" id="nav-General" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DealerShipGeneral />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="nav-Owner" role="tabpanel" aria-labelledby="nav-Owner-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DealerOwners />
                </div>
              </div>
            </div>


            <div class="tab-pane fade" id="nav-Documents" role="tabpanel" aria-labelledby="nav-Documents-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DmsDocument
                  />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="nav-applicationtype" role="tabpanel" aria-labelledby="nav-AdminFee-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <ApplicationType />
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-Vehicles" role="tabpanel" aria-labelledby="nav-Vehicles-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DmsVehical />
                </div>
              </div>
            </div>



            <div class="tab-pane fade" id="nav-Locations" role="tabpanel" aria-labelledby="nav-Locations-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DmsLocation />
                </div>
              </div>
            </div>


            <div class="tab-pane fade" id="nav-creditscore" role="tabpanel" aria-labelledby="nav-Locations-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <CreditScore/>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="nav-AdminFee" role="tabpanel" aria-labelledby="nav-AdminFee-tab">
              <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                  <DmsAdminFee />
                </div>
              </div>
            </div>

          </div>
        </div>


      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    get_user_profile:
      state.dealerAdminReducer.dealerShipReducer.get_user_profile,
    profile_update_loading:
      state.dealerAdminReducer.dealerShipReducer.profile_update_loading,
      dealer_id: state.dealerAdminReducer.dealerShipReducer.get_user_profile.id,

  };
};
export default connect(mapStateToProps, {
  get_dealer_profile_data,
  get_dealer_credit_score
})(DealerShip);
