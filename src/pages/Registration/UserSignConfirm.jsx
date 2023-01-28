import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
const UserSignConfirm = (props) => {
    useEffect(()=> {
        return ()=> {
            localStorage.removeItem('new_user_name')
        }
    },[])
    const name = localStorage.getItem('new_user_name') ? localStorage.getItem('new_user_name') : props.match.params.name
    return (
        <section class="Section-ListandGrid p-0">

            <div className="Addpost-responsiveimg bannerhide-mobile">
             <img className="w-100" src="/assets/image/signup-responsive-img.png" alt="" />
             <div className="UserRegister-SignUp-r">
              <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
             </div>
            </div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="row">
                            <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                <div class="RegisterAccount-Container">
                                    <div class="row">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="BuyerSign-Congress">
                                                <h1>Congratulations!</h1>
                                                <h2>Hi, {name}</h2>
                                                <h3>You have successfully created <br /> your account.</h3>
                                                <Link to='/'>Go to home page</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                                <div class="Sec-SelectAccount">
                                    <div class="SelectText">
                                        <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                    </div>
                                    <img src="/assets/image/select-img-1.png" width="965" height="1080" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default UserSignConfirm