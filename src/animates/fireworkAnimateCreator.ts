import { throttle } from "lodash-es";
import { nextFrame } from "@realdennis/next-frame";
import suicideAnimate from "suicide-animate";
const genIconsFragment = (bullets: string[], count: number) => {
  const iconGen = () => {
    const icon = document.createElement("div");
    const randIdx = Math.floor(Math.random() * bullets.length);
    icon.innerText = bullets[randIdx];
    Object.assign(icon.style, {
      position: "absolute",
      fontSize: "20px",
      zIndex: 0
    });
    return icon;
  };
  const icons = Array.from(Array(count), iconGen);
  const fragment = document.createDocumentFragment();
  icons.forEach(ic => fragment.appendChild(ic));
  return fragment;
};

const transformPoly = (x: number, y: number, angle: number, time: number) => [
  Math.cos(angle * time) * x - Math.sin(angle * time) * y,
  Math.sin(angle * time) * x + Math.cos(angle * time) * y
];
const getFireworkAnimate = (
  container: Element,
  bullets: string[],
  bulletcount: number
) => {
  const _congratsAnimate = async () => {
    // count > 10 && (count = 10);
    const fragment = genIconsFragment(bullets, bulletcount);
    const congrats = Array.from(fragment.children);
    container.appendChild(fragment);
    const random = 10 * Math.random();
    const singleton = 50;
    const angle = 270 / bulletcount;
    const initial = transformPoly(singleton, singleton, angle, random);

    for (let i = 0; i < congrats.length; i++) {
      const [initX, initY] = initial;
      const [currentX, currentY] = transformPoly(initX, initY, angle, i);
      const congrat = congrats[i];
      suicideAnimate(
        congrat.animate(
          [
            {
              transform: "translate3d(0px,0px,0px)",
              opacity: 1
            },
            {
              transform: `translate3d(${currentX}px,${currentY}px,0px)`,
              opacity: 0
            }
          ],
          {
            duration: 400,
            easing: "ease-in-out",
            direction: "alternate",
            iterations: 1
          }
        )
      );
      // animateObj.onfinish = () => congrat.remove();
      await nextFrame(); // Prevent frame drop
    }
  };
  const congratsAnimate = throttle(_congratsAnimate, bulletcount * 15);
  return congratsAnimate;
};
export default getFireworkAnimate;
