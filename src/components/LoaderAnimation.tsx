import { AnimatePresence, Variants, motion } from "framer-motion";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.5,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants: Variants = {
  start: {
    y: "50%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  end: {
    y: "0%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const loadingCircleStyles = {
  width: "3rem",
  height: "3rem",
  backgroundColor: "black",
  borderRadius: "50%",
};

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        style={{ margin: "4rem 0", display: "flex", gap: "0.5rem" }}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.div
          style={loadingCircleStyles}
          variants={loadingCircleVariants}
        />
        <motion.div
          style={loadingCircleStyles}
          variants={loadingCircleVariants}
        />
        <motion.div
          style={loadingCircleStyles}
          variants={loadingCircleVariants}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
