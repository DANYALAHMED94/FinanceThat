import React, { useState, useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel2";
import ListingCard from "./listingCard";
export default function ListingTabletView(props) {
  const [data, setData] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    if (props.dataArray) {
      setData(props.dataArray);
    }

    return () => {};
  }, [props.dataArray]);

  const onNext = () => {
    sliderRef.current.next();
  };

  const onPrev = () => {
    sliderRef.current.prev();
  };

  const options = {
    loop: true,
    margin: 20,
    autoplay: true,
    items: 1,
    nav: false,
    thumbs: true,
    thumbImage: true,
    dots: false,
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
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
    },
  };

  return (
    <div className="sliderWrapper">
      {data?.length > 0 && (
        <OwlCarousel ref={sliderRef} options={options}>
          {data?.map((item, index) => {
            return <ListingCard key={index} data={item} {...props} />;
          })}
        </OwlCarousel>
      )}

      <div className="action">
        <div className="sliderFooter">
          <div>
            <button onClick={onPrev}>
              <i class="fa fa-angle-left"></i>
            </button>
            <button onClick={onNext} className="ml-3">
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
        <div className="footerText mb-4">Swipe left or right to view more</div>
      </div>
    </div>
  );
}
