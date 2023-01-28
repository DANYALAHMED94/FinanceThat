/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import UnManagedApplication from './UnManagedApplication';
import ManagedApplication from './ManagedApplication';
import PrivateSaleApplication from './PrivateSaleApplication';
import InHouseApplication from './InHouseApplication';
import { get_vehicle_type } from "../../../../actions/addPostActions";
import {
    get_application_agents, remove_all_state_application, get_assigned_dealer,
    get_unit_from
} from '../../../../actions/admin/applicationActions';
import { useDispatch } from 'react-redux';
import { Helmet } from "react-helmet";
import $ from "jquery";

const DeletedApplications = () => {
    const dispatch = useDispatch()
    const [tabs, setTabs] = useState(localStorage.getItem("app_tab")||"unmanaged")
    useEffect(() => {
        dispatch(get_application_agents())
        dispatch(get_vehicle_type())
        dispatch(get_assigned_dealer())
        dispatch(get_unit_from())
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
        if(localStorage.getItem("app_tab")){
            setTabs(localStorage.getItem("app_tab"))
        }else {
            localStorage.getItem("app_tab", "unmanaged")
        }
    }, [])


    const loadView = (param) => {
        const views = {
            'unmanaged': <UnManagedApplication tab={param} />,
            'managed': <ManagedApplication tab={param} />,
            'private_sale': <PrivateSaleApplication tab={param} />,
            'in_house': <InHouseApplication tab={param} />,
            'default': <UnManagedApplication tab={param} />,
        }
        return views[param] || views['default']
    }
    return (<>
        <Helmet>
            <title>Application List</title>
            <meta name="description" content="" />
        </Helmet>
        <div className="Dealer-Head">
            <h1>{"Deleted Applications"}</h1>
        </div>
        <nav>
            <div class="Admin-dealership nav nav-tabs " id="nav-tab" role="tablist">
            <button class={tabs === "unmanaged" ? "nav-link active" : "nav-link"} id="unmanaged-application-tab" data-bs-toggle="tab" data-bs-target="#unmanaged-application" type="button" role="tab" aria-controls="unmanaged-application" aria-selected="true" onClick={() => {
                    dispatch(remove_all_state_application())
                    setTabs('unmanaged');localStorage.setItem("app_tab", "unmanaged")
                }}>Unmanaged Dealers</button>
                <button class={tabs === "managed" ? "nav-link active" : "nav-link"} id="managed-application-tab" data-bs-toggle="tab" data-bs-target="#managed-application" type="button" role="tab" aria-controls="managed-application" aria-selected="false" onClick={() => { dispatch(remove_all_state_application()); setTabs('managed');localStorage.setItem("app_tab", "managed") }} >Managed Dealers</button>
                <button class={tabs === "private_sale" ? "nav-link active" : "nav-link"} id="private-sale-application-tab" data-bs-toggle="tab" data-bs-target="#private-sale-application" type="button" role="tab" aria-controls="private-sale-application" aria-selected="false" onClick={() => { dispatch(remove_all_state_application()); setTabs('private_sale');localStorage.setItem("app_tab", "private_sale") }} >Private Sales</button>
                <button class={tabs === "in_house" ? "nav-link active" : "nav-link"} id="in-house-application-tab" data-bs-toggle="tab" data-bs-target="#in-house-application" type="button" role="tab" aria-controls="in-house-application" aria-selected="false" onClick={() => { dispatch(remove_all_state_application()); setTabs('in_house');localStorage.setItem("app_tab", "in_house") }}>In-House</button>
            </div>
        </nav>

        <div class="tab-content" id="nav-tabContent">
            {loadView(tabs)}
        </div>
    </>)
}
export default DeletedApplications