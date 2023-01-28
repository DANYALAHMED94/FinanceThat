import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";
import ListingCard from "./listingCard";
export default function ListingTabletView(props) {
  const [data, setData] = useState("");

  useEffect(() => {

    console.log(props.dataArray?.length, "dataArray");
    if (props.dataArray) {
      console.log(props.dataArray.length, "data");
      let mainDataArray = [];
      for (let [key, value] of Object.entries(props.dataArray)) {
        if (key % 4 === 0) {
          mainDataArray = [...mainDataArray, [value]];
        } else {
          const lastItem = mainDataArray[mainDataArray.length - 1];
          console.log(lastItem, props.dataArray?.length, " Last ITEM");
          lastItem.push(value);
          mainDataArray.pop();
          mainDataArray.push(lastItem);
        }
      }
      console.log(mainDataArray, "formatedData");
      setData(mainDataArray);
    }

    return () => {};
  }, [props.dataArray]);

  const options = {
    loop: false,
    rewind: true,
    margin: 20,
    items: 1,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    thumbs: true,
    thumbImage: true,
    lazyLoad: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      991: {
        items: 1,
        nav: true,
        loop: false,
      },
      1200: {
        items: 1,
        nav: true,
        loop: false,
      },
    },
  };

  return (
    <div className="sliderWrapper">
      {data?.length > 0 && (
        <OwlCarousel options={options}>
          {data?.map((item, index) => {
            console.log(item, "subIte,");
            return (
              <div key={index} className="mainViewFlex ">
                {item?.map((subItem, subIndex) => {
                  return (
                    <ListingCard key={subIndex} data={subItem} {...props} />
                  );
                })}
              </div>
            );
          })}
        </OwlCarousel>
      )}
    </div>
  );
}
