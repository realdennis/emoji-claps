import elementAnimateThrottle from "element-animate-throttle";
const bubbleBounceThrottle = countBubbleEl => {
  typeof countBubbleEl.animateThrottle !== "function" &&
    elementAnimateThrottle(countBubbleEl);
  return () =>
    countBubbleEl.animateThrottle(
      [
        // keyframes
        { transform: "scale(1)" },
        { transform: "scale(1.1)" }
      ],
      {
        // timing options
        duration: 300,
        direction: "alternate",
        easing: "ease-in-out",
        iterations: 2
      }
    );
};
export default bubbleBounceThrottle;
