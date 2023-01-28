import React, { useState,useRef,
    useEffect, memo } from "react";
import OwlCarousel from "react-owl-carousel2";
const options = {
    loop: true,
    margin: 0,
    items: 1,
    nav: false,
    thumbs: true,
    thumbImage: true,
    dots: false,
    // navContainer: '#customNav',
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
        0: {
            items: 1,
            nav: false,
        },
        600: {
            items: 1,
            nav: false,
        },
        1000: {
            items: 1,
            nav: false,
            loop: false,
        },
        1200: {
            items: 1,
            nav: false,
            loop: false,
        },
    },
};
const events = {
    onDragged: function (event) {
        if (event.item !== undefined && event.item !== null) {
            if (event.item.index !== undefined && event.item.index !== null && event.item.index > 0) {
                const button2 = document.getElementById('prevButtonCarsouleTestominal')
                button2.className = 'owl-nav-btn owl-prev';
                button2.disabled = false
                if (event.item.index === 4) {
                    const button = document.getElementById('nextButtonCarsouleTestominal')
                    button.className = 'owl-nav-btn owl-next disbaled'
                    button.disabled = true
                } else {
                    const button = document.getElementById('nextButtonCarsouleTestominal')
                    button.className = 'owl-nav-btn owl-next';
                    button.disabled = false
                }
            } else {
                const button2 = document.getElementById('prevButtonCarsouleTestominal')
                button2.className = 'owl-nav-btn owl-prev disbaled';
                button2.disabled = true
                const button = document.getElementById('nextButtonCarsouleTestominal')
                button.className = 'owl-nav-btn owl-next';
                button.disabled = false
            }
        }

    },
};

const ClientTestimonial = props => {
    const [totalSlide] = useState(4)
    const mainCar = useRef(null)
    useEffect(()=> {
        const button = document.getElementById('prevButtonCarsouleTestominal')
        button.className += ' disbaled';
        button.disabled = true
    },[])
   
   const changeCarsouleSildeNext = () => {
        mainCar.current.next()
        if (mainCar.current.currentPosition === totalSlide) {
            const button = document.getElementById('nextButtonCarsouleTestominal')
            button.className += ' disbaled'
            button.disabled = true
        } else {
            const button = document.getElementById('nextButtonCarsouleTestominal')
            button.className = button.className.replace(' disbaled', "");
            button.disabled = false
            const button2 = document.getElementById('prevButtonCarsouleTestominal')
            button2.className = button2.className.replace(' disbaled', "");
            button2.disabled = false
        }

    }
    const changeCarsouleSildePrev = () => {
        mainCar.current.prev()
        if (mainCar.current.currentPosition === 0) {
            const button = document.getElementById('prevButtonCarsouleTestominal')
            button.className += (' disbaled')
            button.disabled = true
        } else {
            const button = document.getElementById('prevButtonCarsouleTestominal')
            button.className = button.className.replace(' disbaled', "");
            button.disabled = false
            const button2 = document.getElementById('nextButtonCarsouleTestominal')
            button2.className = button2.className.replace(' disbaled', "");
            button2.disabled = false
        }

    }
    return (<><section className="hp-testimonials">
                    <h2 className="main-heading"> Clients Testimonials </h2>
                    <div className="testimonials-box-main">
                        <div className="image-holder show-on-mobile">
                            <span className="testimonials-icon">
                                <img src="/assets/image/testimonials-icon.svg" alt="" />
                            </span>
                            <img src="/assets/image/testimonials-image.png" alt="" />
                        </div>
                        <div className="top-head">
                            <h2> Clients Testimonials </h2>
                            <div className="owl-nav desktop">
                                <button className="owl-nav-btn owl-prev" onClick={changeCarsouleSildePrev} id='prevButtonCarsouleTestominal'></button>
                                <button className="owl-nav-btn owl-next" onClick={changeCarsouleSildeNext} id="nextButtonCarsouleTestominal"></button>
                            </div>
                        </div>
                        <div className="testimonials-box">
                            <OwlCarousel options={options} ref={mainCar} className="owl-one owl-carousel owl-theme" events={events}>
                                <div className="item">
                                    <div className="top-head">
                                        <h3> Christopher Simmons </h3>
                                        <p> Google Reviews. </p>
                                        <ul>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                        </ul>
                                    </div>
                                    <p> I had a great experience with Finance That. The application process was very easy. They were all friendly and Brian who assisted me with my application was great! He got me out of a previous bad deal and now I'm in a car that I can afford. Great place to go to for to get financing on used vehicle. </p>
                                </div>
                                <div className="item">
                                    <div className="top-head">
                                        <h3> Jacob Browning </h3>
                                        <p> Google Reviews. </p>
                                        <ul>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                        </ul>
                                    </div>
                                    <p> Great service! Worked with Adam. He was helpful from start to finish. The staff was family like made me feel very comfortable and confident about my used car purchase. Very pleased. </p>
                                </div>
                                <div className="item">
                                    <div className="top-head">
                                        <h3> Robert Fearn </h3>
                                        <p> Google Reviews. </p>
                                        <ul>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                        </ul>
                                    </div>
                                    <p> Online Chat representative are friendly and professional. They never once treated me poorly even after learning about my lower credit score. They made sure I found a car I loved, and the financing process went better than expected. I was able to stay within my budget and loving my new car. </p>
                                </div>
                                <div className="item">
                                    <div className="top-head">
                                        <h3> TOR </h3>
                                        <p> Google Reviews. </p>
                                        <ul>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                        </ul>
                                    </div>
                                    <p> Thank you Brian Denes for getting me on my New 2021 Ryker Rally, your so patient and very responsive and you get the job done... I sincerely recommend Brian Denes here at Finance That!!. </p>
                                </div>
                                <div className="item">
                                    <div className="top-head">
                                        <h3> Jason Keyes </h3>
                                        <p> Google Reviews. </p>
                                        <ul>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                            <li className="rated"> <i className="fa fa-star"></i> </li>
                                        </ul>
                                    </div>
                                    <p> I usually don’t write reviews but I had to this time. I was desperate to get a car with my credit issues and took a chance on Finance That. I am glad I did. Within a week I was in my dream car that I found on their site and financing was done without me having to leave my house. They even dropped the car at my driveway! I am a customer for life. </p>
                                </div>
                            </OwlCarousel>

                        </div>
                        <div className="owl-nav devices">
                            <button className="owl-nav-btn owl-prev" onClick={changeCarsouleSildePrev} id='prevButtonCarsouleTestominal'></button>
                            <button className="owl-nav-btn owl-next" onClick={changeCarsouleSildeNext} id="nextButtonCarsouleTestominal"></button>
                        </div>
                    </div>
                    <div className="image-holder">
                        <span className="testimonials-icon">
                            <img src="/assets/image/testimonials-icon.svg" alt="" />
                        </span>
                        <img src="/assets/image/testimonials-image.png" alt="" />
                    </div>

                </section>
           
    </>)
}
export default memo(ClientTestimonial);
