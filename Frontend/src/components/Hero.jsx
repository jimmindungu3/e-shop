import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto hidden md:flex pt-4 mb-6">
      {/* Left Column: Categories */}
      <div className="w-1/4">
        {[
          {
            title: "Electronics",
            items: "Fridges, Electric Kettle, Blender, TV, Speakers",
          },
          {
            title: "Fashion & Style",
            items: "Shoes, T-Shirts, Watches, Sunglasses, Bags",
          },
          {
            title: "Home & Kitchen",
            items: "Cookware, Dishes, Blenders, Curtains, Lamps",
          },
          {
            title: "Sports & Fitness",
            items: "Dumbbells, Yoga Mats, Treadmills, Cycling Gear",
          },
          {
            title: "Toys & Games",
            items: "Board Games, Dolls, Action Figures, Puzzles",
          },
          {
            title: "Beauty & Health",
            items: "Makeup, Skincare, Perfumes, Supplements",
          },
          {
            title: "Automotive",
            items: "Car Covers, Engine Oil, Air Fresheners, Tools",
          },
          {
            title: "Office Supplies",
            items: "Desks, Chairs, Printers, Notebooks, Whiteboards",
          },
        ].map((category, index) => (
          <div
            key={index}
            className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
          >
            <h3 className="font-medium">{category.title}</h3>
            <p className="text-sm text-gray-600">{category.items}</p>
          </div>
        ))}
      </div>

      {/* Right Column: Image Slider */}
      <div className="w-3/4 ml-4 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3500 }}
          loop
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[490px]"
        >
          {[1, 2, 3].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`https://fakeimg.pl/800x490/fafafa/828282?text=Slide+${num}`}
                alt={`Slide ${num}`}
                className="w-full h-full object-cover border border-gray-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
