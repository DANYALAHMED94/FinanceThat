/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_dealer_credit_score, add_dealer_credit_score } from '../../../actions/dealer/dealerShipActions'

const CreditScore = (props) => {
  const dispatch = useDispatch();
  const { user_id,dealer_id, dealer_credit_score  } = useSelector(({ dealerAdminReducer }) => {
    return {
      dealer_credit_score:dealerAdminReducer.dealerShipReducer.dealer_credit_score,
      user_id: dealerAdminReducer.dealerShipReducer.dealer_id,
      dealer_id: dealerAdminReducer.dealerShipReducer.get_user_profile.id,
    }
  })
  const [creditScores, setCreditScore] = useState([{ title: '499 and below', name: '499 and below', value: false, scoreName: '$9', creditScoreId:1 }, { title: '500 - 549', name: '500 - 549', value: false, scoreName: '$49', creditScoreId:2 }, { title: '550 - 599', name: '550 - 599', value: false, scoreName: '$99', creditScoreId:3 }, { title: '600 - 649', name: '600 - 649', value: false, scoreName: '$129', creditScoreId:4}, { title: '650 - 699', name: '650 - 699', value: false, scoreName: '$149', creditScoreId:5}, { title: '700 - 749', name: '700 - 749', value: false, scoreName: '$189', creditScoreId:6}, { title: '750 and above', name: '750 and above', value: false, scoreName: '$229', creditScoreId:7}])


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
      if(!value === true){
        add_creditScore(id)
      }else {
        delete_creditScore(id)
      }
  }

  useEffect(() => {
    if (dealer_credit_score && dealer_credit_score?.length > 0) {
      setCreditScore(creditScores.slice().map(item => {
        return {
          ...item,
           id:(dealer_credit_score || []).filter(ite=> +ite.creditscore === +item.creditScoreId)?.[0]?.id || "",
          value: (dealer_credit_score || []).filter(ite=> +ite.creditscore === +item.creditScoreId)?.length > 0 ? true :false,
        }
      }))
    }

  }, [dealer_credit_score])

  const add_creditScore = (id) => {
    const data  = {
      "dealer_id":user_id,
      "Dealer_CreditScore":{
          "creditscore": id,
          "dealer":dealer_id
      }
  }
  dispatch(add_dealer_credit_score(data))
    console.log(data, "LOCATIONSz")
  }

  const delete_creditScore = (id) => {
    const data  = {
      id:creditScores.filter(item=> +item.creditScoreId === +id)?.[0]?.id || "",
      "dealer_id":user_id,
      "Dealer_CreditScore":{
          "creditscore": id,
          "dealer":dealer_id
      }
  }
  dispatch(delete_dealer_credit_score(data))
    console.log(data, "LOCATIONSz")
  }

  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable location">
          <div className="col-12">
            <div style={{marginTop:"58px"}} className="row lh-lg my-4 w-100 pl-3">
              <h5 style={{width:"100%"}}>Applicant Credit Score Preferences</h5>
              <p>Select the applicant’s range of credit scores you are interested in.
              </p>
            </div>
            <hr></hr>
            <div className="d-flex mb-4 mt-4 headings_credit">
                <h5 className="col-md-4 credit_labels">Credit Score</h5>
                <h5 className="col-lg-4 credit_labels_sec">Cost per Application</h5>
                <h5 className="col-lg-2 credit_labels">Tier</h5>
            </div>
          </div>
          {/* 2 */}
          {(creditScores || []).map((item, index) => (

              <div className="row my-3 ml-4">
                <div className="col-lg-4">
                  <div className="row">

                    <div className="col-md-2">
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
                    <div className="col-lg-6 ml-2">
                      <label class="label"> {item.title} </label>
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

        </div>
      </div>
    </React.Fragment>
  );
};
export default CreditScore;
