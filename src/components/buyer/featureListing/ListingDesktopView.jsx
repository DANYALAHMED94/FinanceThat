import React from "react";
import ListingCard from "./listingCard";

export default function ListingDesktopView(props) {
  const data =
    props.dataArray?.length > 9
      ? props.dataArray?.slice(0, 10)
      : props.dataArray;
  return (
    <div className="centerFlex">
      <div className="mainViewFlex">
        {data.map((data, index) => {
          return (
            <div key={index}>
              <ListingCard data={data} dataIndex={index} props={props} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
