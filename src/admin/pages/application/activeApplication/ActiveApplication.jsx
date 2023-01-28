import React, { Component } from "react";
import ActiveApplicationDatatable from "../../../component/Application/activeApplication/ActiveApplicationDatatable";
import {
  get_pending_active_application,
  single_check_application,
  toggle_all_check,
  remove_all_state_application,
  delete_single_row,
  delete_multi_row,
  get_application_agents,
} from "../../../../actions/admin/applicationActions";
import { connect } from "react-redux";
import $ from "jquery";
import { Helmet } from "react-helmet";

class ActiveApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "approved",
      sort_by: "newest_first",
    };
  }
  componentDidMount() {
    this.props.get_application_agents();
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
    const data = {
      a_status: "approved",
      sort_by: this.state.sort_by,
      p_size: 20,
    };
    this.props.get_pending_active_application(data);
  }

  render() {
    const { tab } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Active Application List</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Active Applications</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <div className="tab-content" id="myTabContent">
            <div
              className={
                tab === "approved"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="approved"
              role="tabpanel"
              aria-labelledby="private-tab"
            >
              <ActiveApplicationDatatable
                {...this.props}
                sort_by={this.state.sort_by}
                a_status="approved"
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
      state.adminReducer.adminAccounts.applicationReducer.application_data,
    loading: state.adminReducer.adminAccounts.applicationReducer.loading,
    checkedAllApplication:
      state.adminReducer.adminAccounts.applicationReducer.checkedAllApplication,
    delete_application_loading:
      state.adminReducer.adminAccounts.applicationReducer
        .delete_application_loading,
    delete_application_id:
      state.adminReducer.adminAccounts.applicationReducer.delete_application_id,
    agent_listing:
      state.adminReducer.adminAccounts.applicationReducer.agent_listing,
  };
};
export default connect(mapStateToProps, {
  get_pending_active_application,
  single_check_application,
  toggle_all_check,
  remove_all_state_application,
  delete_single_row,
  delete_multi_row,
  get_application_agents,
})(ActiveApplication);
