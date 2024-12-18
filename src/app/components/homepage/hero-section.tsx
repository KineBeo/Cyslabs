import { HeroSection } from "@/src/service/strapi/interface/section";
import SwipeButton from "../animata/button/swipe-button";
import MacbookScene from "../mac3D/MacbookScene";
import AuroraBackground from "../ui/aurora-background";
import { Tag } from "@/src/service/strapi/interface/content";
import { Omit } from "@react-spring/web";

function splitTextToArrays(text: string) {

    // Tách chuỗi dựa trên dấu |
    const [part1, part2] = text.split(" | ");

    // Hàm helper để chuyển mỗi từ thành một object { text: "..." }
    const toWordArray = (str: string) =>
        str.split(" ").map((word) => ({
            text: word,
        }));

    // Tạo hai mảng kết quả
    const words1 = toWordArray(part1);
    const words2 = toWordArray(part2);

    return { words1, words2 };
}

function convertDescription(text: string, tags: Tag[]) {
    const splitText = text.split(" | ");

    splitText[splitText.length - 1] = splitText[splitText.length - 1] + tags.map((tag) => `#${tag.text}`).join(" ");
}

interface HeroSectionProps { props: Omit<HeroSection, "__component"> }

export default function HeroSectionComponent({ props }: HeroSectionProps) {

    const { words1, words2 } = splitTextToArrays(props.title);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AuroraBackground>
                <div
                    className="desktop:top-48 laptop:top-56 mini-laptop:top-52 mobile:top-44 tablet:top-48 z-10 absolute"
                >
                    <div
                        className="desktop:justify-star laptop:justify-start mobile:justify-center tablet:justify-center font-bold text-foreground mobile:text-3xl tablet:text-3xl mini-laptop:text-5xl laptop:text-6xl desktop:text-8xl"
                    >
                        {words1.map((word) => word.text).join(" ")}
                    </div>
                    <div
                        className="desktop:ml-52 desktop:mt-6 laptop:ml-32 mobile:justify-center tablet:justify-center mobile:mt-2 font-bold text-foreground mobile:text-2xl tablet:text-3xl mini-laptop:text-5xl laptop:text-6xl desktop:text-8xl"
                    >
                        {words2.map((word) => word.text).join(" ")}
                    </div>
                </div>
                <MacbookScene />
            </AuroraBackground>
            <div
                className="desktop:top-96 laptop:top-80 mini-laptop:top-80 mobile:top-72 tablet:top-80 z-20 absolute flex justify-center w-full"
            >
                <div
                    className="desktop:top-16 laptop:top-16 desktop:right-16 laptop:right-12 z-20 absolute"
                >
                    <div
                        className="desktop:justify-start laptop:justify-start mobile:justify-center font-semibold text-2xl text-black mobile:text-lg mini-laptop:text-2xl laptop:text-3xl desktop:text-3xl dark:text-white mobile:text-center tablet:text-xl"
                    >
                        Cyslabs is a cybersecurity squad keeping
                    </div>
                    <div
                        className="desktop:justify-start laptop:justify-start mobile:justify-center font-semibold text-2xl text-black mobile:text-lg tablet:text-xl mini-laptop:text-2xl laptop:text-3xl desktop:text-3xl dark:text-white"
                    >
                        data and privacy safe #StaySecure #CyberSquad
                    </div>
                    <div
                        className="flex flex-row mini-laptop:justify-center mobile:justify-center tablet:justify-center gap-4 mt-4 font-semibold"
                    >
                        <SwipeButton
                            firstText="Join now"
                            secondText="Signup"
                            className="min-w-[150px]"
                            firstClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
                            secondClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
                        />
                        <SwipeButton
                            firstText="Join now"
                            secondText="Signup"
                            className="min-w-[150px]"
                            firstClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
                            secondClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}