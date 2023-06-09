export const settingsVariants = {
  initial: {
    x: "100vw",
  },
  final: {
    x: "0vw",
    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const dashboardVariants = {
  initial: {
    x: "-100vw",
  },
  final: {
    x: "0vw",
    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const itemsVariants = {
  initial: {
    x: "100vw",
  },
  final: {
    x: "0vw",

    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};
