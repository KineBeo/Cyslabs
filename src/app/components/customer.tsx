"use client";
import React from "react";
import ScrollingTestimonials from "./animata/container/scrolling-testimonials";

// export default function Customer() {

//   return (
//     <div className="pb-20">
//       <div>
//         <h2 className="text-4xl font-bold text-center my-10">Our products</h2>
//       </div>
//       <ScrollingTestimonials
//         data={[
//           {
//             description:
//               "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
//             image: "image/products.png",
//             name: "Đông Y ÔNG BỤT",
//           },
//           {
//             description:
//               "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
//             image: "image/products.png",
//             name: "Đông Y ÔNG BỤT",
//           },
//           {
//             description:
//               "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
//             image: "image/products.png",
//             name: "Đông Y ÔNG BỤT",
//           },
//           {
//             description:
//               "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
//             image: "image/products.png",
//             name: "Đông Y ÔNG BỤT",
//           },
//         ]}
//       />
//     </div>
//   );
// }

export default function Customer() {
  return (
    <div className="grid grid-cols-5 mobile:grid-cols-1 tablet:grid-cols-1 pb-40">
      <div className="col-span-2">
        <h2 className="text-4xl font-bold text-center my-10">Our products</h2>
      </div>
      {/* product1  */}
      <div className="col-span-3 flex flex-col w-full ">
        <div
          className="mx-20 mobile:mx-4 tablet:mx-4 px-2 py-2 
                    cursor-pointer 
                    relative 
                    transition-all 
                    duration-300 
                    ease-in-out
                    before:absolute 
                    before:inset-0 
                    before:bg-cyan-700 
                    before:origin-bottom 
                    before:scale-y-0 
                    hover:before:scale-y-100 
                    before:transition-transform 
                    before:duration-300 
                    before:z-[-1]"
        >
          <div className="flex justify-between relative z-10">
            <p className="font-bold group-hover:text-white">Đông Y Ông Bụt</p>
            <p className="group-hover:text-white">Website</p>
          </div>
        </div>
        <div className="mx-20 mobile:mx-4 tablet:mx-4  px-2 bg-slate-500 h-0.5"></div>

        {/* product2 */}
        <div
          className="mx-20 mobile:mx-4 tablet:mx-4 px-2 py-2 
                    cursor-pointer 
                    relative 
                    transition-all 
                    duration-300 
                    ease-in-out
                    before:absolute 
                    before:inset-0 
                    before:bg-cyan-700 
                    before:origin-bottom 
                    before:scale-y-0 
                    hover:before:scale-y-100 
                    before:transition-transform 
                    before:duration-300 
                    before:z-[-1]"
        >
          <div className="flex justify-between relative z-10">
            <p className="font-bold group-hover:text-white">Đông Y Ông Bụt</p>
            <p className="group-hover:text-white">Website</p>
          </div>
        </div>
        <div className="mx-20 mobile:mx-4 tablet:mx-4  px-2 bg-slate-500 h-0.5"></div>

        {/* product3  */}
        <div className="mx-20 mobile:mx-4 tablet:mx-4 px-2 py-2 
                    cursor-pointer 
                    relative 
                    transition-all 
                    duration-300 
                    ease-in-out
                    before:absolute 
                    before:inset-0 
                    before:bg-cyan-700 
                    before:origin-bottom 
                    before:scale-y-0 
                    hover:before:scale-y-100 
                    before:transition-transform 
                    before:duration-300 
                    before:z-[-1]"
        >
          <div className="flex justify-between relative z-10">
            <p className="font-bold group-hover:text-white">Đông Y Ông Bụt</p>
            <p className="group-hover:text-white">Website</p>
          </div>
        </div>
        <div className="mx-20 mobile:mx-4 tablet:mx-4  px-2 bg-slate-500 h-0.5"></div>
      </div>
    </div>
  );
}
