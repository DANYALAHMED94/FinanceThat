import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const DealerHowItsWork = (props) => {
  const vidRef = React.useRef(null);
  const vidRefM = React.useRef(null);
  const [state, setState] = useState({ mobileStart: true, webStart: true });
  const [autoPlay, setAutoPlay] = useState(false);

  const playVideo = () => {
    vidRef.current.play();
    setState({
      ...state,
      webStart: false,
    });
  };
  const playVideoMobile = () => {
    vidRefM.current.play();
    setState({
      ...state,
      mobileStart: false,
    });
  };
  const pauseVideo = () => {
    vidRef.current.pause();
    setState({
      ...state,
      webStart: true,
    });
  };
  const pauseVideoMobile = () => {
    vidRefM.current.pause();
    setState({
      ...state,
      mobileStart: true,
    });
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>
          How it Works – Finance That – We are an automotive and powersports
          marketplace that help buyers with instant financing online.
        </title>
        <meta
          name="description"
          content="Choose a vehicle from our marketplace, apply for financing, get instant approval and enjoy your new vehicle. It’s that simple."
        />
      </Helmet>
      <div className="dealer-how-inner-background how-it-works-background clearfix how-it-works-mobile">
        <div className="dealership-how-container">
          <div className="dealer-colum-left dealer-head-mobile">
            <div className="creative-your-free">
              <h1>
                Create your Free
                <br /> Dealership Account
              </h1>
              <h2>
                Watch our explainer video to see how you the dealer can
                <br /> boost your sales and attract new buyers by selling
                directly
                <br /> on Finance That and let us take care of financing!
              </h2>
            </div>

            <div className="register-now-button">
              <Link to="/register/dealer-signup">Register now</Link>
              {/* <button className="watchvideo" onClick={() => setAutoPlay(true)}>
                Watch Video <span></span>
              </button> */}
            </div>
          </div>

          <div className="dealer-colum-right">
            <div className="right-side-img">
              <div className="facebook-responsive">
                <iframe
                  src="https://www.youtube.com/embed/CjqtevHWMbg"
                  width="100%"
                  height="100%"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen="true"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="MobileNav">
        <div className="dealer-how-inner-background how-it-works-background clearfix">
          <div className="dealership-how-container">
            <div className="dealer-colum-right mobile-dealer-video">
              <div className="right-side-img">
                <div className="facebook-responsive">
                  <iframe
                    src="https://www.youtube.com/embed/CjqtevHWMbg"
                    width="560"
                    height="314"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="dealer-colum-left dealer-head-mobile">
              <div className="creative-your-free">
                <h1>
                  Create your Free
                  <br /> Dealership Account
                </h1>
                <h2>
                  Watch our explainer video to see how you the dealer can
                  <br /> boost your sales and attract new buyers by selling
                  directly
                  <br /> on Finance That and let us take care of financing!
                </h2>
              </div>

              <div className="register-now-button">
                <Link to="/register/dealer-signup">Register now</Link>
                {/* <button
                  className="watchvideo"
                  onClick={state.webStart ? playVideo : pauseVideo}
                >
                  Watch Video <span></span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DealerHowItsWork;
