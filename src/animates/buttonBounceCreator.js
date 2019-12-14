import elementAnimateThrottle from "element-animate-throttle";
const buttonBounceThrottle = clapButtonEl => {
  typeof clapButtonEl.animateThrottle !== "function" &&
    elementAnimateThrottle(clapButtonEl);
  return () =>
    clapButtonEl.animateThrottle(
      [
        // keyframes
        { transform: "scale(1)" },
        { transform: "scale(1.3)" }
      ],
      {
        // timing options
        duration: 200,
        direction: "alternate",
        easing: "ease-in-out",
        iterations: 2
      }
    );
};
export default buttonBounceThrottle;
