/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation, useParams } from "react-router";
import { history } from "../../_helpers";
import AddressStep from "./components/steps/AddressStep";
import BirthDayStep from "./components/steps/BirthDayStep";
import CongratulationStep from "./components/steps/CongratulationStep";
import { formStateInit } from "./components/constant";
import DriverLicense from "./components/steps/DriverLicense";
import EmailDetails from "./components/steps/EmailDetails";
import EmploymentStatus from "./components/steps/EmploymentStatus";
import MonthlyBudget from "./components/steps/MonthlyBudget";
import MonthlyIncome from "./components/steps/MonthlyIncome";
import NotMeetingCriteria from "./components/steps/NotMeetingCriteria";
import PersonlDetail from "./components/steps/PersonalDetail";
import PhoneVerification from "./components/steps/PhoneVerification";
import PrivateSellerStep from "./components/steps/PrivateSellerStep";
import TradeInStep from "./components/steps/TradeInStep";
import WorkPlaceStep from "./components/steps/WorkPlaceStep";
import SelectVehicle from "./components/steps/SelectVehicle";
import SearchAddress from "./components/steps/SearchAddress";
import loadjs from "loadjs";
import TostarMessages from "../../components/alertMessages/TostarMessages";
import { toastr } from 'react-redux-toastr'

export default function PostApplicationV2() {
  // state
  const totalSteps = 12;
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [formState, setFormState] = useState(formStateInit);
  console.log(formState, "formStateInit")
  // query
  const routerState = useLocation()?.state
  console.log(useLocation(), "useParams")
  // path
  const path = useLocation().pathname;
  console.log(useLocation(), "query")
  // routes
  const routes = [
    {
      Component: SelectVehicle,
      step: 1,
    },
    {
      Component: MonthlyBudget,
      step: 2,
    },
    {
      Component: EmploymentStatus,
      step: 3,
    },
    {

      Component:
        formState.interested_vehicle_type === "Automotive"
          ? MonthlyIncome
          :formState.interested_vehicle_type === "Powersport"
            ? MonthlyIncome
          : ["Unemployed", "Disability"].includes(formState.employement_status)
            ? NotMeetingCriteria
            : MonthlyIncome,
      step: 4,
    },
    {
      Component: WorkPlaceStep,
      step: 5,
    },
    {Component:SearchAddress,
    step:6},
    {
      Component: AddressStep,
      step: 7,
    },
    {
      Component: BirthDayStep,
      step: 8,
    },
    {
      Component: PersonlDetail,
      step: 9,
    },
    {
      Component:EmailDetails,
      step: 10,
    },
    {
      Component: PhoneVerification,
      step: 11,
    },
    {
      Component: CongratulationStep,
      step: 12,
    },
  ];

  // redirecting on mount
  useEffect(() => {
      const pathArr = path.split("/");
      const mainUrl = pathArr.length > 1 ? pathArr[1] : "";
      if (!url) {
        setUrl(mainUrl);
        // pathname: stock ? `/${mainUrl}/${routerState?.step || 1}?stock=${stock}` : `/${mainUrl}/${routerState?.step || 1}`,
        history.push({
          pathname: `/${mainUrl}/${routerState?.step || 1}`,
          state: routerState
        });
      }

    return () => { };
  }, []);

  const removejscssfile = (filename, filetype) => {
    var targetelement =
      filetype === "js" ? "script" : filetype === "css" ? "link" : "none"; //determine element type to create nodelist from
    var targetattr =
      filetype === "js" ? "src" : filetype === "css" ? "href" : "none"; //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement);
    for (var i = allsuspects.length; i >= 0; i--) {
      //search backwards within nodelist for matching elements to remove
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute(targetattr) != null &&
        allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
      )
        allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
    }
  };
  // setting step when path changes
  useEffect(() => {
    console.log({ formState, url }, "SASAS");
    const pathArr = path.split("/");
    console.log(pathArr, "pathArr");
    if (routerState && routerState !== undefined) {
      setFormState({ ...formState, interested_vehicle_type: routerState?.category_name || "", stock: routerState?.stock || "", vehicle: [routerState?.vehicle || ""], user_id: routerState?.user_id || "" })
    }
    if (pathArr.length > 2) {
      const nextStep = pathArr[2];
      const step = routerState?.step || nextStep
      setStep(step);
    }
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
    return () => { };
  }, [path]);

  // on form state change
  const onChange = (e) => {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // on Continue
  const onContinue = (paramStep) => {
    console.log("onContinue", `/${url}/${step + 1}`, url);
    console.log({ paramStep });
    if (paramStep) {
      // stock ? `/${url}/${paramStep}?stock=${stock}` : `/${url}/${paramStep}`

      history.push(
        `/${url}/${paramStep}`
      );
      return;
    }
    // stock
    //     ? `/${url}/${Number(step + 1)}?stock=${stock}`
    //     : `/${url}/${Number(step) + 1}`
    history.push(
      `/${url}/${Number(step) + 1}`
    );
  };
  // main return
  return (
    <section className="postAppQuick">
      <div className="formDiv">
        <div className="innerDiv">
          <div className="progressBar">
            <div
              className="filled"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div>
            <Switch>
              {routes.map(({ Component, step }) => {
                return (
                  <Route
                    path={`/${url}/${step}`}
                    render={(props) => (
                      <Component
                        {...props}
                        formState={formState}
                        setFormState={setFormState}
                        onChange={onChange}
                        onContinue={onContinue}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
      <TostarMessages/>
    </section>
  );
}
