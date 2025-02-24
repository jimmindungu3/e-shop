import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slideImages = [
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1670274609267-202ec99f8620?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxsZXJ5fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1604527039309-8044c298ba46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5pa29uJTIwY2FtZXJhfGVufDB8fDB8fHww",
  ];

  return (
    <div className="max-w-7xl mx-auto hidden md:flex pt-4 mb-6">
      {/* Left Column: Categories */}
      <div className="w-1/4">
        {[
          {
            title: "Computing",
            items: "Laptops, Keyboards, Monitors, External Drives, Software",
          },
          {
            title: "Gaming",
            items:
              "Consoles, Gaming Laptops, Controllers, VR Headsets, Accessories",
          },
          {
            title: "Gadgets & Accessories",
            items:
              "Smartwatches, Wireless Earbuds, Power Banks, Cameras",
          },
          {
            title: "Beauty & Health",
            items: "Makeup, Skincare, Perfumes, Supplements",
          },
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
          // {
          //   title: "Toys & Games",
          //   items: "Board Games, Dolls, Action Figures, Puzzles",
          // },
          {
            title: "Office Supplies",
            items: "Desks, Chairs, Printers, Notebooks, Whiteboards",
          },
        ].map((category, index) => (
          <div
            key={index}
            className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
          >
            <h3 className="font-semibold text-gray-900">{category.title}</h3>
            <p className="text-xs text-gray-500 ">{category.items}</p>
          </div>
        ))}
      </div>

      {/* Right Column: Image Slider */}
      <div className="w-3/4 ml-4 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 4000 }}
          loop
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[490px]"
        >
          {slideImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover border rounded-md border-gray-100 mt-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;


// 