
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
            image:
              "https://plus.unsplash.com/premium_photo-1717529137991-510ad3be15d9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image:
              "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image:
              "https://images.unsplash.com/photo-1560298803-1d998f6b5249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Đông Y ÔNG BỤT",
          },
          {
            description:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
            image:
              "https://images.unsplash.com/photo-1518287010730-4386819bf3e9?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Đông Y ÔNG BỤT",
          },
        ]}
      />
    </div>
  );
}

