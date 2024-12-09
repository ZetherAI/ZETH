// UESED BY SIDEBAR NAV LINKS
export const slideInBottom = {
  initial: { opacity: 0, x: 50, y: 50 },
  animate: {
    opacity: 1,
    x: [50, 0],
    y: [50, 0],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
    },
  },
  exit: {
    opacity: 0,
    x: [0, 10],
    y: [0, 10],
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
};

// USED BY COLLECTION CARDS
export const slideInBottomI = {
  initial: { opacity: 0, x: 50, y: 50 },
  animate: (i) => ({
    opacity: 1,
    x: [50, 0],
    y: [50, 0],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
      delay: i / 10,
    },
  }),
};

// UESED BY SECTION BLOCKS
export const slideInBottom2 = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    // x: [50, 0],
    y: [50, 0],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
    },
  },
  exit: {
    opacity: 0,
    // x: [0, 10],
    y: [0, 50],
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

// USED BY
export const slideInRight = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: [0, 1],
    x: [50, 0],
    transition: { type: "spring", duration: 1, bounce: 0.5 },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { type: "spring", duration: 1, bounce: 0.5 },
  },
};

// USED BY ORDER CARDS
export const slideInSideI = {
  // initial: (i) => ({ opacity: 0, x: i % 2 ? 50 : -50 }),
  initial: (i) => ({ opacity: 0, x: 50 + i - i }),
  animate: (i) => ({
    opacity: 1,
    // x: i % 2 ? [50, 0] : [-50, 0],
    x: [50, 0],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
      delay: i / 10,
    },
  }),
};

export const slideInUpI = {
  // initial: (i) => ({ opacity: 0, x: i % 2 ? 50 : -50 }),
  initial: (i) => ({ opacity: 0, y: 50 + i - i }),
  animate: (i) => ({
    opacity: 1,
    y: [50, 0],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
      delay: i / 10,
    },
  }),
};

// USED BY
export const popIn = {
  initial: { scale: 0 },
  animate: {
    scale: [0, 1.5, 1],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
};

// USED BY DASHBOARD LOGO
export const scaleIn = {
  initial: { scale: 0 },
  animate: {
    scale: [1.25, 1],
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 85,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
};

// USED BY BUTTONS
export const buttonClick = {
  tap: { scale: 0.9 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.8,
    },
  },
};

export const buttonClickSM = {
  tap: { scale: 0.98 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5,
    },
  },
};

const variants = {
  buttonClick,
  scaleIn,
  popIn,
  slideInBottom,
  slideInBottom2,
  buttonClickSM,
  slideInBottomI,
  slideInSideI,
  slideInUpI,
};
export default variants;
