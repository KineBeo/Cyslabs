import WaveReveal from "../animata/text/wave-reveal";
import { BoxesCore } from "../ui/background-boxes";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function FinalPage() {
    return (
        <div className="w-full h-full overflow-hidden relative">
            <BoxesCore />
            <div className="absolute z-10 flex flex-col w-full
        mobile:top-48
        tablet:top-40
        mini-laptop:top-40 mini-laptop:left-20
        laptop:top-40 laptop:left-20
        desktop:top-40 desktop:left-28 ">
                <WaveReveal mode="word" direction="up" text="Join Now"
                    className="
                    desktop:text-7xl
                    laptop:text-6xl
                    mini-laptop:text-5xl
                    tablet:text-4xl
                    mobile:text-3xl
                "
                />
                <WaveReveal mode="word" direction="up" text="And see the power of"
                    className="
                    desktop:text-7xl
                    laptop:text-6xl
                    mini-laptop:text-5xl
                    tablet:text-4xl
                    mobile:text-3xl
            desktop:ml-12
            laptop:ml-8
            mini-laptop:ml-8
            "
                />
                <WaveReveal mode="word" direction="up" text="Cybersecurity !"
                    className="
                    desktop:text-7xl
                    laptop:text-6xl
                    mini-laptop:text-5xl
                    tablet:text-4xl
                    mobile:text-3xl
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
                    text="The DeSo blockchain is supported by the DeSo Foundation, whose broad mission is to support the decentralization of social media."
                    className="font-semibold text-black dark:text-white
                    mobile:text-xl mobile:justify-center mobile:text-justify
                    tablet:text-xl
                    mini-laptop:text-xl mini-laptop:justify-normal
                    laptop:text-xl laptop:justify-normal
                    desktop:text-2xl desktop:justify-normal
          "
                />
            </div>
            <div className="absolute z-20 flex 
                            mobile:px-8 mobile:top-[120rem]
                            tablet:px-16 tablet:top-[120rem]
                            mini-laptop:bottom-40 mini-laptop:left-96 mini-laptop:pr-8
                            laptop:bottom-48 laptop:left-96 laptop:pr-12
                            desktop:bottom-24 desktop:left-[50%] desktop:pr-24  
        "
            >
                <WaveReveal mode="word" direction="up"
                    text="The foundation is led by crypto veteran Nader Al-Naji (@nader, @nadertheory), with a $200 million treasury behind it to support its mission."
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