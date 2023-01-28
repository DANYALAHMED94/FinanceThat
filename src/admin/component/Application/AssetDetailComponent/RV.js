import React from 'react'
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask";
const renderScrollbarCondition = (props) => {
    return (
      <div style={{ height: 100 }}>
        <Scrollbars>{props.children}</Scrollbars>
      </div>
    );
  };
  const renderScrollbarMonthlyBudget = (props) => {
    return (
      <div style={{ height: 180 }}>
        <Scrollbars>{props.children}</Scrollbars>
      </div>
    );
  };
  const renderOption = (props) => {
    return (
      <Option {...props}>
        <div>{props.data.label}</div>
      </Option>
    );
  };
  const { Option } = components;

const RV = (props) => {

    return (
        <>
            <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Stock Number (Optional)</label>
                            <NumberFormat
                              required
                              className="form-control"
                              onChange={(e) =>
                                props.handleOnChangeAssets(e, props.index)
                              }
                              value={props.item.stockNumber}
                              name="stockNumber"
                              onBlur={() =>
                                props.handleOnBlurStock(
                                  props.item.stockNumber,
                                  props.index
                                )
                              }
                            />
                          </div>

                          <div className="form-field-col">
                            <label>Trade In</label>
                            <Select
                              placeholder="Yes"
                              id="selectedIn"
                              name="selectedTradeIn"
                              value={props.item.selectedTradeIn}
                              onChange={(e) =>
                                props.changeSelectAssets(
                                  e,
                                  "tradeIn",
                                  "selectedTradeIn",
                                  props.index
                                )
                              }
                              options={props.tradeIns}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbarCondition,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                        </div>
                        
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Year </label>
                            <MaskedInput
                              mask={[/[0-9]/i, /[0-9]/, /[0-9]/i, /[0-9]/]}
                              className="form-control"
                              guide={false}
                              placeholder="Year"
                              id="year"
                              name="year"
                              value={props.item.year}
                              onChange={(e) =>
                                props.handleOnChangeAssets(e, props.index)
                              }
                            />
                          </div>
                          <div className="form-field-col">
                            <label> Make </label>
                            <input
                              type="text"
                              className="form-control"
                              name="make"
                              placeholder="Make"
                              value={props.item.make}
                              onChange={(e) =>
                                props.handleOnChangeAssets(e, props.index)
                              }
                            />
                          </div>
                        </div>

        
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Model </label>
                            <input
                              type="text"
                              className="form-control"
                              name="model"
                              placeholder="Model"
                              value={props.item.model}
                              onChange={(e) =>
                                props.handleOnChangeAssets(e, props.index)
                              }
                            />
                          </div>
                          <div className="form-field-col">
                              <label> KM </label>
                              <NumberFormat
                                className="form-control"
                                value={props.item.kilometer}
                                decimalScale={2}
                                onChange={(e) =>
                                  props.handleOnChangeAssets(e, props.index)
                                }
                                thousandSeparator={true}
                                id="kilometer"
                                name="kilometer"
                                allowNegative={false}
                              />
                            </div>
                        </div>

                        <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                              <label> Length/Size </label>
                              <NumberFormat
                                className="form-control"
                                value={props.item.length}
                                decimalScale={2}
                                onChange={(e) =>
                                  props.handleOnChangeAssets(e, props.index)
                                }
                                thousandSeparator={true}
                                id="length"
                                name="length"
                                allowNegative={false}
                              />
                            </div>
                          <div className="form-field-col">
                          <label>VIN or Serial#</label>
                              <input
                                type="text"
                                className="form-control"
                                name="vin"
                                placeholder="VIN or Serial#"
                                value={props.item.vin}
                                onChange={(e) =>
                                  props.handleOnChangeAssets(e, props.index)
                                }
                                maxLength="17"
                              />
                          </div>
                        </div>


                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Price </label>
                            <NumberFormat
                              className="form-control"
                              value={props.item.price}
                              decimalScale={2}
                              onChange={(e) =>
                                props.handleOnChangeAssets(e, props.index)
                              }
                              thousandSeparator={true}
                              prefix={"$"}
                              id="price"
                              name="price"
                              allowNegative={false}
                            />
                          </div>
                          <div className="form-field-col">
                            <label> Condition </label>
                            <Select
                              id="selectedCondition"
                              name="selectedCondition"
                              value={props.item.selectedCondition}
                              onChange={(e) =>
                                props.changeSelectAssets(
                                  e,
                                  "condition",
                                  "selectedCondition",
                                  props.index
                                )
                              }
                              options={props.conditions}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbarCondition,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                        </div>

        </>
    )
}
export default RV