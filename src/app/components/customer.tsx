
"use client";
import React from "react";
import ScrollingTestimonials from "./animata/container/scrolling-testimonials";




export default function Customer() {
 
  return (
    <div className="pb-20">
      <div>
        <h2 className="text-4xl font-bold text-center my-10">Our products</h2>
      </div>
      <ScrollingTestimonials
        data={[
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image: "image/products.png",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image: "image/products.png",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image: "image/products.png",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image: "image/products.png",
            name: "Đông Y ÔNG BỤT",
          },
        ]}
      />
    </div>
  );
}

