import React, { useEffect, useState, memo } from "react";
import { Link } from 'react-router-dom'
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import BudgetDetailModel from '../vehicleBudgetModels/BudgetDetailModel'
import VehicleDownPaymentModel from '../vehicleBudgetModels/VehicleDownPaymentModel'
const VehicleBudget = () => {
    const [state, setState] = useState({
        itemtitle: "",
        vehicleName: '',
        monthlyPayment: '$350',
        downPayment: '$1,000',
        multi: false,
        multiValue: [],
        terms: '72',
        selectedTerms: { value: "72", label: "72 months" },
        credit: '3',
        selectedCredit: { value: '3', label: 'Fair (580-669 FICO® Score)' },
        options: [
            { value: "Color", label: "Yellow1" },
            { value: "Fruit", label: "Apple" },
            { value: "Tool", label: "Spanner" }
        ],
        creditOptions: [
            { value: '0', label: 'Excellent (800+ FICO® Score)' },
            // { value: '1', label: 'Very Good (740-799 FICO® Score)' },
            { value: '2', label: 'Good (670-739 FICO® Score)' },
            { value: '3', label: 'Fair (580-669 FICO® Score)' },
            { value: '4', label: 'Challenged (< 580 FICO® Score)' },
            { value: '5', label: 'No Credit (0-499 FICO® Score)' },
        ],
        termOptions: [
            { value: "36", label: "36 months" },
            { value: "48", label: "48 months" },
            { value: "60", label: "60 months" },
            { value: "72", label: "72 months" },
            { value: "84", label: "84 months" },
            { value: "96", label: "96 months" },
            { value: "108", label: "108 months" },
            { value: "120", label: "120 months" },
        ],
        estimatedAPR: { highAmount: 21.9, creditId: '3' },
        estimatedAPRValues: [{ highAmount: 4.99, creditId: "0" },
        { highAmount: 6.5, creditId: "1" },
        { highAmount: 9.99, creditId: "2" },
        { highAmount: 21.9, creditId: "3" },
        { highAmount: 29.9, creditId: "4" },
        { highAmount: 34.9, creditId: "5" },
        ],
        budget: 0,
        AprPer: 21.9,
        AprAmount: 0.0219,
        vehicleId: '',
        totalPrice: 14963
    })
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }
    const handleOnChangeSelect = (e, name, optionName) => {
        setState({
            ...state,
            [name]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : null : null,
            [optionName]: e
        })
    }
    const handleOnClick = (name, id) => {
        setState({
            ...state,
            vehicleName: name,
            vehicleId: id,
            subTypeVehicleName: '',
            subTypeVehicleId: ''
        })
    }
    const handleOnClickSubType = () => {
        setState({
            ...state,
            vehicleName: 'Powersport',
            vehicleId: 9,
            subTypeVehicleName: 'ATV/UTV',
            subTypeVehicleId: 3
        })
    }
    useEffect(() => {
        if (state.monthlyPayment) {
            const monthlyPayment = !state.monthlyPayment ? 0 : state.monthlyPayment.replace('$', '').split(',').join("");
            const downPayment = !state.downPayment ? 0 : state.downPayment.replace('$', '').split(',').join("");
            const budget = Number(monthlyPayment) * Number(state.terms) - Number(downPayment)
            const AprPer = state.estimatedAPR !== undefined && state.estimatedAPR !== null ? state.estimatedAPR.highAmount : 0
            var e = AprPer / 100 / 12;
            const totalLoanAmount = Number(monthlyPayment) > 0 && AprPer ? Number(monthlyPayment) * (Math.pow(1 + e, Number(state.terms)) - 1) / (e * Math.pow(1 + e, Number(state.terms))) : Number(monthlyPayment) * Number(state.terms);
            const totalPrice = Number(monthlyPayment) > 0 ? totalLoanAmount + Number(downPayment) : 0;
            setState({
                ...state,
                budget,
                AprPer,
                AprAmount: e,
                totalPrice
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.monthlyPayment])
    useEffect(() => {
        if (state.downPayment) {
            const monthlyPayment = !state.monthlyPayment ? 0 : state.monthlyPayment.replace('$', '').split(',').join("");
            const downPayment = !state.downPayment ? 0 : state.downPayment.replace('$', '').split(',').join("");
            const budget = Number(monthlyPayment) * Number(state.terms) - Number(downPayment)
            const AprPer = state.estimatedAPR !== undefined && state.estimatedAPR !== null ? state.estimatedAPR.highAmount : 0
            var e = AprPer / 100 / 12;
            const totalLoanAmount = Number(monthlyPayment) > 0 && AprPer ? Number(monthlyPayment) * (Math.pow(1 + e, Number(state.terms)) - 1) / (e * Math.pow(1 + e, Number(state.terms))) : Number(monthlyPayment) * Number(state.terms);
            const totalPrice = Number(monthlyPayment) > 0 ? totalLoanAmount + Number(downPayment) : 0;
            setState({
                ...state,
                budget,
                AprPer,
                AprAmount: e,
                totalPrice
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.downPayment])
    useEffect(() => {
        if (state.credit) {
            const credit = state.estimatedAPRValues.filter(item => Number(item.creditId) === Number(state.credit))[0]
            const monthlyPayment = !state.monthlyPayment ? 0 : state.monthlyPayment.replace('$', '').split(',').join("");
            const downPayment = !state.downPayment ? 0 : state.downPayment.replace('$', '').split(',').join("");
            const budget = Number(monthlyPayment) * Number(state.terms) - Number(downPayment)
            const AprPer = credit ? credit.highAmount : 0
            var e = AprPer / 100 / 12;
            const totalLoanAmount = Number(monthlyPayment) > 0 && AprPer ? Number(monthlyPayment) * (Math.pow(1 + e, Number(state.terms)) - 1) / (e * Math.pow(1 + e, Number(state.terms))) : Number(monthlyPayment) * Number(state.terms);
            const totalPrice = Number(monthlyPayment) > 0 ? totalLoanAmount + Number(downPayment) : 0;
            setState({
                ...state,
                estimatedAPR: credit,
                budget,
                AprPer,
                AprAmount: e,
                totalPrice
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.credit])
    useEffect(() => {
        if (state.terms) {
            const monthlyPayment = !state.monthlyPayment ? 0 : state.monthlyPayment.replace('$', '').split(',').join("");
            const downPayment = !state.downPayment ? 0 : state.downPayment.replace('$', '').split(',').join("");
            const budget = Number(monthlyPayment) * Number(state.terms) - Number(downPayment)
            const AprPer = state.estimatedAPR !== undefined && state.estimatedAPR !== null ? state.estimatedAPR.highAmount : 0
            var e = AprPer / 100 / 12;
            const totalLoanAmount = Number(monthlyPayment) > 0 && AprPer ? Number(monthlyPayment) * (Math.pow(1 + e, Number(state.terms)) - 1) / (e * Math.pow(1 + e, Number(state.terms))) : Number(monthlyPayment) * Number(state.terms);
            const totalPrice = Number(monthlyPayment) > 0 ? totalLoanAmount + Number(downPayment) : 0;
            setState({
                ...state,
                budget,
                AprPer,
                AprAmount: e,
                totalPrice
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.terms])

    const MAX_VAL = 2000;
    const maxMonthly = (inputObj) => {
        const { value } = inputObj;
        if (value <= MAX_VAL) return true;
        return false;
    };
    const MAX_VAL_DOWN = 25000;
    const maxDown = (inputObj) => {
        const { value } = inputObj;
        if (value <= MAX_VAL_DOWN) return true;
        return false;
    };


    return (
      <>
        <section className="vehicle-budget">
          <div className="vehicle-budget-outer">
            <h2 className="text-center">Vehicle budget calculator</h2>
            <div className="vehicle-budget-main clearfix">
              <div className="vehicle-budget-left-col">
                <div className="hm-select-vehicle-type-main clearfix">
                  <div
                    className="boxed-grid-col "
                    onClick={() => handleOnClick("Automotive", 7)}
                  >
                    <div
                      className={
                        state.vehicleName === "Automotive"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img
                          src="/assets/image/hp-automotive-icon.svg"
                          alt=""
                        />
                      </span>
                      <p> Automotive </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClick("Motorcycle", 2)}
                  >
                    <div
                      className={
                        state.vehicleName === "Motorcycle"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img
                          src="/assets/image/hp-motorcycle-icon.svg"
                          alt=""
                        />
                      </span>
                      <p> Motorcycle </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClickSubType("Powersport", 9)}
                  >
                    {/* <div className="boxed-grid-col" onClick={() => handleOnClick('Powersport', 9)}> */}
                    <div
                      className={
                        state.vehicleName === "Powersport"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img
                          src="/assets/image/hp-powersport-icon.svg"
                          alt=""
                        />
                      </span>
                      {/* <p> Powersport </p> */}
                      <p> ATV </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClick("Boat", 3)}
                  >
                    <div
                      className={
                        state.vehicleName === "Boat"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img src="/assets/image/hp-boat-icon.svg" alt="" />
                      </span>
                      <p> Boat </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClick("RV", 6)}
                  >
                    <div
                      className={
                        state.vehicleName === "RV"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img src="/assets/image/hp-rv-icon.svg" alt="" />
                      </span>
                      <p> RV </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClick("Trailer", 1)}
                  >
                    <div
                      className={
                        state.vehicleName === "Trailer"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img src="/assets/image/hp-trailer-icon.svg" alt="" />
                      </span>
                      <p> Trailer </p>
                    </div>
                  </div>
                  <div
                    className="boxed-grid-col"
                    onClick={() => handleOnClick("Small Equipment", 8)}
                  >
                    <div
                      className={
                        state.vehicleName === "Small Equipment"
                          ? "select-vehicle-box active"
                          : "select-vehicle-box"
                      }
                    >
                      <span className="icon-holder">
                        <img
                          src="/assets/image/hp-small-equipment-icon.svg"
                          alt=""
                        />
                      </span>
                      <p> Small Equipment </p>
                    </div>
                  </div>
                </div>
                <div className="payment-breakdown lhs">
                  <div className="hp-three-col-grid clearfix">
                    <div className="breakdown-col">
                      <label> Monthly Payment </label>
                      <NumberFormat
                        className="form-control"
                        value={state.monthlyPayment}
                        prefix={"$"}
                        onChange={handleOnChange}
                        thousandSeparator={true}
                        id="monthlyPayment"
                        name="monthlyPayment"
                        allowNegative={false}
                        isAllowed={maxMonthly}
                        required
                      />
                    </div>
                    <div className="breakdown-col downpayment">
                      <label> Down Payment </label>
                      <NumberFormat
                        className="form-control"
                        value={state.downPayment}
                        onChange={handleOnChange}
                        prefix={"$"}
                        thousandSeparator={true}
                        id="downPayment"
                        name="downPayment"
                        allowNegative={false}
                        isAllowed={maxDown}
                        required
                      />
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#VehicleDownPaymentModel"
                        className="active"
                      >
                        <img src="/assets/image/q-mark.svg" />
                      </button>
                    </div>
                    <div className="breakdown-col">
                      <label> Term length </label>
                      <Select
                        placeholder="72 Months"
                        isSearchable={false}
                        className="hm-react-select-main"
                        classNamePrefix="hm-react-select"
                        closeMenuOnSelect
                        options={state.termOptions}
                        required
                        name="selectedTerms"
                        value={state.selectedTerms}
                        onChange={(e) =>
                          handleOnChangeSelect(e, "terms", "selectedTerms")
                        }
                      />
                    </div>
                  </div>
                  <div className="breakdown-single-col">
                    <label> Credit Range </label>
                    <Select
                      placeholder="Challenged (<580 FIC0 Score)"
                      id="selectedCredit"
                      required
                      className="hm-react-select-main"
                      classNamePrefix="hm-react-select"
                      isSearchable={false}
                      closeMenuOnSelect
                      options={state.creditOptions}
                      name="selectedCredit"
                      value={state.selectedCredit}
                      onChange={(e) =>
                        handleOnChangeSelect(e, "credit", "selectedCredit")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="vehicle-budget-right-col clearfix">
                <div className="payment-breakdown rhs">
                  <div className="hp-three-col-grid clearfix">
                    <div className="breakdown-col">
                      <label> Monthly Payment </label>
                      <NumberFormat
                        className="form-control"
                        value={state.monthlyPayment}
                        prefix={"$"}
                        onChange={handleOnChange}
                        thousandSeparator={true}
                        id="monthlyPayment1"
                        name="monthlyPayment"
                        allowNegative={false}
                        isAllowed={maxMonthly}
                        required
                      />
                    </div>
                    <div className="breakdown-col downpayment">
                      <label> Down Payment </label>
                      <NumberFormat
                        className="form-control"
                        value={state.downPayment}
                        onChange={handleOnChange}
                        prefix={"$"}
                        thousandSeparator={true}
                        id="downPayment1"
                        name="downPayment"
                        allowNegative={false}
                        isAllowed={maxDown}
                        required
                      />
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#VehicleDownPaymentModel"
                        className="active"
                      >
                        {" "}
                        <img src="/assets/image/info-icon.svg" />
                      </button>
                    </div>
                    <div className="breakdown-col">
                      <label> Term length </label>
                      <Select
                        placeholder="72 Months"
                        isSearchable={false}
                        className="hm-react-select-main"
                        classNamePrefix="hm-react-select"
                        closeMenuOnSelect
                        options={state.termOptions}
                        required
                        name="selectedTerms"
                        value={state.selectedTerms}
                        onChange={(e) =>
                          handleOnChangeSelect(e, "terms", "selectedTerms")
                        }
                      />
                    </div>
                  </div>
                  <div className="breakdown-single-col">
                    <label> Credit Range </label>
                    <Select
                      placeholder="Challenged (<580 FIC0 Score)"
                      id="selectedCredit"
                      required
                      className="hm-react-select-main"
                      classNamePrefix="hm-react-select"
                      isSearchable={false}
                      closeMenuOnSelect
                      options={state.creditOptions}
                      name="selectedCredit"
                      value={state.selectedCredit}
                      onChange={(e) =>
                        handleOnChangeSelect(e, "credit", "selectedCredit")
                      }
                    />
                  </div>
                </div>
                <div className="budget-content">
                  <div className="budget-content-inner">
                    <div className="budget-content-c">
                      <p>
                        Your estimated budget is{" "}
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#BudgetDetailModel"
                          className="active"
                        >
                          {" "}
                          <img
                            src="/assets/image/info-icon.svg"
                            alt="info-icon"
                          />
                        </button>{" "}
                      </p>
                      <span className="budget-amount">
                        $
                        {state.totalPrice !== null && state.totalPrice !== ""
                          ? Math.round(state.totalPrice).toLocaleString("en-US")
                          : (0).toLocaleString("en-US")}
                      </span>
                      <Link
                        to={{
                          pathname: "/Ad-post/list",
                          query: {
                            location: "",
                            color: "",
                            fromRange:
                              Number(state.totalPrice) === 0
                                ? ""
                                : Math.round(state.totalPrice).toLocaleString(
                                    "en-US"
                                  ),
                            category: state.vehicleId,
                            categoryFilterName: state.vehicleName,
                            subTypeVehicleName: state.subTypeVehicleName,
                            subTypeVehicleId: state.subTypeVehicleId,
                            latitude: "",
                            longitude: "",
                          },
                        }}
                        className="btn btn-primary"
                      >
                        {" "}
                        See{" "}
                        {state.subTypeVehicleName
                          ? "ATV"
                          : state.vehicleName
                          ? state.vehicleName + "s"
                          : "Vehicle"}{" "}
                        in your Budget{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BudgetDetailModel
            totalBudget={state.totalPrice}
            terms={state.terms}
            estimatedAPR={state.estimatedAPR}
          />
          <VehicleDownPaymentModel />
        </section>
      </>
    );
}

export default memo(VehicleBudget);
