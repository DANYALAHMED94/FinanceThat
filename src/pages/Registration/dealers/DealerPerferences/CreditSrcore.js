/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,} from "react";

const CreditScore = (props) => {
  const [creditScores, setCreditScore] = useState([{ title: '499 and below', name: '499 and below', value: false, scoreName: '$9', creditScoreId:1 }, { title: '500 - 549', name: '500 - 549', value: false, scoreName: '$49', creditScoreId:2 }, { title: '550 - 599', name: '550 - 599', value: false, scoreName: '$99', creditScoreId:3 }, { title: '600 - 649', name: '600 - 649', value: false, scoreName: '$129', creditScoreId:4}, { title: '650 - 699', name: '650 - 699', value: false, scoreName: '$149', creditScoreId:5}, { title: '700 - 749', name: '700 - 749', value: false, scoreName: '$189', creditScoreId:6}, { title: '750 and above', name: '750 and above', value: false, scoreName: '$229', creditScoreId:7}])

  useEffect(() => {
    if (props.creditscore && Object.keys(props.creditscore).length > 0) {
      setCreditScore(creditScores.slice().map(item => {
        if (Object.keys(props.creditscore).includes(item.creditScoreId.toString())) {
          return {
            ...item,
            value: props.creditscore[item.creditScoreId]
          }
        }
        return item
      }))
    }
  }, [props.creditscore])

  const onSelectLocation = (id, value) => {
      const creditScore = (creditScores || []).map(item => {
        if (+item.creditScoreId === +id) {
          return {
            ...item,
            value: !value
          }
        }
        return item
      })
      setCreditScore(creditScore)
      update_creditscore(creditScore)
    }

  const update_creditscore = (creditScore) => {
    let creditArry = {}
    creditScore.map(item => {
        creditArry = {
        ...creditArry,
        [item.creditScoreId]: item.value,

      }
    })
    props.changeMultiSelecPerfernec("creditscore",creditArry)
 }

  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div style={{border:"none"}} className="Dealer-dtable location reg_credit">
          <div className="col-12 pl-0">
            <div style={{marginTop:"58px"}} className="row lh-lg my-4 w-100 pl-3">
              <h5 style={{width:"100%"}}>Applicant Credit Score Preferences</h5>
              <p>Select the applicant’s range of credit scores you are interested in.
              </p>
            </div>
            {/* <hr></hr> */}
            <div className="row mb-4 mt-4">
                <h5 className="col-md-4 credit_labels">Credit Score</h5>
                <h5 className="col-lg-4 credit_labels">Cost per Application</h5>
                <h5 className="col-lg-4 credit_labels">Tier</h5>
            </div>
          </div>
          {/* 2 */}

          {(creditScores || []).map((item, index) => (
        
              <div className="row my-3 ml-2">
                <div className="col-lg-4">
                  <div className="row">

                    <div className="col-md-2 pl-0">
                      <div class="switch-holder">
                        <input
                          id={item.name}
                          type="checkbox"
                          name={item.name}
                          checked={item.value}
                          onChange={() => onSelectLocation(item.creditScoreId, item.value)}
                        />
                        <label for={item.name} class="switch">
                          <div></div>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8 ml-2">
                      <label class="label ml-2"> {item.title} </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-md-4 pl-5">
                      <label class="label"> {item.scoreName} </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <label class="label"> {item.creditScoreId} </label>
                    </div>
                  </div>
                </div>
              </div>
            
          ))}
 {props.showCreditError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        Select Atleast One Credit Score
                                      </div>
                                    ) : (
                                      ""
                                    )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CreditScore;
