export const headerVariants = {
    hidden: {
        y: -100
    },
    visible: {
        y: 0,
        transition: { type: "spring", stiffness: 100, delay: 1 }
    },
};

export const cartMenuVariants = {
    hidden: {
        opacity: 0,
        y: "100px",
        transition: { type: "tween" }
    },
    visible: {
        opacity: 1,
        y: "10px",
        transition: { type: "tween" }
    },
}

export const productVariants = {
    hidden: {
        x: 100,
    },
    inView: {
        x: 0,
        transition: { duration: 2 },
    },
    inHover: {
        scale: 1.1,
        zIndex: 200,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }
};

export const addToCartButton = {
    inHover: {
        backgroundColor: "var(--green-color)",
        transition: { duration: 0 }
    }
};

export const landingImageVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
        }
    }
};

export const mainTitleVariants = {
    hidden: {
        y: -500
    },
    visible: {
        y: 0,
        transition: { type: "spring", stiffness: 100, mass: 0.5, damping: 10 }
    }
};

export const modalVariants = {
    hidden: {
        scale: 0,
    },
    visible: {
        scale: 1,
        transition: { type: "tween" },
    },
};