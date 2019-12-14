import elementAnimateThrottle from "element-animate-throttle";

interface ElementThrottleAnimate extends Element{
  animateThrottle:(keyframe:object[], options:object)=>Animation
}
const bubbleBounceThrottle = (countBubbleEl:Element|ElementThrottleAnimate) => {
  typeof (countBubbleEl as ElementThrottleAnimate).animateThrottle !== "function" &&
    elementAnimateThrottle(countBubbleEl);
  return () =>
    (countBubbleEl as ElementThrottleAnimate).animateThrottle(
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
