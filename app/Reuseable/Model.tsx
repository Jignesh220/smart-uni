import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Fragment, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModelStyale = cva([], {
  variants: {
    variants: {
      primary: [
        "text-blue-800",
        "bg-blue-200",
        "outline outline-2 outline-blue-300/50",
      ],
      error: [
        "text-red-800",
        "bg-red-200",
        "outline outline-2 outline-red-300/50",
      ],
      sucess: [
        "text-green-800",
        "bg-green-200",
        "outline outline-2 outline-green-300/50",
      ],
      warning: [
        "text-orange-800",
        "bg-orange-200",
        "outline outline-2 outline-orange-300/50",
      ],
      info: [
        "text-cyan-800",
        "bg-cyan-200",
        "outline outline-2 outline-cyan-300/50",
      ],
      custome: [""],
    },
  },
});

type ModelVariantsProps = VariantProps<typeof ModelStyale>;

interface ModalProps extends ModelVariantsProps {
  variants: ModelVariantsProps["variants"];
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  variants,
  className,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      <AnimatePresence>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed bg-black/50 inset-0 backdrop-blur-[5px] -z-50"></div>
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              y: -200,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={
              isOpen
                ? {
                    duration: 0.4,
                    type: "spring",
                  }
                : {}
            }
            exit={
              !isOpen
                ? {
                    scale: 0,
                    opacity: 0,
                    y: 200,
                  }
                : {}
            }
            className={`${ModelStyale({
              variants,
            })} rounded-3xl z-10 w-[38rem] h-auto relative ${className}`}
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div className="max-h-[90vh] overflow-hidden overflow-y-scroll hide-scroll-bar rounded-lg">
              {children}
            </div>
            <div className="absolute right-2 top-2 z-50" onClick={onClose}>
              <motion.div
                whileTap={{
                    scale: 0.8
                }}
                className={`inline-block rounded-full p-2 cursor-pointer hover:bg-white/30`}
              >
                <span className="sr-only">Close Button</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Fragment>
  );
};

export default Modal;
