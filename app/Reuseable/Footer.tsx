"use client"
import React from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      aria-label="Site Footer"
      className="bg-blue-100 mt-24 my-3 mx-3 rounded-3xl"
    >
      <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }} 
      transition={{
        delay: .3
      }}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <div className="flex gap-3 flex-col">
            <center>
              <SvgIcon />
            </center>
            <div className="text-3xl font-capriola font-bold text-blue-900">
              UniSmart
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-center font-outfit font-bold tracking-wider leading-relaxed text-blue-800 text-opacity-50">
          Welcome to our college website, a comprehensive platform designed to
          support your academic journey, offering subject notes, old exam
          papers, and project guidance. Access well-organized resources, prepare
          for exams effectively, and get step-by-step instructions to excel in
          academic projects. Visit our website today and enrich your learning
          experience.
        </p>

        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/#Category"
              >
                Category
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="#"
              >
                Q&A
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/about"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Mail</span>
              <svg
                enable-background="new 0 0 32 32"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:opacity-75"
              >
                <g id="Gmail">
                  <path
                    d="M28.5,26.5h-25c-1.104,0-2-0.896-2-2v-17c0-1.104,0.896-2,2-2h25c1.104,0,2,0.896,2,2v17   C30.5,25.604,29.604,26.5,28.5,26.5z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M29.64,8.973L16,18.305L2.36,8.973C2.262,8.905,2.177,8.822,2.093,8.738l-0.013,0l17.715,17.716h8.728   c1.088,0,1.978-0.89,1.978-1.977V7.341C30.5,8.019,30.159,8.617,29.64,8.973z"
                    fill="#ECEFF1"
                  />
                  <path
                    d="M30.5,7v17.542c0,1.082-0.877,1.958-1.958,1.958H27V7H30.5z"
                    fill="#FF8A80"
                  />
                  <path
                    d="M1.5,7v17.542c0,1.082,0.877,1.958,1.958,1.958H5V7H1.5z"
                    fill="#FF8A80"
                  />
                  <path
                    d="M28.522,5.364L16,13.932L3.478,5.364C2.39,5.364,1.5,6.254,1.5,7.341c0,0.677,0.341,1.275,0.86,1.631   L16,18.305l13.64-9.333c0.519-0.356,0.86-0.954,0.86-1.631C30.5,6.254,29.61,5.364,28.522,5.364z"
                    fill="#FF8A80"
                  />
                  <path
                    d="M28.5,27h-25C2.122,27,1,25.878,1,24.5v-17C1,7.224,1.224,7,1.5,7S2,7.224,2,7.5v17   C2,25.327,2.673,26,3.5,26h25c0.827,0,1.5-0.673,1.5-1.5v-17C30,6.673,29.327,6,28.5,6C28.224,6,28,5.776,28,5.5S28.224,5,28.5,5   C29.878,5,31,6.122,31,7.5v17C31,25.878,29.878,27,28.5,27z"
                    fill="#455A64"
                  />
                  <path
                    d="M16,19c-0.099,0-0.198-0.029-0.284-0.088L2.066,9.498C1.398,9.038,1,8.278,1,7.467C1,6.107,2.107,5,3.467,5   h25.065C29.893,5,31,6.107,31,7.467c0,0.811-0.398,1.57-1.066,2.031l-13.65,9.414C16.198,18.971,16.099,19,16,19z M3.467,6   C2.658,6,2,6.658,2,7.467C2,7.95,2.237,8.401,2.634,8.675L16,17.893l13.366-9.218C29.763,8.401,30,7.95,30,7.467   C30,6.658,29.342,6,28.533,6H3.467z"
                    fill="#455A64"
                  />
                </g>
              </svg>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Instagram</span>
              <svg
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:opacity-75"
              >
                <g id="_x31_73-instagram">
                  <g>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="SVGID_1_"
                      x1="74.3496"
                      x2="393.8339"
                      y1="83.7275"
                      y2="386.7129"
                    >
                      <stop offset="0" style={{ stopColor: "#FEC053" }} />
                      <stop offset="0.3273" style={{ stopColor: "#F2203E" }} />
                      <stop offset="0.6485" style={{ stopColor: "#B729A8" }} />
                      <stop offset="1" style={{ stopColor: "#5342D6" }} />
                    </linearGradient>
                    <path
                      d="M256.052,138.088c-65.268,0-117.913,52.646-117.913,117.912    c0,65.267,52.645,117.91,117.913,117.91c65.267,0,117.911-52.644,117.911-117.91C373.963,190.734,321.318,138.088,256.052,138.088    z M256.052,332.659c-42.177,0-76.659-34.38-76.659-76.659c0-42.279,34.378-76.657,76.659-76.657    c42.277,0,76.657,34.378,76.657,76.657C332.709,298.279,298.229,332.659,256.052,332.659L256.052,332.659z M406.288,133.266    c0,15.291-12.315,27.502-27.502,27.502c-15.292,0-27.502-12.314-27.502-27.502c0-15.188,12.313-27.503,27.502-27.503    C393.973,105.763,406.288,118.077,406.288,133.266z M484.382,161.177c-1.743-36.839-10.158-69.474-37.148-96.36    c-26.886-26.887-59.52-35.302-96.36-37.148c-37.971-2.155-151.777-2.155-189.747,0c-36.739,1.743-69.372,10.159-96.361,37.046    c-26.99,26.887-35.302,59.52-37.149,96.36c-2.155,37.969-2.155,151.777,0,189.747c1.745,36.842,10.159,69.473,37.149,96.361    c26.989,26.887,59.521,35.301,96.361,37.148c37.969,2.154,151.776,2.154,189.747,0c36.841-1.744,69.475-10.161,96.36-37.148    c26.887-26.889,35.302-59.52,37.148-96.361C486.538,312.853,486.538,199.147,484.382,161.177z M435.329,391.563    c-8.004,20.112-23.5,35.61-43.716,43.716c-30.273,12.009-102.108,9.236-135.562,9.236c-33.456,0-105.393,2.669-135.563-9.236    c-20.114-8.005-35.611-23.498-43.717-43.716C64.766,361.29,67.538,289.455,67.538,256s-2.669-105.391,9.234-135.562    c8.006-20.114,23.5-35.61,43.717-43.716c30.273-12.007,102.107-9.236,135.563-9.236c33.453,0,105.391-2.668,135.562,9.236    c20.113,8.002,35.609,23.5,43.716,43.716c12.007,30.272,9.237,102.107,9.237,135.562S447.336,361.392,435.329,391.563z"
                      style={{ fill: "url(#SVGID_1_)" }}
                    />
                  </g>
                </g>
                <g id="Layer_1" />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Facebook</span>
              <svg
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:opacity-75"
              >
                <g>
                  <path
                    d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
                    style={{ fill: "#1877f2", fillRule: "nonzero" }}
                  />
                  <path
                    d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
                    style={{ fill: "#fff", fillRule: "nonzero" }}
                  />
                </g>
              </svg>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Twitter</span>
              <svg
                enable-background="new 0 0 512 512"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:opacity-75"
              >
                <g>
                  <path
                    clip-rule="evenodd"
                    d="M256.23,512C396.81,512,512,396.81,512,256.23   C512,115.184,396.81,0,256.23,0C115.184,0,0,115.184,0,256.23C0,396.81,115.184,512,256.23,512L256.23,512z"
                    className="fill-blue-500"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M276.635,137.407c-9.077,6.351-15.873,15.42-20.865,25.396   l-2.265,5.898c-1.359,4.077-2.273,8.163-2.726,12.241c-0.453,2.265-0.453,4.085-0.906,5.898v3.625l0.453,5.898l0.906,7.71h-0.453   h-2.719h-1.813c-22.224-0.453-43.987-5.445-63.04-14.061l-11.334-5.437c-2.265-0.914-4.078-2.273-6.351-3.632   c-12.694-7.257-24.028-16.78-34.012-27.208c-6.343-6.804-12.241-14.061-17.232-21.771c-5.438,10.437-8.616,22.677-8.616,35.379   c0,4.531,0.453,9.069,1.359,13.6c0,2.265,0.453,4.085,0.914,5.898c4.078,13.6,11.334,25.849,21.31,34.918l4.992,4.539l-6.351-1.367   c-8.163-2.266-16.326-4.984-24.036-8.164c0.906,16.327,7.257,31.293,17.232,43.089c9.522,11.327,22.224,19.951,36.73,24.028   l-16.779,0.906l-14.054-0.453c10.429,25.403,34.465,43.995,63.033,46.261c-26.302,19.498-58.955,30.388-93.873,30.388   c25.849,15.873,55.33,25.841,87.521,27.653h20.865c99.31-5.438,177.77-87.522,177.77-188.199v-9.522   c3.625-3.171,7.25-6.343,10.89-9.975c8.608-7.71,16.326-16.78,22.67-26.302c-10.437,6.804-22.67,10.429-36.277,10.429h-0.453   h-0.453h0.453c12.232-8.163,21.763-20.404,26.747-34.465c-9.515,4.992-20.404,8.616-31.294,11.796l-1.359,0.453l-8.155,1.812   c-11.795-12.702-28.575-20.865-47.167-20.865h-0.452h-0.906c-4.984,0-9.983,0.453-14.968,1.367   c-7.249,1.812-14.514,4.984-20.404,8.616L276.635,137.407z"
                    fill="#FFFFFF"
                    fill-rule="evenodd"
                  />
                </g>
              </svg>
            </Link>
          </li>
        </ul>
      </motion.div>
      <div className="flex justify-center flex-row gap-2 font-outfit -mt-4 pb-8">
        Design and Develop By{" "}
        <span className="text-blue-800">
          {"  "}
          <Link href="https://jignesh-baria.vercel.app/" target="_blank">
            Jignesh Baria
          </Link>
        </span>
      </div>
      <div className="flex justify-center flex-row gap-2 font-outfit -mt-4 pb-8">
        Copyright &copy;2023{" "}
        <span className="text-blue-800">
          {"  "}
          <Link href="/">UniSmart</Link>
        </span>
      </div>
    </motion.footer>
  );
}
