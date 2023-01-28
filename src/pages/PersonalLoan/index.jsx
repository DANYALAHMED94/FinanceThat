import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { history } from "../../_helpers";
import AddressStep from "./components/steps/AddressStep";
import BirthDayStep from "./components/steps/BirthDayStep";
import CongratulationStep from "./components/steps/CongratulationStep";
import { formStateInit } from "./components/constant";
import EmailDetails from "./components/steps/EmailDetails";
import EmploymentStatus from "./components/steps/EmploymentStatus";
import MonthlyIncome from "./components/steps/MonthlyIncome";
import PersonlDetail from "./components/steps/PersonalDetail";
import PhoneVerification from "./components/steps/PhoneVerification";
import LoanAmount from "./components/steps/LoanAmount";
import TypeOfLoan from "./components/steps/TypeOfLoan";
import WorkPlaceStep from "./components/steps/WorkPlaceStep";
import Bankruptcy from "./components/steps/Bankruptcy"
import ExistingLoan from "./components/steps/ExistingLoan"
import SubLoanType from "./components/steps/SubLoanType";
import SearchAddress from "./components/steps/SearchAddress";
import '../../assets/css/personalLoan.css'

export default function PersonalLoan() {
  // state
  const totalSteps = 15;
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
      Component: TypeOfLoan,
      step: 1,
    },
    {
      Component: SubLoanType,
      step: 2,
    },
    {
      Component: LoanAmount,
      step: 3,
    },
    {
      Component: EmploymentStatus,
      step: 4,
    },
    {
      Component:MonthlyIncome,
      step: 5,
    },
    {
      Component:Bankruptcy,
      step: 6,
    },
    {
      Component:ExistingLoan,
      step: 7,
    },
    {
      Component: WorkPlaceStep,
      step: 8,
    },
    {
      Component: SearchAddress,
      step: 9,
    },
    {
      Component: AddressStep,
      step: 10,
    },
    {
      Component: PersonlDetail,
      step: 11,
    },
    {
      Component: BirthDayStep,
      step: 12,
    },
    {

      Component: EmailDetails,
      step: 13,
    },
    {
      Component: PhoneVerification,
      step: 14,
    },
    {
      Component: CongratulationStep,
      step: 15,
    },
  ];

  // redirecting on mount
  useEffect(() => {
    const pathArr = path.split("/");
    const mainUrl = pathArr.length > 1 ? pathArr[1] : "";
    if (!url) {
      setUrl(mainUrl);
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
    console.log(pathArr, "pathArr");
    if (routerState && routerState !== undefined) {
      setFormState({ ...formState, vehicle_type: routerState?.category_name || "", stock: routerState?.stock || "", vehicle: [routerState?.vehicle || ""], user_id: routerState?.user_id || "" })
    }
    console.log(`${routerState}`,"RouteState")
    if (pathArr.length > 2) {

      console.log("In the path")
      console.log(pathArr[1], pathArr[2] , "Path in the ")
      console.log(step)
      if (formState.type_of_loan == "Veterinary Care" && step == 1 && pathArr[2] == 2){
        setStep(2)
        history.push(
          `/${url}/3`
        );
      }
      else if (formState.type_of_loan == "Veterinary Care" && step == 3 && pathArr[2] == 2){
        setStep(1)
        history.push(
          `/${url}/1`
        );
      }
      else{
        const nextStep = pathArr[2];
        const step = routerState?.step || nextStep
        setStep(step);
      }
    }

    // window.scrollTo({
    //   top: 100,
    //   behavior: "smooth",
    // });
    return () => { };
  }, [path]);

  // on form state change
  const onChange = (e) => {
    console.log(e)
    if (formState.type_of_loan === "Veterinary Care" && step === 3){
        setStep(2)
        history.push(
          `/${url}/1`
        );
      }
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // on Continue
  const onContinue = (paramStep) => {
    console.log("onContinue", `/${url}/${step + 1}`, url);
    console.log({ paramStep });
    if (paramStep) {
      history.push(
        `/${url}/${paramStep}`
      );
      return;
    }
    history.push(
      `/${url}/${Number(step) + 1}`
    );
  };

  // main return
  return (
    <section className="postAppQuick-personalLoan" style={{padding:"0", backgroundColor:'#ffff'}}>
      <div className="formDiv" style={{padding:"0"}}>
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
    </section>
  );
}
