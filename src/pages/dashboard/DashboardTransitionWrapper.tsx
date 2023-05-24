import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { dashboardVariants } from "../../MotionVariants";

type Props = { children: ReactNode };

const DashboardTransitionWrapper = ({ children }: Props) => {
  const MotionBox = motion(Box, { forwardMotionProps: true });
  return (
    <MotionBox
      variants={dashboardVariants}
      initial="initial"
      animate="final"
      exit="exit"
      width="100%"
      height="100%"
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </MotionBox>
  );
};

export default DashboardTransitionWrapper;
