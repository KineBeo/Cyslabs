import React from "react";
import Marquee from "@/src/app/components/animata/container/marquee";
import RandomStarBackground from "../ui/random-start-background";
import { Employee } from "@/src/service/strapi/interface/collection";
import { Team } from "@/src/service/strapi/interface/section";
import Image from "next/image";
// Định nghĩa interface cho dữ liệu testimonial

interface TestimonialProps {
  data: Employee[];
}

// Component hiển thị từng testimonial
function TestimonialCard({
  testimonial: { avatar, name, background, position },
}: {
  testimonial: Employee;
}) {
  return (
    <div
      className="flex dark:border-zinc-700 bg-background border rounded-xl max-w-lg h-60 overflow-hidden"
      key={name}
    >
      <div className="relative flex-shrink-0 w-48 h-full overflow-hidden">
        <Image src={avatar?.formats?.thumbnail?.url || "/img/hi.jpg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="px-4 py-2">
        <span className="block font-bold text-foreground text-lg">{name}</span>
        <span className="block -mt-1 mb-1 font-medium text-muted-foreground text-sm leading-loose">
          {position}
        </span>
        <span className="block text-foreground text-sm">{background} </span>
      </div>
    </div>

  );
}

// Component cuộn testimonials
export function ScrollingTestimonials({ data }: TestimonialProps) {
  return (
    <div className="w-full overflow-hidden">
      <Marquee className="flex justify-center items-center [--duration:25s]" pauseOnHover={false} applyMask={false}>
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </Marquee>
    </div>
  );
}

interface MemberProps {
  props: Team;
}

// Component Member chứa dữ liệu testimonials
const Member = ({ props }: MemberProps) => {
  return (
    <RandomStarBackground id="member-star flex items-center justify-center">
      <div className="desktop:mt-0 desktop:pt-0 laptop:mt-1 laptop:pt-1 mini-laptop:mt-2 mini-laptop:pt-0 mt-0 mobile:mt-60 tablet:mt-60 px-4 -pt-8 mobile:pt-96 tablet:pt-0"
      >
        <div className="my-4 text-center">
          <p className="my-12 font-bold text-4xl text-center text-white desktop:text-7xl">{props.title || "Meet the Cyslabs"}</p>
        </div>
        <ScrollingTestimonials data={props.employees} />
      </div>
    </RandomStarBackground>
  );
};

export default Member;