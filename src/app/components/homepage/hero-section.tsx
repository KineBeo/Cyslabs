import React, { useMemo } from 'react';
import { HeroSection } from "@/src/service/strapi/interface/section";
import { Tag } from "@/src/service/strapi/interface/content";
import { Omit } from "@react-spring/web";
import dynamic from 'next/dynamic';

const MacbookScene = dynamic(() => import('../mac3D/MacbookScene'), {
    ssr: false,
    loading: () => <div className="bg-black h-screen" />
});

// const SwipeButton = dynamic(() => import('../animata/button/swipe-button'), {
//     ssr: false,
//     loading: () => <div className="bg-black h-screen" />
// });

const AuroraBackground = dynamic(() => import('../ui/aurora-background'), {
    ssr: false,
    loading: () => <div className="bg-black h-screen" />
});

// Optimized text splitting function
const splitTextToArrays = (text: string) => {
    const [part1, part2] = text.split(" | ");

    const toWordArray = (str: string) =>
        str.split(" ").map((word) => ({ text: word }));

    return {
        words1: toWordArray(part1 || ''),
        words2: toWordArray(part2 || '')
    };
};

// Improve tag conversion function
const formatTagsString = (tags: Tag[]) =>
    tags.map((tag) => `#${tag.text}`).join(" ");

interface HeroSectionProps {
    props?: Omit<HeroSection, "__component">
}

export default function HeroSectionComponent({ props }: HeroSectionProps) {
    // Default props with fallback
    const heroProps = useMemo(() => ({
        title: "The Coolest Team Of | CyberSecurity Has Arrived",
        description: "Cyslabs is a cybersecurity squad keeping data and privacy safe",
        tags: [
            { text: "StaySecure", url: null },
            { text: "CyberSquad", url: null },
        ]
    }), []);

    // Memoize split text and tags
    const { words1, words2 } = useMemo(() =>
        splitTextToArrays(props?.title || heroProps.title),
        [props?.title, heroProps.title]
    );

    const tagString = useMemo(() =>
        formatTagsString(props?.tags || heroProps.tags),
        [props?.tags, heroProps.tags]
    );

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AuroraBackground>
                <div className="tablet:top-48 desktop:top-48 laptop:top-56 mini-laptop:top-52 mobile:top-44 z-10 absolute">
                    <div className="desktop:justify-star laptop:justify-start mobile:justify-center tablet:justify-center font-bold text-foreground mobile:text-3xl tablet:text-3xl mini-laptop:text-5xl laptop:text-6xl desktop:text-8xl select-none">
                        {words1.map((word) => word.text).join(" ")}
                    </div>
                    <div className="desktop:ml-52 desktop:mt-6 laptop:ml-32 mobile:justify-center tablet:justify-center mobile:mt-2 font-bold text-foreground mobile:text-2xl tablet:text-3xl mini-laptop:text-5xl laptop:text-6xl desktop:text-8xl select-none">
                        {words2.map((word) => word.text).join(" ")}
                    </div>
                </div>
                <MacbookScene />
            </AuroraBackground>
            <div className="tablet:top-80 desktop:top-96 laptop:top-80 mini-laptop:top-80 mobile:top-72 z-20 absolute flex justify-center w-full">
                <div className="desktop:top-16 laptop:top-16 desktop:right-16 laptop:right-12 z-20 absolute">
                    <div className="desktop:justify-start laptop:justify-start mobile:justify-center font-semibold text-black dark:text-white mobile:text-lg tablet:text-xl text-2xl mini-laptop:text-2xl laptop:text-3xl desktop:text-3xl mobile:text-center mobile">
                        <span className="text-blue-300 mobile:text-xl mini-laptop:text-2xl tablet:text-2xl laptop:text-3xl desktop:text-4xl underline">
                            Cyslabs
                        </span> is a cybersecurity squad keeping
                    </div>
                    <div className="desktop:justify-start laptop:justify-start mobile:justify-center mobile:px-2 font-semibold text-black dark:text-white mobile:text-lg tablet:text-xl text-2xl mini-laptop:text-2xl laptop:text-3xl desktop:text-3xl mobile:text-center">
                        data and privacy safe <br /> {tagString}
                    </div>

                    {/* Button */}
                    {/* <div className="flex flex-row mini-laptop:justify-center mobile:justify-center tablet:justify-center gap-4 mt-4 font-semibold">
                        <SwipeButton
                            firstText="Join now"
                            secondText="Sign up"
                            className="min-w-[150px]"
                            firstClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
                            secondClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
                        />
                        <SwipeButton
                            firstText="Contact us"
                            secondText="Contact us"
                            className="min-w-[150px]"
                            firstClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
                            secondClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}