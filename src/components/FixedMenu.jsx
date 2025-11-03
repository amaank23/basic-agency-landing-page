import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import React, { useRef } from "react";
import { ImCancelCircle } from "react-icons/im";

gsap.registerPlugin(Draggable, InertiaPlugin);

const FixedMenu = ({ open, toggle }) => {
  const menuRef = useRef(null);
  const overlay = useRef(null);
  const draggableContainer = useRef(null);

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
      gsap.set(draggableContainer.current, { x: 100 });
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
            duration: 0.8,
            ease: "power4.in",
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
            className="flex mt-[40px] gap-1 flex-nowrap w-max pl-20"
            ref={draggableContainer}
          >
            <div className="w-[440px] px-1 grow-0 shink-0 basis-[440px]">
              <div className="h-[325px] w-full overflow-hidden">
                <img
                  src="/images/fixed-1.webp"
                  alt=""
                  className="object-cover w-full h-full scale-[1.1] hover:scale-[1] transition"
                />
              </div>
              <div></div>
            </div>
            <div className="w-[440px] h-[400px] bg-amber-300 grow-0 shink-0 basis-[440px]"></div>
            <div className="w-[440px] h-[400px] bg-amber-300 grow-0 shink-0 basis-[440px]"></div>
            <div className="w-[440px] h-[400px] bg-amber-300 grow-0 shink-0 basis-[440px]"></div>
            <div className="w-[440px] h-[400px] bg-amber-300 grow-0 shink-0 basis-[440px]"></div>
            <div className="w-[440px] h-[400px] bg-amber-300 grow-0 shink-0 basis-[440px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedMenu;
