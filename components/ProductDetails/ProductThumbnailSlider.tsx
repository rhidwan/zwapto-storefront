"use client";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import "./ProductDetail.css";
import Image from "next/image";

const ProductThumbnailSlider = ({ images }: { images: any }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <section className="flex gap-8 h-full w-[87%]">
      <div className="w-[20%]">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={"vertical"}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          // style={{
          //   height: "80px",
          // }}
          className="mySwiper"
        >
          {images?.map((im: any) => (
            <SwiperSlide key={im.url}>
              <Image
                src={im.url}
                width={500}
                height={700}
                className="w-full h-full object-cover rounded-lg"
                alt="listing Image"
              />
            </SwiperSlide>
          ))}

          {/* <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide> */}
        </Swiper>
      </div>
      <div className="w-[80%]">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            height: "500px",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-full"
        >
          {images?.map((im: any) => (
            <SwiperSlide key={im.url} className="w-full">
              <Image
                src={im.url}
                width={1000}
                height={700}
                className="w-full h-full object-cover rounded-lg"
                alt="listing Image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductThumbnailSlider;
