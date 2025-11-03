import { useEffect, useRef, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./components/Navbar";

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1.2,
      });

      return () => {
        if (scroll) scroll.destroy();
      };
    }
  }, []);
  return (
    <div ref={scrollRef} data-scroll-container>
      <Navbar />
    </div>
  );
}

export default App;
