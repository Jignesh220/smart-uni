"use client"
import React, { useEffect, useRef, ReactNode } from "react";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";
import Footer from "./Footer";

interface SmoothScrollbarProps {
  children: ReactNode;
}

const SmoothScrollbar: React.FC<SmoothScrollbarProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scroll } = useLocomotiveScroll();

  //   useEffect(() => {
  //     if (containerRef.current) {
  //       scroll.setContainer(containerRef.current);
  //       scroll.update();
  //     }
  //   }, [scroll]);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        // ... all available Locomotive Scroll instance options
      }}
      watch={
        [
          //..all the dependencies you want to watch to update the scroll.
          //  Basicaly, you would want to watch page/location changes
          //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
        ]
      }
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        {children}
      </main>
    </LocomotiveScrollProvider>
  );
};

export default SmoothScrollbar;
