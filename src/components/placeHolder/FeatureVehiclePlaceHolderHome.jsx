import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const FeatureVehiclePlaceHolderHome = (props) => {
  return (
    <React.Fragment>
      <div className="featuredCard">
        <div>
          <Skeleton
            className="cover"
            style={{
              lineHeight: "27px",
              backgroundColor: "#E0E0E0",
              backgroundImage:
                "linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0",
            }}
          />
        </div>
        <div className="flexBetweenCenter w-100 mt-2">
          <Skeleton
            width="90px"
            style={{
              lineHeight: "15px",
              backgroundColor: "#E0E0E0",
              backgroundImage:
                "linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0",
            }}
          />
          <Skeleton
            width="110px"
            style={{
              lineHeight: "15px",
              backgroundColor: "#E0E0E0",
              backgroundImage:
                "linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0",
            }}
          />
        </div>
        <div className="flexBetweenCenter w-100 my-2">
          <Skeleton
            width="130px"
            style={{
              lineHeight: "15px",
              backgroundColor: "#E0E0E0",
              backgroundImage:
                "linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0",
            }}
          />
          <div className="flexCenter">
            <Skeleton
              width="100px"
              style={{
                lineHeight: "15px",
                backgroundColor: "#E0E0E0",
                backgroundImage:
                  "linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0",
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FeatureVehiclePlaceHolderHome;
