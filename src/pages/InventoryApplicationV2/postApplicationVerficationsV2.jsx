import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { history } from "../../_helpers";
import IncomeVerification from "./components/verificationSteps/IncomeVerification";
import submitSuccess from "./components/verificationSteps/submitSuccess";
import VerifyIdentity from "./components/verificationSteps/verifyIdentity";

export default function PostApplicationVerificationV2(props) {
  // state
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const applicationId = props.match.params.id;

  // post reducer state
  const pushState = useLocation().state;

  console.log({ pushState });

  // path
  const path = useLocation().pathname;

  // routes
  const routes = [
    {
      Component: VerifyIdentity,
      step: 1,
    },
    {
      Component: IncomeVerification,
      step: 2,
    },
    {
      Component: submitSuccess,
      step: 3,
    },
  ];

  // redirecting on mount
  useEffect(() => {
    const pathArr = path.split("/");
    const mainUrl = pathArr.length > 2 ? `${pathArr[1]}/${pathArr[2]}` : "";
    if (!url) {
      setUrl(mainUrl);
      history.push(`/${mainUrl}/${pathArr?.[3] || 1}`, pushState);
    }
    if (!pushState) {
      history.push("/applynow/1");
    }

    return () => {};
  }, []);
  // setting step when path changes
  useEffect(() => {
    console.log({ url });
    const pathArr = path.split("/");
    if (pathArr.length > 3) {
      const nextStep = pathArr[3];
      setStep(nextStep);
    }
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
    return () => {};
  }, [path]);

  // on Continue
  const onContinue = (paramStep) => {
    console.log("onContinue", `/${url}/${step + 1}`, url);
    console.log({ paramStep });
    if (paramStep) {
      history.push(`/${url}/${paramStep}`, pushState);
      return;
    }
    history.push(`/${url}/${+step + 1}`, pushState);
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
                        onContinue={onContinue}
                        applicationId={applicationId}
                        reducerState={pushState}
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
