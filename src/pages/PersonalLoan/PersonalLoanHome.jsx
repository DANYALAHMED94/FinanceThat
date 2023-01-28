import React ,{useEffect} from 'react'
import { scroller } from "react-scroll";
import "../PersonalLoan/index"
import Footer from '../../hoc/layout/footer/Footer'
import '../../assets/css/theme-alt.css'
import PersonalLoan from './index'
import { useLocation } from "react-router";
import ReactGA from 'react-ga';

const PersonalLoanHome = () => {
    const path = useLocation().pathname;
    useEffect(() => {
        if(path != "/apply/1"){
          scroller.scrollTo("section__container", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
          });
        }
      },[path]);

      useEffect(() => {
        console.log(window.location.pathname + window.location.search, "window.location.pathname + window.location.search")
        ReactGA.send(window.location.pathname + window.location.search);
      }, []);

    const onClickGetStarted = () => {
        scroller.scrollTo("section__container", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
          });
    }
    useEffect(()=> {
        scroller.scrollTo("section__container", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
          });
    },[])




  return (
    <>
                <section className="ft__heroBannerWrapper">
                <div className="row">
                  <div className="col-md-6 order-2 order-md-1">
                    <div className="ft__bannerDescriptionWrapper">
                    <img src='/public/assets/p-img/icon-emergency-expenses.svg' alt=''/>
                        <h1 style={{fontFamily:"BasisGrotesquePro-Black,sans-serif",color: "#3F2355"}}>Personal loans<br/>up to $20,000</h1>
                        <h4 style={{fontFamily:"BasisGrotesquePro-Medium", fontSize:"30px"}}>We offer personal loans that range from $500 up to $20,000.</h4>
                        <p style={{fontFamily: "basis_grotesque_proregular"}}>We offer personalized products and affordable payment plans. We work with our customers to
                            find a plan that best suits their needs and budget with terms up to 84 months</p>
                            <button className="primaryButton continueBtn" style={{fontfamily: "basis_grotesque_probold", height:"80px",maxWidth:"300px",padding:"19px 50px 19px 25px", textAlign: "center",fontSize:"22px"}} onClick={onClickGetStarted}>
    <span></span> <span>  Get Started</span>
    <img style={{position:"absolute",marginTop:"3px",marginLeft:"44px",width:"28px"}} src="/assets/p-img/icon-arrow-right.svg" alt=""/>
  </button>
                    </div>
                </div>
                <div className="col-md-6 order-1 order-md-2">
                   <div className="ft__infoBannerInfographWrap">
                   <img src='/assets/p-img/hero-banner-image.png' alt=''/>
                    </div>
                </div>
            </div>

        </section>
        <section className='personal__loanFormWrapper'>
            <div className="section__container">
                <div className="section__header">
                    <h2 style={{color:"#3F2355",fontFamily:"BasisGrotesquePro-Black",textAlign:"center"}}>Start your personal loan application here</h2>
                </div>
                <div className="personal__loanFormWrap">
                    <PersonalLoan />
                </div>
            </div>
            <div className="section__bottomShapeWrapper">
            <img src='/assets/p-img/Vector 1329.png' alt=''/>
            </div>
        </section>
        <div class="module__getApprovedTodayWrap" id="formPage" >


            {/* <img src="../assets/image/applyImgs/get-approved-today-img.jpg" alt="" class="content__image" /> */}
          </div>

        <section className="ft__introSectionWrapper">

            <div className="section__header">
                <h2 style={{fontFamily:"BasisGrotesquePro-Black"}}>Benefits of a Personal Loan</h2>
            </div>
            <div className="row">

                <div className="col-md-6 ft__introMockupGrid">
                    <div className="ft__introMockupWrap">
                        <img src="/assets/p-img/intro-image.png" alt=""/>
                    </div>
                </div>
                <div className="col-md-6 ft__introDescGrid">

                    <div className="ft__introDescWrap">
                        <ul>
                            <li>
                                <h3 style={{fontFamily:"BasisGrotesquePro-Black"}}>Fast access to money</h3>
                                <p style={{fontFamily: "basis_grotesque_proregular"}}>With Interac® e-Transfer, get your money in as little as 2 hours after getting
                                    approved.</p>
                            </li>
                            <li>
                                <h3 style={{fontFamily:"BasisGrotesquePro-Black"}}>Flexible loan options</h3>
                                <p style={{fontFamily:"basis_grotesque_proregular"}}>We offer personalized rates and payment terms to help you find a solution that fits
                                    your budget. If you’re able, you can pay off your loan at any time with no penalty
                                    and save the interest. Plus, you can get a 2% rate reduction with a co-applicant.
                                </p>
                            </li>
                            <li>
                                <h3 style={{fontFamily:"BasisGrotesquePro-Black"}}>Apply without affecting your credit score</h3>
                                <p style={{fontFamily:"basis_grotesque_proregular"}}>Apply in minutes to find out how much you could qualify for. There is no commitment
                                    and it won’t affect your credit score.</p>
                            </li>
                            <li>
                                <h3 style={{fontFamily:"BasisGrotesquePro-Black"}}>Rebuild your credit</h3>
                                <p style={{fontFamily:"basis_grotesque_proregular"}}>With every on-time payment, you are one step closer to rebuilding your credit and
                                    graduating to bank rates.</p>
                            </li>
                            <li>
                                <h3 style={{fontFamily:"BasisGrotesquePro-Black"}}>No credit history needed</h3>
                                <p style={{fontFamily:"basis_grotesque_proregular"}}>If you’re a student or new to Canada, we can help get you approved even with no
                                    credit history.</p>
                            </li>
                        </ul>
                        <button className="primaryButton continueBtn" style={{fontfamily: "basis_grotesque_probold", height:"80px",maxWidth:"300px",padding:"19px 50px 19px 25px", textAlign: "center",fontSize:"22px"}} onClick={onClickGetStarted}>
    <span></span> <span>  Get Started</span>
    <img style={{position:"absolute",marginTop:"3px",marginLeft:"44px",width:"28px"}} src="/assets/p-img/icon-arrow-right.svg" alt=""/>
  </button>
                    </div>
                </div>
            </div>
        </section>

        <section className="ft__loanFeaturesWrapper">
            <div className="container">
                <div className="ft__sectionHeader">
                    <h2 style={{fontFamily:"BasisGrotesquePro-Black"}}>What can you use a Personal loan for?</h2>
                </div>
                <div className="ft__loanFeaturesListWrapper">
                    <div className="dots__imageTopWrap">
                        <img src="/assets/p-img/dots-orange.svg" alt=""/>
                    </div>
                    <div className="ft__loanFeaturesListInner">
                        <div className="row">
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back" style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-debt-consolidation.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black" ,color:"#3F2A56"}}>Debt<br/>Consolidation</h3>
                                </div>
                            </div>
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back"  style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-emergency-expenses.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black",color:"#3F2A56"}}>Cover emergency<br/>expenses</h3>
                                </div>
                            </div>
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back"  style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-repair-renovations.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black",color:"#3F2A56"}}>Home repairs<br/>and renovations</h3>
                                </div>
                            </div>
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back"  style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-car-repairs.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black",color:"#3F2A56"}}>Car repairs<br/>or maintenance</h3>
                                </div>
                            </div>
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back"  style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-trip-expenses.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black",color:"#3F2A56"}}>Manage<br/>Trip Expenses</h3>
                                </div>
                            </div>
                            <div className="col-md-4 ft__featureGridWrap">
                                <div className="ft__featureGrid feature__back" style={{boxShadow: "0px 0px 18px rgba(108, 126, 147, 0.15) "}}>
                                    <div className="ft__featureGridIcon">
                                        <img src="/assets/p-img/icon-veterinarian-bills.svg" alt=""/>
                                    </div>
                                    <h3 style={{fontFamily:"BasisGrotesquePro-Black",color:"#3F2A56"}}>Pets<br/>veterinarian bills</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dots__imageBottomWrap">
                        <img src="/assets/p-img/dots-purple.svg" alt=""/>
                    </div>
                </div>
            </div>
        </section>


        <section className="ft__whyChooseUsWrapper">
            <div className="ft__whyChooseUsRow">
                <div className="ft__whyChooseUsMainGrid ft__whyChooseUsMainGridLarge">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="ft__loanIntakeStepsMainWrap">
                                <div className="ft__loanIntakeHeader">
                                    <h2 style={{fontFamily:"BasisGrotesquePro-Black",fontSize:"36px"}}>Putting Canadians on a path<br></br>to a better financial future</h2>
                                    <p style={{fontFamily: "basis_grotesque_proregular"}}>When banks aren’t an option, we can help you get<br></br>approved htmlFor the loan you
                                        need today.</p>
                                </div>
                                <ul className="financial__gridsWrapper">
                                    <li>
                                        <div style={{marginBottom:"15px"}} className="financial__factsWrap">
                                            <div style={{fontFamily: "basis_grotesque_proregular"}} className="count">60%</div>
                                            <div style={{fontFamily: "basis_grotesque_proregular"}} className="desc">of customers improve<br></br>their credit score</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="financial__factsWrap">
                                            <div style={{fontFamily: "basis_grotesque_proregular"}} className="count">1 in 3</div>
                                            <div style={{fontFamily: "basis_grotesque_proregular"}} className="desc">customers graduate to<br></br>prime rates</div>
                                        </div>
                                    </li>
                                </ul>
                                <button className="primaryButton continueBtn" style={{fontSize:"22px", height:"80px",maxWidth:"300px",padding:"19px 50px 19px 25px", textAlign: "center"}} onClick={onClickGetStarted}>
    <span></span> <span>  Get Started</span>
    <img style={{fontfamily: "basis_grotesque_probold", position:"absolute",marginTop:"3px",marginLeft:"44px",width:"28px"}} src="/assets/p-img/icon-arrow-right.svg" alt=""/>
  </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div  className="ft__whyChooseUsMainGrid ft__whyChooseUsMainGridSmall"
                    data-bg="/assets/p-img/stats-section-images.jpg" alt="" style={{backgroundImage:`url("/assets/p-img/stats-section-images.jpg")`}}>
                </div>
            </div>

        </section>
        <Footer/>
    </>
  )
}

export default PersonalLoanHome