import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { get_ad_post_detail, change_down_payment, change_credit_score, change_in_tax, remove_all_record, saved_ad_post_detail, un_saved_ad_post_detail, add_view } from '../actions/postDetailActions'
import {
  get_chats,
  block_user, delete_conversation
} from '../actions/chatActions'
import { API_URL, CLIENT_URL } from '../constant'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import PostDetailPlaceHolder from '../components/placeHolder/PostDetailPlaceHolder'
import TostarMessages from '../components/alertMessages/TostarMessages'
import ChatModel from '../components/messages/ChatModel'
import ChatBlockModel from '../components/messages/ChatBlockModel'
import SimpleReactValidator from 'simple-react-validator';
import { login, register, verify_user, resend_email } from '../actions/authActions';
import SignInModel from '../components/authModels/SignInModel'
import SignUpModel from '../components/authModels/SignUpModel'
import VerificationModel from '../components/authModels/VerificationModel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
const options = {
  loop: true,
  margin: 0,
  items: 1,
  autoplay: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  responsiveClass: 'true',
  dots: false,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>"],
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 1,
      nav: false
    },
    1000: {
      items: 1,
      nav: true,
      loop: false
    }
  }
};

class AddDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downPayment: 0,
      totalAmount: 0,
      creditId: "3",
      terms: "72",
      tax: 13,
      taxAmount: 0,
      monthlyAmount: 0,
      weeklyAmount: 0,
      minMonthlyAmount: 0,
      maxMonthlyAmount: 0,
      minWeeklyAmount: 0,
      maxWeeklyAmount: 0,
      reciver_id: '',
      reciver_name: '',
      userEmail: '',
      userPassword: '',
      list_desc: '',
      list_id: '',
      list_price: '',
      stock_id: '',
      vehicle_image: '',
      lister_image: '',
      user_image: '',
      shareButton: false
    }
    window.scrollTo(0, 0)
    this.scrollableNodeRef = React.createRef();
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  UNSAFE_componentWillMount() {
    const id = this.props.match.params.id
    this.props.get_ad_post_detail(id)
    const data = {
      ad_id: id
    }
    this.props.add_view(data)
  }
  handleSavedAd = (ad_id, status) => {
    const data = {
      user_id: this.props.user_id,
      ad_id: ad_id
    }
    if (this.props.user_id == undefined || this.props.user_id == null || this.props.user_id == '') {
      toastr.error('Error', 'User Have To Login First')
      return false
    }
    if (status == false) {
      this.props.saved_ad_post_detail(data)
    } else {
      this.props.un_saved_ad_post_detail(data)
    }
  }
  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.downPayment !== this.state.downPayment) {
      this.props.change_down_payment(this.state.downPayment == '' ? 0 : this.state.downPayment.split(',').join(""))
    }
    if (prevState.creditId !== this.state.creditId) {
      this.props.change_credit_score(this.state.creditId)
    }
    if (prevProps.add_post_detail !== this.props.add_post_detail && this.props.add_post_detail.length > 0 && this.props.add_post_detail !== undefined) {
      // this.props.change_in_tax(13)
      // const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalAmount).toFixed(2) : 0
      const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalPrice).toFixed(2) : 0
      const min = this.props.estimatedAPR.lowAmount !== undefined ? +this.props.estimatedAPR.lowAmount : 1
      const max = this.props.estimatedAPR.highAmount !== undefined ? +this.props.estimatedAPR.highAmount : 1
      var loan = Number(totalAmount)
      var month = Number(this.state.terms)
      var int = min
      var down = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].downPayment).toFixed(2) : 0
      var amount = parseInt(loan)
      var months = parseInt(month)
      var down = parseInt(down)
      var annInterest = parseFloat(int)
      var monInt = annInterest / 1200
      var calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var weekIn = annInterest / 2600
      var calculationWeek = ((weekIn + (weekIn / (Math.pow((1 + weekIn), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxAnnInterest = parseFloat(max)
      var maxMonInt = maxAnnInterest / 1200
      var maxCalculation = ((maxMonInt + (maxMonInt / (Math.pow((1 + maxMonInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxWeekInt = maxAnnInterest / 2600
      var maxWeekCalculation = ((maxWeekInt + (maxWeekInt / (Math.pow((1 + maxWeekInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      this.setState({
        ...this.state,
        // monthlyAmount: totalAmount == 0 ? 0 : totalAmount / +this.state.terms,
        monthlyAmount: totalAmount == 0 ? 0 : calculation == 0 ? 0 : calculation,
        minMonthlyAmount: totalAmount == 0 ? 0 : calculation,
        maxMonthlyAmount: totalAmount == 0 ? 0 : maxCalculation,
        weeklyAmount: totalAmount == 0 ? 0 : (totalAmount / +this.state.terms) / 4,
        // minWeeklyAmount: totalAmount == 0 ? 0 : calculation / 4,
        minWeeklyAmount: totalAmount == 0 ? 0 : calculationWeek,
        // maxWeeklyAmount: totalAmount == 0 ? 0 : maxCalculation / 4
        maxWeeklyAmount: totalAmount == 0 ? 0 : maxWeekCalculation
      })
      // let minMonthlyAmount = totalAmount == 0 ? 0 : (+totalAmount + ((+totalAmount * +min) / 100)).toFixed(2)
      // minMonthlyAmount = minMonthlyAmount == 0 ? 0 : (+minMonthlyAmount / +this.state.terms).toFixed(2)
      // let maxMonthlyAmount = totalAmount == 0 ? 0 : (+totalAmount + ((+totalAmount * +max) / 100)).toFixed(2)
      // maxMonthlyAmount = maxMonthlyAmount == 0 ? 0 : (+maxMonthlyAmount / +this.state.terms).toFixed(2)
      // let minWeeklyAmount = totalAmount == 0 ? 0 : (+totalAmount + ((+totalAmount * +min) / 100)).toFixed(2)
      // minWeeklyAmount = minWeeklyAmount == 0 ? 0 : ((+minWeeklyAmount / +this.state.terms) / 4).toFixed(2)
      // let maxWeeklyAmount = totalAmount == 0 ? 0 : (+totalAmount + ((+totalAmount * +max) / 100)).toFixed(2)
      // maxWeeklyAmount = maxWeeklyAmount == 0 ? 0 : ((+maxWeeklyAmount / +this.state.terms) / 4).toFixed(2)
      // this.setState({
      //   ...this.state,
      //   monthlyAmount: totalAmount == 0 ? 0 : totalAmount / +this.state.terms,
      //   minMonthlyAmount: minMonthlyAmount,
      //   maxMonthlyAmount: maxMonthlyAmount,
      //   weeklyAmount: totalAmount == 0 ? 0 : (totalAmount / +this.state.terms) / 4,
      //   minWeeklyAmount: minWeeklyAmount,
      //   maxWeeklyAmount: maxWeeklyAmount
      // })

    }
    if (prevState.terms !== this.state.terms) {
      // const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalAmount).toFixed(2) : 0
      const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalPrice).toFixed(2) : 0
      const min = this.props.estimatedAPR.lowAmount !== undefined ? +this.props.estimatedAPR.lowAmount : 1
      const max = this.props.estimatedAPR.highAmount !== undefined ? +this.props.estimatedAPR.highAmount : 1
      var loan = Number(totalAmount)
      var month = Number(this.state.terms)
      var int = min
      var down = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].downPayment).toFixed(2) : 0
      var amount = parseInt(loan)
      var months = parseInt(month)
      var down = parseInt(down)
      var annInterest = parseFloat(int)
      var monInt = annInterest / 1200
      var calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var weekIn = annInterest / 2600
      var calculationWeek = ((weekIn + (weekIn / (Math.pow((1 + weekIn), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxAnnInterest = parseFloat(max)
      var maxMonInt = maxAnnInterest / 1200
      var maxCalculation = ((maxMonInt + (maxMonInt / (Math.pow((1 + maxMonInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxWeekInt = maxAnnInterest / 2600
      var maxWeekCalculation = ((maxWeekInt + (maxWeekInt / (Math.pow((1 + maxWeekInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      this.setState({
        ...this.state,
        monthlyAmount: totalAmount == 0 ? 0 : calculation == 0 ? 0 : calculation,
        minMonthlyAmount: totalAmount == 0 ? 0 : calculation,
        maxMonthlyAmount: totalAmount == 0 ? 0 : maxCalculation,
        weeklyAmount: totalAmount == 0 ? 0 : (totalAmount / +this.state.terms) / 4,
        // minWeeklyAmount: totalAmount == 0 ? 0 : calculation / 4,
        minWeeklyAmount: totalAmount == 0 ? 0 : calculationWeek,
        // maxWeeklyAmount: totalAmount == 0 ? 0 : maxCalculation / 4
        maxWeeklyAmount: totalAmount == 0 ? 0 : maxWeekCalculation
      })
    }
    if (prevProps.estimatedAPR !== this.props.estimatedAPR) {
      // const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalAmount).toFixed(2) : 0
      const totalAmount = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].totalPrice).toFixed(2) : 0
      const min = this.props.estimatedAPR.lowAmount !== undefined ? +this.props.estimatedAPR.lowAmount : 1
      const max = this.props.estimatedAPR.highAmount !== undefined ? +this.props.estimatedAPR.highAmount : 1
      var loan = Number(totalAmount)
      var month = Number(this.state.terms)
      var int = min
      var down = this.props.add_post_detail !== undefined && this.props.add_post_detail.length > 0 ? Number(this.props.add_post_detail[0].downPayment).toFixed(2) : 0
      var amount = parseInt(loan)
      var months = parseInt(month)
      var down = parseInt(down)
      var annInterest = parseFloat(int)
      var monInt = annInterest / 1200
      var calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var weekIn = annInterest / 2600
      var calculationWeek = ((weekIn + (weekIn / (Math.pow((1 + weekIn), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxAnnInterest = parseFloat(max)
      var maxMonInt = maxAnnInterest / 1200
      var maxCalculation = ((maxMonInt + (maxMonInt / (Math.pow((1 + maxMonInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      var maxWeekInt = maxAnnInterest / 2600
      var maxWeekCalculation = ((maxWeekInt + (maxWeekInt / (Math.pow((1 + maxWeekInt), months) - 1))) * (amount - (down || 0))).toFixed(2);
      // Bi Weeklly
      this.setState({
        ...this.state,
        monthlyAmount: totalAmount == 0 ? 0 : calculation == 0 ? 0 : calculation,
        minMonthlyAmount: totalAmount == 0 ? 0 : calculation,
        maxMonthlyAmount: totalAmount == 0 ? 0 : maxCalculation,
        weeklyAmount: totalAmount == 0 ? 0 : (totalAmount / +this.state.terms) / 4,
        // minWeeklyAmount: totalAmount == 0 ? 0 : calculation / 4,
        minWeeklyAmount: totalAmount == 0 ? 0 : calculationWeek,
        // maxWeeklyAmount: totalAmount == 0 ? 0 : maxCalculation / 4
        maxWeeklyAmount: totalAmount == 0 ? 0 : maxWeekCalculation
      })
    }

    if (prevProps.loggedIn !== this.props.loggedIn) {
      window.$('#signInModel').modal('hide')
    }
    if (prevProps.registering !== this.props.registering && this.props.registering === true) {
      window.$('#signUpModel').modal('hide')
      window.$('#verificationModel').modal('show')
    }
    if (prevProps.isVerify !== this.props.isVerify && this.props.isVerify === true) {
      window.$('#signUpModel').modal('hide')
      window.$('#verificationModel').modal('hide')
      window.$('#signInModel').modal('hide')
    }
  }
  toggleBlockModel = (filterRecord) => {
    if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
      this.props.block_user(this.props.user_id, filterRecord.reciver_id, !this.props.isBlock)
    }
  }
  deleteChatModel = (filterRecord) => {
    if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
      this.props.delete_conversation(this.props.user_id, filterRecord.reciver_id, filterRecord.list_id)
    }
  }
  componentWillUnmount() {
    this.props.remove_all_record()
    sessionStorage.removeItem('chatId')

  }
  scrollDiv = createRef();

  scrollSmoothHandler = () => {
    this.scrollDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  // onSaveCrop = () => {
  //   window.$('#chatModel').modal('hide')
  // }
  openModel = (reciver_id, reciver_name, desc, list_id, price, stcok_id, image_path, lister_photo) => {
    if (this.props.user_id == undefined || this.props.user_id == null || this.props.user_id == '') {
      window.$('#signInModel').modal('show')
    } else {
      this.setState({
        ...this.state,
        reciver_id: reciver_id,
        reciver_name: reciver_name,
        list_desc: desc,
        list_id: list_id,
        list_price: price,
        stock_id: stcok_id,
        vehicle_image: image_path,
        lister_image: lister_photo !== undefined && lister_photo !== null && lister_photo !== '' ? lister_photo : '',
        user_image: this.props.photo !== undefined && this.props.photo !== null && this.props.photo !== '' ? this.props.photo : JSON.parse(localStorage.getItem('user')).photo !== undefined && JSON.parse(localStorage.getItem('user')).photo !== null && JSON.parse(localStorage.getItem('user')).photo !== "" ? JSON.parse(localStorage.getItem('user')).photo : ''
      })
      sessionStorage.setItem('chatId', stcok_id)

      this.props.get_chats(this.props.user_id, reciver_id, list_id, stcok_id)

      // this.props.get_chats(reciver_id, this.props.user_id, list_id)

      window.$('#chatModel').modal('show')
    }

  }

  modelClose = () => {
    return true
  }
  toggleModel = (e) => {
    if (e === 'signIn') {
      window.$('#signUpModel').modal('hide')
      window.$('#signInModel').modal('show')
    }
    if (e === 'signUp') {
      window.$('#signUpModel').modal('show')
      window.$('#signInModel').modal('hide')
    }
  }
  emptyFunc = () => {
    return true
  }

  loginUser = (e) => {
    e.preventDefault()
    if (!this.validator.fieldValid('User Email')) {
      this.validator.showMessageFor('User Email')
      this.forceUpdate();
      return false
    }
    if (!this.validator.fieldValid('User Password')) {
      this.validator.showMessageFor('User Password')
      this.forceUpdate();
      return false
    }
    const { userEmail, userPassword } = this.state;
    if (userEmail && userPassword) {
      const data = {
        email: userEmail, password: userPassword, redirect: false
      }
      this.props.login(data);
    }
  }
  toggleShare = () => {
    this.setState({
      ...this.state,
      shareButton: !this.state.shareButton
    })
  }
  emptyFun = () => {
    return true
  }
  render() {
    const filterRecord = {
      reciver_id: this.state.reciver_id,
      list_id: this.state.list_id
    }

    return (
      <React.Fragment>
        <section className="Section-ListDetail">
          <div className="detail-page-main-outer clearfix">
            {(this.props.add_post_detail || []).length > 0 ? (this.props.add_post_detail || []).map((item, index) => (
              <React.Fragment key={index}>
                <div className="detail-carousal" >
                  <div className="LargeImage-Container">
                    <div className="cross-detail" onClick={() => this.props.history.goBack()}>

                    </div>
                    <Carousel infiniteLoop>
                      {item && item.images ? item.images.length > 0 ? (item.images || []).map((img, imgIndex) => (
                        <div key={imgIndex}>
                          <img src={img && img.photo ? `${API_URL}/media/${img.photo}` : '/assets/image/no_image.png'} alt="Image" key={imgIndex} />
                        </div>)) : <img src='/assets/image/no_image.png' alt="Image" /> : <img src='/assets/image/no_image.png' alt="Image" />}
                    </Carousel>
                    <div className="ListDetail-Badge" onClick={this.props.loading_saved_ad_detail ? this.emptyFun : () => this.handleSavedAd(item.id, item.saved_ad == undefined || item.saved_ad == false ? false : true)}>
                      {this.props.loading_saved_ad_detail ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : (<i className={item.saved_ad == undefined || item.saved_ad == false ? "fa fa-heart-o" : "fa fa-heart-o active"}></i>)}
                    </div>
                  </div>
                </div>

                <div className="detail-list-detail">
                  <div className="ListDetail-Scroll">
                    <div className="LargeRight-Image">
                      <h1>{`${item && item.des_2} `}<span> Stock: {item.stock_id} </span></h1>
                      {/* <h2>Listed {moment(item.created_at,).fromNow()} in {item && item.location ? item.location.split(',').slice(-3, -1)[0]  + ", " + item.location.split(',').slice(-2, -1)[0] : ''}</h2> */}
                      <h2>Listed {moment(item.created_at,).fromNow()} in {item && item.location ? item.location.split(',').slice(-3, -1)[0] && item.location.split(',').slice(-2, -1)[0] ? item.location.split(',').slice(-3, -1)[0] + ", " + item.location.split(',').slice(-2, -1)[0] : item.location : ''}</h2>
                      <h4>
                        {item && item.price ? new Intl.NumberFormat('en-US',
                          { style: 'currency', currency: 'USD' }
                        ).format(Number(item.price))// '$100.00'
                          : new Intl.NumberFormat('en-US',
                            { style: 'currency', currency: 'USD' }
                          ).format(0)}
                      </h4>
                      {/* <h5>
                        <img src="/assets/image/calculator-icon.svg" />{" "}
                        {this.state.monthlyAmount ? new Intl.NumberFormat('en-US',
                          { style: 'currency', currency: 'USD' }
                        ).format(Number(this.state.monthlyAmount))// '$100.00'
                          : new Intl.NumberFormat('en-US',
                            { style: 'currency', currency: 'USD' }
                          ).format(0)} Monthly or
                        {" "}{this.state.minWeeklyAmount ? new Intl.NumberFormat('en-US',
                          { style: 'currency', currency: 'USD' }
                        ).format(Number(this.state.minWeeklyAmount))// '$100.00'
                          : new Intl.NumberFormat('en-US',
                            { style: 'currency', currency: 'USD' }
                          ).format(0)}  Bi-Weekly
                      </h5> */}
                      <h6>
                        {item.type_name}{" "}
                      </h6>
                    </div>

                    <div className="FinanceThat-Container clearfix">
                      <div className="financethat-left-image"> <img src={item && item.category && item.category.image_path ? item.category.image_path : "/assets/image/crossovers.svg"} alt="" /> <span> {item.category !== undefined && item.category !== null ? item.category.name : ''} </span> </div>
                      <div className="financethat-right-content">
                        <div className="ServiceOne">
                          <Link to={`/post-application/${item.stock_id}`} >
                            <img src="/assets/image/finance-tag.svg" alt="finance" />
                            Apply Now
                          </Link>
                        </div>
                        <div className="ServiceTwo" onClick={this.scrollSmoothHandler}>
                          <img src="/assets/image/calculator-2.svg" alt="Cal" />
                        </div>
                        <div className="ServiceTwo" onClick={Number(item.user_id.id) !== Number(this.props.user_id) ? () => this.openModel(item.user_id.id, item.user_id.full_name, item.des, item.id, item.price, item.stock_id, (item.images || [])[0].image_path, item.user_id.photo) : () => this.emptyFunc()}>
                          <img src="/assets/image/chat-square.svg" alt="" />
                        </div>

                        <div className="ServiceTwo" onClick={this.toggleShare}>
                          <div className={this.state.shareButton ? "share-tooltip active" : "share-tooltip"}>
                            <div className="share-tooltip-inner">
                              <ul>
                                <li> <FacebookShareButton url={CLIENT_URL + this.props.location.pathname}><FacebookIcon size={32} round={true} /></FacebookShareButton> </li>
                                <li>   <LinkedinShareButton url={CLIENT_URL + this.props.location.pathname}
                                  title={item.des}>
                                  <LinkedinIcon size={32} round />
                                </LinkedinShareButton> </li>
                                <li> <TwitterShareButton
                                  url={CLIENT_URL + this.props.location.pathname}
                                  title={item.des}
                                >
                                  <TwitterIcon size={32} round />
                                </TwitterShareButton>  </li>
                                <li><WhatsappShareButton
                                  url={CLIENT_URL + this.props.location.pathname}
                                  title={item.des}
                                  separator="::"
                                >
                                  <WhatsappIcon size={32} round />
                                </WhatsappShareButton></li>
                              </ul>
                            </div>
                          </div>
                          <a >
                            <img src="/assets/image/sharing-icon.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="AsideMenu-Container">
                      <div className="OverViewListing">
                        <h1>Overview</h1>
                        <ul>
                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <img
                                  src="/assets/image/Calendar.svg"
                                  alt=""
                                />
                                <h3>Year:</h3>
                                <h2>{item.year}</h2>
                              </div>

                              <div className="OverView-Right">
                                <img
                                  src="/assets/image/car-icon.svg"
                                  alt=""
                                />
                                <h3>Trim:</h3>
                                <h2>{item.trim}</h2>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <img
                                  src="/assets/image/car-icon.svg"
                                  alt=""
                                />
                                <h3>Make:</h3>
                                <h2>{item.make ? item.make : item.other_make || ''}</h2>
                              </div>

                              <div className="OverView-Right">
                                <img
                                  src="/assets/image/speedometer-icon.svg"
                                  alt=""
                                />
                                <h3>KM:</h3>
                                <h2>{item.kilometer ? item.kilometer.toLocaleString('en-US') : (0).toLocaleString('en-US')}</h2>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <img
                                  src="/assets/image/car-icon.svg"
                                  alt=""
                                />
                                <h3>Model:</h3>
                                <h2>{item.model ? item.model : item.other_model || ''}</h2>
                              </div>

                              <div className="OverView-Right">
                                <img
                                  src="/assets/image/clean-icon.svg"
                                  alt=""
                                />
                                <h3>Condition:</h3>
                                <h2>{item.v_condition}</h2>
                              </div>
                            </div>
                          </li>


                          <li>
                            <div className="OverViewRate-Container">

                              <div className="RateImage">
                                {/* <div className="RateBadge"><i className="fa fa-star"></i></div> */}
                                {item.no_of_ads && item.no_of_ads > 0 && item.no_of_ads !== '' ? (<Link to={{
                                  pathname: `/dealer-list/${item.user_id && item.user_id.id ? item.user_id.id : ''}/${item.user_type ? item.user_type : ''}`,
                                }}>
                                  <img src={item.user_id ? item.user_id.photo && item.user_id.photo !== '' ? `${API_URL}/media/${item.user_id.photo}` : "/assets/image/rate-image.png" : "/assets/image/rate-image.png"} alt={item.user_id ? item.user_id.name ? item.user_id.name : "" : ""} />
                                </Link>) : (<img src={item.user_id ? item.user_id.photo && item.user_id.photo !== '' ? `${API_URL}/media/${item.user_id.photo}` : "/assets/image/rate-image.png" : "/assets/image/rate-image.png"} alt={item.user_id ? item.user_id.name ? item.user_id.name : "" : ""} />)}
                              </div>

                              <div className="OverView-Btm">
                                {item.no_of_ads && item.no_of_ads > 0 && item.no_of_ads !== '' ? (
                                  <React.Fragment><h1><Link to={{
                                    pathname: `/dealer-list/${item.user_id ? item.user_id.id : ''}/${item.user_type ? item.user_type : ''}`,
                                  }}> {item.user_id && item.user_id.full_name ? item.user_id.full_name : 'Julia Slava'}</Link></h1>
                                    <h5><Link to={{
                                      pathname: `/dealer-list/${item.user_id ? item.user_id.id : ''}/${item.user_type ? item.user_type : ''}`,
                                    }}>Other Listings <span>{item.no_of_ads && item.no_of_ads !== '' ? item.no_of_ads || 1 : 0} {item.no_of_ads && item.no_of_ads !== '' ? Number(item.no_of_ads) > 1 ? 'listings' : 'listing' : '0 listing'} </span></Link></h5></React.Fragment>
                                ) : (<h1>{item.user_id ? item.user_id.full_name : 'Julia Slava'}</h1>)}

                                <a onClick={Number(item.user_id.id) !== Number(this.props.user_id) ? () => this.openModel(item.user_id.id, item.user_id.full_name, item.des, item.id, item.price, item.stock_id, (item.images || [])[0].image_path, item.user_id.photo) : () => this.emptyFunc()} >Message</a>

                              </div>

                            </div>
                          </li>



                        </ul>
                      </div>

                      <div className="Description-Head">
                        <h2>Description</h2>
                        <p>
                          {/* dangerouslySetInnerHTML={{ __html: item.description }} */}
                          {item.description || ''}
                        </p>
                      </div>

                      <div className="OverViewListing">
                        <h1 className="rounded-0">Vehicle Detail</h1>
                        <ul>
                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <h4>Body Type:</h4>
                                <h5>{item.body_type}</h5>
                              </div>

                              <div className="OverView-Right">
                                <h4>Exterior Color:</h4>
                                <h5>{item.color}</h5>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <h4>Seating:</h4>
                                <h5>{item.seating}</h5>
                              </div>

                              <div className="OverView-Right">
                                <h4>Fuel Type:</h4>
                                <h5>{item.fuel_type}</h5>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <h4>Transmission:</h4>
                                <h5>{item.transmission}</h5>
                              </div>

                              <div className="OverView-Right">
                                <h4>Drive Train:</h4>
                                <h5>{item.drive_train}</h5>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <h4>Owners:</h4>
                                <h5>{item.previous_owners === 1 ? 'One owner' : item.previous_owners === 2 ? 'Two onwer' : item.previous_owners === 3 ? '2+ Owner' : 'One owner'}</h5>
                              </div>

                              <div className="OverView-Right">
                                <h4>Cylinder:</h4>
                                <h5>{item.cylinder}</h5>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="OverView-Container">
                              <div className="OverView-Left">
                                <h4>Accidents:</h4>
                                <h5>{item.previous_accidents === 0 ? 'None' : item.previous_accidents === 1 ? '1 Accident' : item.previous_accidents === 2 ? '2+ Accident' : 'None'}</h5>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="FeatureList-Large">
                        <h4>Features</h4>
                        <ul>
                          {item.features && typeof JSON.parse(item.features || []) !== 'string' ? (JSON.parse(item.features || []).map((featur, featIndex) => (
                            <li key={featur.id}>
                              <a >{featur.v_features}</a>
                            </li>
                          ))) : null}
                        </ul>
                      </div>

                      <div className="LargePayment-Container" ref={this.scrollDiv}>
                        <div className="accordion" id="accordionExample">
                          <div className="card">
                            <div className="card-header" id="headingOne">
                              <strong className="title">
                                Payment Calculator
                              </strong>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body pl-0 pr-0">
                                <div className="row">
                                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="CreditSelect-Container">
                                      <h1>Credit score</h1>

                                      <div className="CreditDropdown">
                                        <select name='creditId' onChange={this.handleOnChange} value={this.state.creditId}>
                                          <option value="0">Excellent (800+ FICO® Score)</option>
                                          <option value="1">Very Good (740-799 FICO® Score)</option>
                                          <option value="2">Good (670-739 FICO® Score)</option>
                                          <option value="3">Fair (580-669 FICO® Score)</option>
                                          <option value="4">Challenged (&lt; 580 FICO® Score)</option></select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="DownPayment-Container MonthlyPay-Form">
                                      <h3>Down payment</h3>
                                      <NumberFormat
                                        className='form-control'
                                        value={(this.state.downPayment)}
                                        decimalScale={2}
                                        onChange={this.handleOnChange}
                                        thousandSeparator={true}
                                        id="downPayment"
                                        name="downPayment"
                                        allowNegative={false}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="CreditSelect-Container">
                                      <h1>Term length</h1>

                                      <div className="CreditDropdown">
                                        <select name='terms' onChange={this.handleOnChange} value={this.state.terms}>
                                          <option value="36">36 months</option>
                                          <option value="48">48 months</option>
                                          <option value="60">60 months</option>
                                          <option value="72">72 months</option>
                                          <option value="84">84 months</option>
                                          <option value="96">96 months</option>
                                          <option value="108">108 months</option>
                                          <option value="120">120 months</option></select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="Payment-SummaryList">
                                      <h1>Summary**</h1>
                                      <ul>
                                        <li>
                                          <h3>Vehicle Price</h3>{" "}
                                          <h4>{item.price ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(Number(item.price))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                              { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h4>
                                        </li>
                                        <li>
                                          <h3>Est. Tax, Titles, & Fees</h3>{" "}
                                          <h4>+ {item.taxAmount ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(Number(item.taxAmount))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                              { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h4>
                                        </li>
                                        <li>
                                          <h3>
                                            Down Payment (Get a trade-in
                                            offer)
                                          </h3>{" "}
                                          <h4>- {item.downPayment ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(Number(item.downPayment))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                              { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h4>
                                        </li>
                                        <li>
                                          <h5>Total Finance Amount</h5>{" "}
                                          <h6>{item.totalAmount && item.downPayment < item.price ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(Number(item.totalAmount))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                              { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h6>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="EstimatedPayment-Head clearfix">
                                      <h1>Estimated Payment</h1>
                                      <h2>{this.state.minMonthlyAmount ? new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                      ).format(Number(this.state.minMonthlyAmount))// '$100.00'
                                        : new Intl.NumberFormat('en-US',
                                          { style: 'currency', currency: 'USD' }
                                        ).format(0)}- {this.state.maxMonthlyAmount ? new Intl.NumberFormat('en-US',
                                          { style: 'currency', currency: 'USD' }
                                        ).format(Number(this.state.maxMonthlyAmount))// '$100.00'
                                          : new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(0)}/monthly</h2>
                                      <span>or</span>
                                      <h3>{this.state.minWeeklyAmount ? new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                      ).format(Number(this.state.minWeeklyAmount))// '$100.00'
                                        : new Intl.NumberFormat('en-US',
                                          { style: 'currency', currency: 'USD' }
                                        ).format(0)} - {this.state.maxWeeklyAmount ? new Intl.NumberFormat('en-US',
                                          { style: 'currency', currency: 'USD' }
                                        ).format(Number(this.state.maxWeeklyAmount))// '$100.00'
                                          : new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                          ).format(0)}/bi-weekly</h3>
                                      <h4>Estimated APR {`${this.props.estimatedAPR.lowAmount}% - ${this.props.estimatedAPR.highAmount}%`}</h4>
                                      <Link to={`/post-application/${item.stock_id}`} ><button type='button'> <img src="/assets/image/finance-tag.svg" alt="" /> Finance that</button></Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="listing-footer-container">

                      <div className="footer-top-list">
                        <h1>Start today with our <span>Finance <br />That</span> Service</h1>
                        <p>With the My WU® Membership program, you’ll earn points when you send qualifying transfers & bill payments.</p>

                        <div className="footer-contact">

                          <div className="footer-phone">
                            <i><img src="/assets/image/list-mobile.svg" alt="" /></i>
                            <h6>1-844-354-5454</h6>
                          </div>

                          <div className="footer-phone">
                            <i><img src="/assets/image/list_email.svg" alt="" /></i>
                            <h6>info@financethat.ca</h6>
                          </div>

                        </div>

                        <div className="discover-our-app">
                          <h1>Discover Our App</h1>
                          <img src="/assets/image/list-google-play-btn.svg" alt="" />
                          <img src="/assets/image/list-app-store.svg" alt="" />
                        </div>

                        <div className="list-social-media">
                          <ul>
                            <li><Link to='/'><i className="fa fa-facebook-f"></i></Link></li>
                            <li><Link to='/'><i className="icon-instagram"></i></Link></li>
                            <li className="twitter"><Link to='/'><i className="icon-twitter"></i></Link></li>
                          </ul>
                        </div>

                      </div>


                      <div className="list-footer-logo">
                        <img src="/assets/image/financethat-logo.svg" alt="" />
                        <p>Open an account in minutes, get full financial control for much longer.</p>
                      </div>


                      <div className="list-flinks-container">

                        <div className="list-flinks">
                          <h1>Marketplace</h1>

                          <ul>
                            <li><Link to='/seller/add-post'>Post an ad</Link></li>
                            <li><Link to='/'>Search a vehicle</Link></li>
                            <li><Link to='/register'>Become a Seller</Link></li>
                            <li><Link to='/dealer/register'>Dealer Partner</Link></li>
                          </ul>

                        </div>

                        <div className="list-flinks">
                          <h1>Vehicles</h1>

                          <ul>
                            <li><Link to='/Ad-post/list'>Featured listings</Link></li>
                            <li><Link to={{
                              pathname: "/Ad-post/list", query: {
                                location: '',
                                color: '',
                                fromKilometer: (0).toLocaleString('en-US'),
                                fromRange: Number(10000).toFixed(2),
                                fromYear: '',
                                makeFilterName: '',
                                modalFilterName: '',
                                category: '',
                                latitude: '',
                                longitude: '',
                              }
                            }}>Under $10,000</Link></li>
                            <li><Link to={{
                              pathname: "/Ad-post/list", query: {
                                location: '',
                                color: '',
                                fromKilometer: (0).toLocaleString('en-US'),
                                fromRange: Number(0).toFixed(2),
                                fromYear: '',
                                makeFilterName: '',
                                modalFilterName: '',
                                category: '',
                                latitude: '',
                                longitude: '',
                              }
                            }}>Newly listed</Link></li>
                            <li><Link to={{
                              pathname: "/Ad-post/list", query: {
                                location: '',
                                color: '',
                                fromKilometer: (0).toLocaleString('en-US'),
                                fromRange: Number(0).toFixed(2),
                                fromYear: '',
                                makeFilterName: '',
                                modalFilterName: '',
                                category: '',
                                latitude: '',
                                longitude: '',
                              }
                            }}>Price reduced</Link></li>
                          </ul>

                        </div>

                        <div className="list-flinks">
                          <h1>Financing</h1>

                          <ul>
                            <li><Link to='/post-application'>Get financing</Link></li>
                            <li><Link to='/buyer/my-ads'>My application</Link></li>
                            <li><Link to='/'>How it works</Link></li>
                            <li><Link to='/'>Borrower terms</Link></li>
                          </ul>

                        </div>

                        <div className="list-flinks">
                          <Link to={`/post-application/${item.stock_id}`} ><h1>Finance That</h1></Link>

                          <ul>
                            <li><Link to='/about-us'>About us</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                            <li><Link to='/privacy'>Privacy Policy</Link></li>
                            <li><Link to='/terms'>Terms & Conditions</Link></li>
                          </ul>

                        </div>


                      </div>

                      <div className="clearfix"></div>

                      <div className="list-copyright">
                        <h1>Ironclad provides self-help services at your specific direction. We are not a law firm or a substitute<br />
                          for an attorney or law firm.</h1>
                        <p>All rights reserved @Financethat.co</p>
                      </div>


                    </div>



                  </div>
                </div>

              </React.Fragment>
            )) : <PostDetailPlaceHolder />}
          </div>
          <TostarMessages />
        </section>
        <div className="modalchat-container">
          <ChatModel reciver_id={this.state.reciver_id} reciver_name={this.state.reciver_name} list_id={this.state.list_id} list_desc={this.state.list_desc} list_price={this.state.list_price} {...this.props} stock_id={this.state.stock_id} vehicle_image={this.state.vehicle_image} lister_image={this.state.lister_image} user_image={this.state.user_image} />
        </div>
        <SignInModel {...this.props} modelClose={this.modelClose} toggleModel={this.toggleModel} />
        <SignUpModel {...this.props} modelClose={this.modelClose} toggleModel={this.toggleModel} />
        <VerificationModel email={this.props.user_detail !== undefined && this.props.user_detail.email !== undefined ? this.props.user_detail.email : ''} {...this.props} validator={this.validator} modelClose={this.modelClose} forceUpdate={this.forceUpdate} />
        <ChatBlockModel toggleBlock={this.toggleBlockModel} deleteChat={this.deleteChatModel} reciver_name={this.state.reciver_name} filterRecord={filterRecord} blocked={this.props.blocked} user_id={this.props.user_id} blockLoading={this.props.blockLoading} deleteLoading={this.props.deleteLoading} />
      </React.Fragment >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    add_post_detail: state.adPostReducers.postDetailReducer.add_post_detail,
    estimatedAPR: state.adPostReducers.postDetailReducer.estimatedAPR,
    loading_saved_ad_detail: state.adPostReducers.postDetailReducer.loading_saved_ad_detail,
    user_id: state.authReducer.authentication.user.user_id,
    chat: state.chatReducer.chat,
    loggedIn: state.authReducer.authentication.loggedIn,
    isBlock: state.chatReducer.isBlock,
    photo: state.userProfileReducer.photo,
    blocked: state.chatReducer.blocked,
    blockLoading: state.chatReducer.blockLoading,
    deleteLoading: state.chatReducer.deleteLoading,
    registering: state.authReducer.registration.registering,
    isVerify: state.authReducer.registration.isVerify,
    user_detail: state.authReducer.registration.user_detail,
  }
}
export default connect(mapStateToProps, { login, get_chats, get_ad_post_detail, change_down_payment, change_in_tax, change_credit_score, remove_all_record, un_saved_ad_post_detail, saved_ad_post_detail, block_user, delete_conversation, register, verify_user, resend_email, add_view })(AddDetails);
