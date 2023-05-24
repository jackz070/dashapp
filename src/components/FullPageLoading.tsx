import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

import Loader from "./LoaderAnimation";

type Props = { text: string };

const FullPageLoading = ({ text }: Props) => {
  const MotionBox = motion(Box, { forwardMotionProps: true });
  return (
    <MotionBox
      width="100%"
      height="100%"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw" }}
      transition={{ duration: 1 }}
    >
      <Loader />
      <Typography
        variant="h3"
        fontWeight="400"
        letterSpacing="1px"
        color="black"
        textTransform="uppercase"
      >
        {text}
      </Typography>
    </MotionBox>
  );
};

export default FullPageLoading;
