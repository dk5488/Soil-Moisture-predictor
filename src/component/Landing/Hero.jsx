import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  "Dummy Review 1",
  "Dummy Review 2",
  "Dummy Review 3",
  "Dummy Review 4",
  "Dummy Review 5",
  "Dummy Review 6",

  // Add more testimonials as needed
];

const Hero = () => {
  const sliderSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
  };

  return (
    <section className="relative flex flex-col items-start bg-gray-50 text-black p-12 min-h-screen w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a51b6ef1413d84eb7729db04f357be7b2a96a295c8f4bd573814956d46e4a5c7"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="relative z-10 flex flex-col items-start">
        <h1 className="text-4xl mb-6">
          Monitor and Enhance Crop Health with Technology
        </h1>
        <p className="text-lg mb-8 text-left">
          Using Raspberry Pi to Improve Farming Efficiency, our platform offers
          real-time soil monitoring,
          <br /> precise moisture level analysis, and actionable insights to
          help farmers make informed decisions.
          <br /> By leveraging cutting-edge technology, we aim to optimize
          resource use, increase crop yields,
          <br /> and reduce overall farming costs.
        </p>
        <div className="flex gap-6 mb-8">
          <Link
            to="/dataCollection"
            className="bg-neutral-300 px-6 py-3 rounded-2xl text-black"
          >
            Get Started
          </Link>
          <Link
            to="/how-it-works"
            className="bg-neutral-300 px-6 py-3 rounded-2xl text-black"
          >
            Learn More
          </Link>
        </div>

        {/* Testimonial Slider */}
        <div className="relative mt-16 w-full flex items-center justify-center translate-x-72 translate-y-20">
          <div className="w-full max-w-3xl bg-gray-200 bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-2xl mb-4 text-center">Review From Farmers</h2>
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 text-center">
                  <p className="text-lg italic">"{testimonial}"</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
