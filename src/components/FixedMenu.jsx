import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import React, { useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import FixedMenuCard from "./FixedMenuCard";

gsap.registerPlugin(Draggable, InertiaPlugin);

const FixedMenu = ({ open, toggle }) => {
  const menuRef = useRef(null);
  const overlay = useRef(null);
  const draggableContainer = useRef(null);
  const mouseFollowerRef = useRef(null);
  const isMouseDown = useRef(false);

  useGSAP(() => {
    if (open) {
      Draggable.create(draggableContainer.current, {
        type: "x",
        inertia: true,
        bounds: {
          minX: -(
            draggableContainer.current.scrollWidth -
            window.innerWidth +
            80
          ),
          maxX: 0,
        },
      });

      gsap.set(overlay.current, { x: 0 });
      gsap.set(draggableContainer.current, { x: 150 });
      gsap;
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        pointerEvents: "auto",
      })
        .to(
          overlay.current,
          {
            x: "-100%",
            duration: 0.8,
            ease: "power4.in",
            pointerEvents: "none",
          },
          "<"
        )
        .to(
          draggableContainer.current,
          {
            x: 0,
            duration: 1.5,
            ease: "power2.inOut",
            pointerEvents: "auto",
          },
          "<"
        );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
        pointerEvents: "none",
      });
    }

    const handleMouseMove = (e) => {
      gsap.set(draggableContainer.current, { cursor: "none" });
      // get bounding box of container for accurate positioning
      const rect = draggableContainer.current.getBoundingClientRect();

      // calculate relative x/y inside container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(mouseFollowerRef.current, {
        x: x - 60, // center follower (100px / 2)
        y: y - 60,
        duration: 0.6,
        ease: "power3.ou",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(mouseFollowerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.set(draggableContainer.current, { cursor: "auto" });
      gsap.to(mouseFollowerRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      });
    };

    const handleMouseDown = () => {
      gsap.set(draggableContainer.current, { cursor: "none" });

      // isMouseDown.current = true;
      gsap.to(mouseFollowerRef.current, {
        scale: 0.5,
        duration: 0.3,
      });
    };

    const handleMouseUp = () => {
      gsap.set(draggableContainer.current, { cursor: "none" });
      console.log("Mouse Up");
      // isMouseDown.current = false;
      gsap.to(mouseFollowerRef.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Attach listeners
    const container = draggableContainer.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="fixed w-full h-screen top-0 left-0 fixed-menu bg-[#252422] z-10 opacity-0"
    >
      <div className="relative">
        <div className="flex justify-between items-center   px-20 py-[50px] ">
          <div className="flex items-start gap-20">
            <div>
              <span className="text-[40px] text-[#f9cdcd] leading-5">•</span>
            </div>
            <div className="flex flex-col">
              <p className="text-[#f9cdcd] text-sm font-medium">
                (5) INTERNAL WORKS
              </p>
              <p className="text-[#f9cdcd] text-sm font-medium">
                25 c/o BASIC/DEPT
              </p>
            </div>
            <p className="text-[#f9cdcd] text-sm font-medium">
              A COLLECTION OF INTERNAL PROJECT AND INITIATIVE UNDER THE
              BASIC/DEPT BRAND
            </p>
          </div>
          <button
            className="cursor-pointer absolute right-20 top-[50px] z-30"
            onClick={toggle}
          >
            <ImCancelCircle color="#f9cdcd" size={40} />
          </button>
        </div>
        <div
          className="absolute w-full h-full bg-[#252422] top-0 left-0 z-20"
          ref={overlay}
        />
        <div className="overflow-hidden">
          <div
            className="flex mt-[40px] gap-1 flex-nowrap w-max pl-20 relative"
            ref={draggableContainer}
          >
            <div
              ref={mouseFollowerRef}
              className="absolute top-0 left-0 w-[120px] h-[120px] bg-[#f9cdcd] rounded-full z-50"
            ></div>
            <FixedMenuCard imgUrl={"/images/fixed-1.webp"} />
            <FixedMenuCard imgUrl={"/images/fixed-2.webp"} />
            <FixedMenuCard imgUrl={"/images/fixed-3.webp"} />
            <FixedMenuCard imgUrl={"/images/fixed-4.webp"} />
            <FixedMenuCard imgUrl={"/images/fixed-5.webp"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedMenu;
