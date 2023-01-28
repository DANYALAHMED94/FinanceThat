import React, { Component } from "react";
import GeneralApplicationDatatable from "../../../component/Application/generalApplication/GeneralApplicationDatatable";
import {
  get_pending_active_application,
  single_check_application,
  toggle_all_check,
  remove_all_state_application,
  delete_single_row,
  delete_multi_row,
  get_pending_active_application_paging,
  get_application_agents,
  get_vehicle_type
} from "../../../../actions/dealer/dealerApplicationActions";
import { connect } from "react-redux";
import $ from "jquery";
import { Helmet } from "react-helmet";
import moment from "moment";

class GeneralApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "pending",
      sort_by: "newest_first",
    };
  }
  componentDidMount() {
    this.props.get_application_agents();
    this.props.get_vehicle_type();
    $(document).ready(() => {
      "use strict";
      // Slide effect animation breakpoint
      // sm = 575.98px, md = 767.98px, lg = 991.98px or xl = 1199.98px
      var MaxWidth = window.matchMedia("(max-width: 767.98px)");
      // Slide effect animation transition speed
      var slideSpeedAnim = 350;
      // CSS media feature
      var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      // Slide effect animation toggle
      var slideSpeed;
      var slideSpeedInit = function () {
        if (mediaQuery.matches) {
          slideSpeed = 1;
        } else {
          slideSpeed = slideSpeedAnim;
        }
      };
      window.addEventListener("load", slideSpeedInit);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", slideSpeedInit);
      } else if (mediaQuery.attachEvent) {
        mediaQuery.attachEvent("change", slideSpeedInit);
      }
      // Jquery slide effect
      $(".jq-slide").on("show.bs.dropdown", function () {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .slideDown(slideSpeed);
      });
      $(".jq-slide").on("hide.bs.dropdown", function () {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .slideUp(slideSpeed);
      });
      // JqueryUI slide effect
      $(".jqui-slide").on("show.bs.dropdown", function () {
        if (MaxWidth.matches) {
          $(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .slideDown(slideSpeed);
        } else {
          $(this).find(".dropdown-menu").first().stop(true, true).show(
            "slide",
            {
              direction: "up",
            },
            slideSpeed
          );
        }
      });
      $(".jqui-slide").on("hide.bs.dropdown", function () {
        if (MaxWidth.matches) {
          $(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .slideUp(slideSpeed);
        } else {
          $(this).find(".dropdown-menu").first().stop(true, true).hide(
            "slide",
            {
              direction: "up",
            },
            slideSpeed
          );
        }
      });
    });
    const list = document.querySelectorAll(".list");
    function accordion(e) {
      // e.stopPropagation();
      if (this.classList.contains("active")) {
        this.classList.remove("#");
      } else if (
        this.parentElement.parentElement.classList.contains("active")
      ) {
        this.classList.add("active");
      } else {
        for (var i = 0; i < list.length; i++) {
          list[i].classList.remove("active");
        }
        this.classList.add("active");
      }
    }
    for (var i = 0; i < list.length; i++) {
      list[i].addEventListener("click", accordion);
    }

    /* Slidenav 4.0.0-alpha.5 ( https://github.com/tightcode/slidenav ) */
    const data = {
      sort_by: this.state.sort_by,
      p_size: 20,
      end_date: moment().format("YYYY-MM-DD"),
      start_date: moment().subtract(7, 'days').format("YYYY-MM-DD")
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    this.props.get_pending_active_application(data);
  }
  render() {
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Dealer Application List</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Dealer-Head">
          <h1>{"Applications"}</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <div className="tab-content" id="myTabContent">
            <div
              className={
                tab === "pending"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="private"
              role="tabpanel"
              aria-labelledby="private-tab"
            >

              <GeneralApplicationDatatable
                {...this.props}
                a_status="approved"
                application_type="general"
                sort_by={this.state.sort_by}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    application_data:
      state.dealerAdminReducer.dealerApplicationReducer.application_data,
    loading: state.dealerAdminReducer.dealerApplicationReducer.loading,
    checkedAllApplication:
      state.dealerAdminReducer.dealerApplicationReducer.checkedAllApplication,
    delete_application_loading:
      state.dealerAdminReducer.dealerApplicationReducer
        .delete_application_loading,
    delete_application_id:
      state.dealerAdminReducer.dealerApplicationReducer.delete_application_id,
    total_count:
      state.dealerAdminReducer.dealerApplicationReducer.total_count,
    pages_urls: state.dealerAdminReducer.dealerApplicationReducer.pages,
    agent_listing:
      state.dealerAdminReducer.dealerApplicationReducer.agent_listing,
    vehicle_types: state.dealerAdminReducer.dealerApplicationReducer.vehicle_types,
  };
};
export default connect(mapStateToProps, {
  get_pending_active_application,
  single_check_application,
  toggle_all_check,
  remove_all_state_application,
  delete_single_row,
  delete_multi_row,
  get_pending_active_application_paging,
  get_application_agents,
  get_vehicle_type
})(GeneralApplication);
