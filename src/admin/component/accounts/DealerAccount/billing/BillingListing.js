import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import {
  ReactComponent as PlusSvg
} from "../../../../../assets/image/plus.svg";
import {
  ReactComponent as  VisaCardSvg
} from "../../../../../assets/image/visa.svg";
import AddBillingModal from "./ReactModal";
import DateFilter from "./DateFilter";
import { delete_card } from "../../../../../actions/admin/billingActions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Invoice from "../invoice";
import dateFormat from "dateformat";
const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 200 }}>
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

const BillingListing = (props) => {
  const dispatch = useDispatch()
  const {  streetAddress, postalCode, city, telephone, email, name,
     logo_path } = useSelector(({ adminReducer }) => {
      return {
        name: adminReducer.adminAccounts.pendingAccountReducer.name,
        streetAddress: adminReducer.adminAccounts.pendingAccountReducer.streetAddress,
        postalCode: adminReducer.adminAccounts.pendingAccountReducer.postalCode,
        city: adminReducer.adminAccounts.pendingAccountReducer.city,
        telephone: adminReducer.adminAccounts.pendingAccountReducer.telephone,
        email: adminReducer.adminAccounts.pendingAccountReducer.email,
        logo_path: adminReducer.adminAccounts.pendingAccountReducer.logo_path,
      }
    })
  var date = new Date();
  date.setDate(date.getDate() - 7);
  const today = moment();
  const {userId} = props
  let { url } = useRouteMatch();
  const [show, setShow] = useState(false);
  const [totalDays, setTotalDays] = useState(7);
  const [startDate, setStartDate] = useState(date)
  const [isDateFilter, setDateFilter] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [rangeDate, setRangeDate] = useState(moment.range(today.clone().subtract(7, "days"), today.clone()))

  const [noOfApplications, setNoOfApplications] = useState("");
  const [pageNumberLimit] = useState(5);
  const [editCard, setEditCard] = useState(false);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [page, setpage] = useState(1);
  const [pageLength, setPageLenght] = useState(20);
  const [AddBillingModalSow, setAddBillingModalSow] = useState(false);
  const [appOptions, setappOptions] = useState([
    { label: "Up To 5 Application", value: 5 },
    { label: "Up To 10 Application", value: 10 },
    { label: "Up To 15 Application", value: 15 },
    { label: "Up To 20 Application", value: 20 },
    { label: "No Limit", value: 1000000 },
    {label:"Pause Application", value:-1},
  ]);
  const handleAddBillingModalSowClose = () => setAddBillingModalSow(false);
  const handleAddBillingModalSowShow = () => setAddBillingModalSow(true);

  const checkAgent = (id) => {
    // props.single_check_agent(id);
  };
  useEffect(() => {
    if(props?.paymentApplication?.number_of_applications){
      setNoOfApplications({ label: `Up To ${props?.paymentApplication?.number_of_applications} Application`, value: props.paymentApplication?.number_of_applications })
    }
  }, [props.paymentApplication])
  const toggleAllAgents = () => {
    // props.toggle_all_check_agent(!props.checkedAllAgent);
  };
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    props.get_agents_pages(pageUrl);
    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + 1);
      setminPageNumberLimit(minPageNumberLimit + 1);
    }
    if ((page - 1) % pageNumberLimit === 0) {
      const min = minPageNumberLimit - 1 === -1 ? 0 : minPageNumberLimit - 1;
      const max = maxPageNumberLimit - 1 === 4 ? 5 : maxPageNumberLimit - 1;
      setmaxPageNumberLimit(max);
      setminPageNumberLimit(min);
    }
  };
  const handleLastbtn = () => {
    setpage((props.pages_urls || []).length);
    const data = {
      page: (props.pages_urls || []).length,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD")
    };
    props.get_invoices(data);
    let count = (props.pages_urls || []).length;
    while (count % 5 !== 0) {
      count++;
    }
    setmaxPageNumberLimit(count);
    setminPageNumberLimit(count - 5);
  };
  const handleNextbtn = () => {
    if (page !== (props.pages_urls || []).length) {
      setpage(page + 1);
      const data = {
        page: page + 1,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD")
      };
      props.get_invoices(data);
    }
    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    if (page !== 1) {
      setpage(page - 1);
      const data = {
        page: page - 1,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD")
      };
      props.get_invoices(data);
    }
    if ((page - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleFirstbtn = () => {
    setpage(1);
    const data = {
      page: 1,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD")
    };
    props.get_invoices(data);
    setmaxPageNumberLimit(5);
    setminPageNumberLimit(0);
  };
  let pageIncrementBtn = null;
  if ((props.pages_urls || []).length > maxPageNumberLimit) {
    pageIncrementBtn = <bitton onClick={handleNextbtn}> &hellip; </bitton>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <bitton onClick={handlePrevbtn}> &hellip; </bitton>;
  }
  const changePageLength = (e) => {
    setPageLenght(e.target.value);
    setpage(1);
    const data = {
      p_size: e.target.value,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD")
    };
    props.get_invoices(data);
  };
  useEffect(() => {
    props.get_card()
    props.get_invoices({
      page: 1, p_size: 20, start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD")
    })

  }, [])
  useEffect(() => {
    let f = appOptions.find(element => element.value == props.billingData?.biling?.number_of_applications);
    if (f) {
      setNoOfApplications(f)
    }
  }, [props.billingData])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnDone = () => {
    setDateFilter(true)
    props.get_invoices({
      page: page, p_size: pageLength, start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD")
    })
    handleClose()
  }

  return (
    <>
      <React.Fragment>
        <div className="dealer-billing-ListHead">
          <h1>Billing</h1>
          <p>Manage your billing and payment details.</p>
        </div>
        <div className="clearfix"></div>

        <div className="row">
          <div className="col-md-5">
            <div className="">
              <div className="dealer-billing-application">
                <div className="innerDealerBilling">
                  <div className="innerBillingHeader">
                    <h5>Applications</h5>
                    <p>
                      Select how many monthly applications you would like
                    </p>
                  </div>
                  <div className="innerBilling-container-application">
                  <div className="">
                      <Select
                        placeholder="Search Applications"
                        id="noOfApplications"
                        name="noOfApplications"
                        value={noOfApplications}
                        onChange={(e) => {
                          console.log(e, "noOfApplications");
                          setNoOfApplications(e);
                          if(props.billingData?.biling?.number_of_applications){
                            props.update_application_number({ number_of_applications: e.value, user_id: userId }, true, false)
                          }else {
                            props.add_application_number({ number_of_applications: e.value, user_id: userId }, ()=>{}, ()=>{})
                          }
                        }}
                        options={appOptions}
                        isSearchable
                        isClearable
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5 payment__method">
          <div className="">
              <div className="dealer-billing-payment">
                <div className="innerDealerBilling">
                  <div className="innerBillingHeader">
                    <h5>Payment method</h5>
                    <p>Change how you pay for monthly applications</p>
                  </div>
                  <div className="innerBilling-container-payment">
                    {props?.billingData?.biling.email ?
                      <div className="selected-payment-card-view">
                        <div className='selected-payment-card-view-left'>
                          <VisaCardSvg style={{ margin: '12px 0px 0px 5px' }} />
                        </div>
                        <div className='selected-payment-card-view-middle'>
                          <h1>Visa ending in {props.billingData?.biling?.number || ''}</h1>
                          <h2>Expiry {props.billingData?.biling?.exp_month || ''}/{props.billingData?.biling?.exp_year || ''}</h2>
                          <div className="email">
                            {/* <MsgSvg /> */}
                            <span>{props.billingData?.biling.email}</span>
                          </div>
                        </div>
                        {/* <div className="selected-payment-card-view-right">
                          <button className="edit_btn" onClick={() => {
                            setEditCard(true)
                            handleAddBillingModalSowShow()
                          }}>Edit</button>
                        </div> */}
                        <div className="selected-payment-card-view-right remove_btn">
                          <button onClick={() => {
                             dispatch(delete_card({
                              number_of_applications: (noOfApplications?.value||""),
                              is_deleted: true,
                              user_id:+userId
                            }, false, true,() =>{}, (msg)=>{alert(msg)}))
                          }}>Remove</button>
                        </div>
                      </div>
                      :
                      <div
                        className="add-payment-div"
                        onClick={handleAddBillingModalSowShow}
                      >
                        <PlusSvg />
                        <span> Add payment method</span>
                      </div>

                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Admin-AgentList-Container">
          <div className="AlContainer ">
            <p
              className="filtertxt"
              onClick={() => setShow(!show)}
            >
              <i class="bi bi-funnel"></i> Filter by{" "}
              <span style={{ color: "#fb5100" }}>date</span>
            </p>
          </div>

          <div className="Altable-Container">
            <div className="table-responsive">

              <table style={{ border: "1px solid #E4E7EB" }} id="" className="table table-striped table-hover mb-0" >
                <thead>
                  <tr className="tableDealerHeight" >
                    <th class="text-align: center;" >
                      <label className="ListCheckBox">
                        <input
                          type="checkbox"
                          checked={
                            props.checkedAllAgent !== undefined &&
                              props.checkedAllAgent !== null
                              ? props.checkedAllAgent
                              : false
                          }
                          onChange={toggleAllAgents}
                        />
                        <div className="ListMark"></div>
                      </label>
                    </th>
                    <th>
                      <span>Invoice</span>
                    </th>
                    <th>Billing Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>No of applications</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {(props.billingData?.invoices || []).map((item, index) => (
                    <tr key={index} style={{backgroundColor:(item.payment_status || "").toLowerCase() === "refund" ? "red" : ""}} >
                      <td>
                        <label className="ListCheckBox">
                          <input type="checkbox" value={item.id} />
                          <div className="ListMark"></div>
                        </label>
                      </td>
                      <td>
                        <span>
                          {item.id}
                        </span>
                      </td>
                      <td>
                        <span>
                         {item.payment_date ? dateFormat(item.payment_date, 'yyyy-mm-dd'):""}
                        </span>
                      </td>
                      <td>{item.payment_status || ""}</td>
                      <td>
                        {Number(item.payment_amount).toFixed(2) || ""}
                      </td>
                      <td>{item.number_of_applications || ""}</td>
                      <td style={{ width: "150px" }}>
                        <span>
                        <Invoice data={{invoiceData:[item],streetAddress:streetAddress, postalCode:postalCode, city:city, telephone:telephone, email:email, business_name:name, logo_path:logo_path }}/>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>



            </div>
          </div>
          {/* Footer  */}

          <div className="row m-0 mt-2 rounded" style={{ backgroundColor: "#fff" }}>
            <div className="col-md-4">
              {props?.total_count > 20 ?  <p className="inline">
                <label htmlFor="">Showing</label>
                <select
                  className="recordcounter"
                  name="pageLength"
                  onChange={changePageLength}
                  value={pageLength}
                >
                  <option value={20}> 20 </option>
                  <option value={50}> 50</option>
                  <option value={100}> 100</option>
                </select>
                <label htmlFor="">invoices out of {props?.total_count}</label>
              </p> : null}

            </div>

            <div className="datatable-custom-pagination col-md-8">
              {(props.pages_urls || []).length > 1 ? (
                <>
                  {" "}
                  <div className="firstPage" onClick={handleFirstbtn}>
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </div>
                  <div className="firstPage" onClick={handlePrevbtn}>
                    <span aria-hidden="true">{"<"}</span>
                    <span class="sr-only">Previous</span>
                  </div>
                  {pageDecrementBtn}
                  {(props.pages_urls || []).map((item, index) =>
                    item.page_no < maxPageNumberLimit + 1 &&
                      item.page_no > minPageNumberLimit ? (
                      <div
                        onClick={() =>
                          call_pages_data(item.url, item.page_no)
                        }
                        className={
                          Number(page) === Number(item.page_no)
                            ? "activePage"
                            : "firstPage"
                        }
                        disabled={Number(page) === Number(item.page_no)}
                        key={index}
                      >
                        {item.page_no}
                      </div>
                    ) : (
                      ""
                    )
                  )}
                  {pageIncrementBtn}
                  <div className="firstPage" onClick={handleNextbtn}>
                    <span aria-hidden="true">{">"}</span>
                    <span class="sr-only">Next</span>
                  </div>{" "}
                  <div className="firstPage" onClick={handleLastbtn}>
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>


          {/* Footer End */}

        </div>
        <AddBillingModal
         billingLoader={props.billingLoader}
         edit_card_for_billing={props.edit_card_for_billing}
         editCard={editCard}
         billing={props.billingData?.biling}
         noOfApplications={noOfApplications}
         add_card_for_billing={props.add_card_for_billing}
         AddBillingModalSow={AddBillingModalSow}
         handleAddBillingModalSowClose={handleAddBillingModalSowClose}
        />
        {show && <DateFilter handleClose={handleClose} show={show} handleOnDone={handleOnDone} />}
      </React.Fragment>
    </>
  );
};
export default BillingListing;
