import elementAnimateThrottle from "element-animate-throttle";
interface ElementThrottleAnimate extends Element {
  animateThrottle: (keyframe: object[], options: object) => Animation;
}
const buttonBounceThrottle = (clapButtonEl: Element | ElementThrottleAnimate) => {
  typeof (clapButtonEl as ElementThrottleAnimate).animateThrottle !== "function" &&
    elementAnimateThrottle(clapButtonEl);
  return () =>
    (clapButtonEl as ElementThrottleAnimate).animateThrottle(
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
