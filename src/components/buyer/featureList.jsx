import React, { memo, useState } from "react";
import { Link } from "react-router-dom"
import AutomotiveListing from "./featureListing/AutomotiveListing";
import FeaturListingButtons from "./featureListing/FeaturListingButtons";
import "../../assets/css/featureListing.css";

const FeatureList = (props) => {
  const [category, setCategory] = useState("Powersport");

  // main return
  return (
    <>
      <section className="hp-featured-vehicle">
        <h2> Featured Vehicles </h2>
        <div className="feature-list-tabs">
          <FeaturListingButtons category={category} setCatgory={setCategory} />
        </div>
        <div className="tab-content py-3 " id="nav-tabContent">
          <div
            className={"tab-pane fade show active"}
            id="nav-auto"
            role="tabpanel"
            aria-labelledby="nav-auto-tab"
          >
            <div className=" feature-slider-main px-sm-0">
              <AutomotiveListing
                lng={props.lng}
                lat={props.lat}
                category={category}
              />
            </div>
          </div>
        </div>
        <Link to="/Ad-post/list" className="btn btn-primary see-all">
          Browse Vehicles
        </Link>
      </section>
    </>
  );
};

export default memo(FeatureList)
