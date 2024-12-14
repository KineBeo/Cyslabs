import React from "react";
import Marquee from "@/src/app/components/animata/container/marquee";
// Định nghĩa interface cho dữ liệu testimonial
interface Testimonial {
  name: string;
  image: string;
  description: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

// Component hiển thị từng testimonial
function TestimonialCard({
  testimonial: { image, name, description },
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className="flex h-44 w-96 overflow-hidden rounded-xl border bg-background dark:border-zinc-700"
      key={name}
    >
      <div className="relative h-full w-32 flex-shrink-0 overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="px-4 py-2">
        <span className="block text-lg font-bold text-foreground">{name}</span>
        <span className="-mt-1 mb-1 block text-sm font-medium leading-loose text-muted-foreground">
          Founder of Cyslabs
        </span>
        <span className="block text-sm text-foreground">{description} </span>
      </div>
    </div>
  );
}

// Component cuộn testimonials
export function ScrollingTestimonials({ data }: TestimonialProps) {
  return (
    <div className="w-full overflow-hidden">
      <Marquee className="[--duration:25s]" pauseOnHover applyMask={false}>
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </Marquee>
    </div>
  );
}

// Component Member chứa dữ liệu testimonials
const Member = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Nguyễn Văn A",
      image: "/img/hi.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
    {
      name: "Nguyễn Văn A",
      image: "/img/hi.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
    {
      name: "Nguyễn Văn A",
      image: "/img/hi.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
    {
      name: "Nguyễn Văn A",
      image: "/img/hi.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
    {
      name: "Nguyễn Văn A",
      image: "/img/hi.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
  ];

  return (
    <div className="px-4 
         desktop:px-20 
         desktop:mt-0
         tablet:pt-0
         tablet:mt-52
         mobile:pt-96 
         mobile:mt-72 
         mini-laptop:pt-0
         mini-laptop:mt-2
         laptop:pt-1
         laptop:mt-1 ">
      <div className="text-center my-8">
        <h2 className="text-4xl font-bold text-center my-12">Meet the Cyslabs team</h2>
      </div>     
      <ScrollingTestimonials data={testimonials} />
    </div>
  );
};

export default Member;