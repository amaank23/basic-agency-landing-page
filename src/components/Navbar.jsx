import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    gsap.set(".dot", { x: 0 });

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      gsap.set(link, { "--underline-transformation": "-100%" });
      link.addEventListener("mouseenter", () => {
        gsap.fromTo(
          link,
          { "--underline-transformation": "-100%" },
          {
            "--underline-transformation": "0",
            duration: 0.4,
            ease: "power3.inOut",
          }
        );
      });
      link.addEventListener("mouseleave", () => {
        gsap.fromTo(
          link,
          {
            "--underline-transformation": "0",
          },
          {
            "--underline-transformation": "100%",
            duration: 0.4,
            ease: "power3.inOut",
          }
        );
      });
    });
  });

  function onHoverThreeDots() {
    gsap.to(".dot:nth-child(1)", { x: -4, duration: 0.2 });
    gsap.to(".dot:nth-child(3)", { x: 4, duration: 0.2 });
  }

  function onHoverOutThreeDots() {
    gsap.to(".dot", { x: 0, duration: 0.2 });
  }

  return (
    <nav className="flex items-center justify-between px-20 py-[50px]">
      <a href="#" className="font-bold text-[1.5rem]">
        BASIC/DEPT
      </a>
      <ul className="flex items-center gap-12 menu">
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          WORK
        </li>
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          ABOUT
        </li>
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          NEWS
        </li>
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          THINKING
        </li>
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          CAREERS
        </li>
        <li className="text-sm cursor-pointer relative overflow-hidden nav-link">
          CONTACT
        </li>
      </ul>
      <button
        className="flex items-center cursor-pointer relative three-dots"
        onMouseOver={onHoverThreeDots}
        onMouseLeave={onHoverOutThreeDots}
      >
        <span className="text-[20px] dot">•</span>
        <span className="text-[20px] dot">•</span>
        <span className="text-[20px] dot">•</span>
      </button>
    </nav>
  );
};

export default Navbar;
