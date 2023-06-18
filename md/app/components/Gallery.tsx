import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { v4 } from 'uuid';
import i18n from 'i18next';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
interface GalleryProps {
  galleryImages: string[];
}

export default function Gallery({ galleryImages = [] }: GalleryProps) {
  const [language, setLanguage] = useState(i18n.language);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
    rtl: i18n.language === "ar" ? true : false
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: '10px',
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 3,
        },
      },
    ],
  };

  if (galleryImages.length === 0) {
    galleryImages = ['/images/empty.jpg'];
  }
  
  return (
    <div className="flex overflow-hidden gallery-slider-wrapper" data-lang={language}>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => (setSlider1(slider))}
        className="order-1 w-10/12"
        style={{ direction: i18n.language === "ar" ? 'rtl' : 'ltr' }}
      >
        {galleryImages.map(slide => (
          <div className="slick-slide" key={v4()}>
            <img
              className="slick-slide-image"
              src={`${slide}`}
            />
          </div>
        ))}
      </Slider>
      <div className="w-2/12 mr-2 gallery-thumbnail-slider-wrap max-h-[600px]">
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={slider => (setSlider2(slider))}
        >
          {galleryImages.map(slide => (
            <div className="slick-slide" key={v4()}>
              <img
                className="slick-slide-image"
                src={`${slide}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}