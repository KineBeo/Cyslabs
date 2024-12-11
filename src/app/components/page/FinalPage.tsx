import WaveReveal from "../animata/text/wave-reveal";
import { BoxesCore } from "../ui/background-boxes";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function FinalPage() {
    return (
        <div className="w-full h-full overflow-hidden relative">
            <BoxesCore />
            <div className="absolute z-10 flex flex-col justify-center w-full
        mobile:top-48
        tablet:top-40
        mini-laptop:top-40 mini-laptop:left-16
        laptop:top-40 laptop:left-20
        desktop:top-28 desktop:left-28 ">
                <TextGenerateEffect words="Join Now" />
                <TextGenerateEffect words="And see the power of"
                    className="
            desktop:ml-12
            laptop:ml-8
            mini-laptop:ml-8
            "
                />
                <TextGenerateEffect words="Cybersecurity !"
                    className="
            desktop:ml-24
            laptop:ml-16
            mini-laptop:ml-16
            "
                />
            </div>
            <div className="absolute z-20 flex 
        mobile:px-8 mobile:top-96
        tablet:px-16 tablet:top-96
        mini-laptop:bottom-72 mini-laptop:left-96 mini-laptop:pr-8
        laptop:bottom-72 laptop:left-96 laptop:pr-12
        desktop:bottom-48 desktop:left-[50%] desktop:pr-24  
        "
            >
                <WaveReveal mode="word" direction="up"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    className="font-semibold text-black dark:text-white
          mobile:text-xl mobile:justify-center mobile:text-justify
          tablet:text-xl
          mini-laptop:text-xl mini-laptop:justify-normal
          laptop:text-xl laptop:justify-normal
          desktop:text-2xl desktop:justify-normal
          "
                />
            </div>
        </div>
    );
}