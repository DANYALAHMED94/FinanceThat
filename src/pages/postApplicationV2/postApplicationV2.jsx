import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation, useParams } from "react-router";
import { history } from "../../_helpers";
import AddressStep from "./components/steps/AddressStep";
import BirthDayStep from "./components/steps/BirthDayStep";
import CongratulationStep from "./components/steps/CongratulationStep";
import { formStateInit } from "./components/constant";
import DriverLicense from "./components/steps/DriverLicense";
import DurationLivedStep from "./components/steps/DurationLivedStep";
import EmailDetails from "./components/steps/EmailDetails";
import EmploymentStatus from "./components/steps/EmploymentStatus";
import MonthlyBudget from "./components/steps/MonthlyBudget";
import MonthlyIncome from "./components/steps/MonthlyIncome";
import NotMeetingCriteria from "./components/steps/NotMeetingCriteria";
import PersonlDetail from "./components/steps/PersonalDetail";
import PhoneVerification from "./components/steps/PhoneVerification";
import PrivateSellerStep from "./components/steps/PrivateSellerStep";
import SubTypeOfVehical from "./components/steps/SubTypeOfVehicle";
import TradeInStep from "./components/steps/TradeInStep";
import TypeOfVehical from "./components/steps/TypeOfVehical";
import WorkPlaceStep from "./components/steps/WorkPlaceStep";
import SearchAddress from "./components/steps/SearchAddress";
import TostarMessages from "../../components/alertMessages/TostarMessages";
export default function PostApplicationV2() {
  // state
  const totalSteps = 14;
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [formState, setFormState] = useState(formStateInit);
  console.log(formState, "formStateInit")
  // query
  const routerState = useLocation()?.state
  const stock = routerState?.stock;
  console.log(useLocation(), "useParams")
  // path
  const path = useLocation().pathname;
  console.log(useLocation(), "query")
  // routes
  const routes = [
    {
      Component: TypeOfVehical,
      step: 1,
    },
    {
      Component: SubTypeOfVehical,
      step: 2,
    },
    {
      Component: MonthlyBudget,
      step: 3,
    },
    {
      Component: PrivateSellerStep,
      step: 4,
    },
    {
      Component: EmploymentStatus,
      step: 5,
    },
    {

      Component:
        formState.interested_vehicle_type === "Automotive"
          ? MonthlyIncome
          :formState.interested_vehicle_type === "Powersport"
            ? MonthlyIncome
          // : ["Unemployed", "Disability"].includes(formState.employement_status)
          //   ? NotMeetingCriteria
            : MonthlyIncome,
      step: 6,
    },
    {
      Component: WorkPlaceStep,
      step: 7,
    },
    {Component:SearchAddress,
      step:8},
    {
      Component: AddressStep,
      step: 9,
    },
    {
      Component: DurationLivedStep,
      step: 10,
    },
    {
      Component: BirthDayStep,
      step: 11,
    },
    {
      Component: PersonlDetail,
      step: 12,
    },
    {
      Component:EmailDetails,
      step: 13,
    },
    {
      Component: CongratulationStep,
      step: 14,
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
  // setting step when path changes
  useEffect(() => {
    console.log({ formState, url }, "SASAS");
    const pathArr = path.split("/");
      if (routerState && routerState !== undefined) {
        setFormState({ ...formState, vehicle_type: routerState?.category_name || "", stock: routerState?.stock || "", vehicle: [routerState?.vehicle || ""], user_id: routerState?.user_id || "" })
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
      <TostarMessages />
    </section>
  );
}
