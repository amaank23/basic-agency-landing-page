import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { use, useRef } from "react";

const FixedMenuCard = ({ imgUrl }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const contentTextRef = useRef(null);
  const buttonRef = useRef(null);

  const contentContainer = useRef(null);
  useGSAP(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const content = contentRef.current;
    gsap.set(img, { scale: 1.1 });
    gsap.set(contentContainer.current, { y: -20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(img, { scale: 1, duration: 0.2, ease: "expo.inOut" })
      .to(content, { y: -200, duration: 0.8, ease: "expo.inOut" }, "<")
      .to(
        contentContainer.current,
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    const handleContainerHover = () => {
      tl.play();
    };

    const handleContainerOut = () => {
      tl.reverse();
    };

    container.addEventListener("mouseenter", handleContainerHover);
    container.addEventListener("mouseleave", handleContainerOut);

    return () => {
      container.removeEventListener("mouseenter", handleContainerHover);
      container.removeEventListener("mouseleave", handleContainerOut);
    };
  });
  return (
    <div
      className="w-[440px] h-[560px] px-1 grow-0 shink-0 basis-[440px] relative"
      ref={containerRef}
    >
      <div className="h-[325px] w-full overflow-hidden">
        <img
          src={imgUrl}
          alt=""
          className="object-cover w-full h-full transition"
          ref={imgRef}
        />
      </div>
      <div>
        <div
          ref={contentRef}
          className="absolute left-0 h-[15rem] bottom-0  w-full bg-[#252422] p-6"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h4 className="text-[#f9cdcd] text-[28px] font-medium">
                B/D JAMS
              </h4>
              <h5 className="text-[#f9cdcd]">IT'S A VIBE</h5>
            </div>
            <h4 className="text-[#f9cdcd] text-[28px] font-medium">2022</h4>
          </div>
          <div className="mt-6" ref={contentContainer}>
            <p className="text-[#f9cdcd] font-medium mb-6" ref={contentTextRef}>
              A weekly-ish playlist curated by the employees @ BASIC/DEPT
            </p>
            <button
              className="text-[#f9cdcd] font-bold underline"
              ref={buttonRef}
            >
              Visit the Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedMenuCard;
