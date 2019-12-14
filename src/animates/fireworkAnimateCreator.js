import { throttle } from "lodash-es";
import { nextFrame } from "@realdennis/next-frame";
import suicideAnimate from "suicide-animate";
const getFireworkAnimate = (container, bullets, bulletcount) => {
  const _congratsAnimate = async () => {
    const genIconArray = count => {
      const iconGen = () => {
        const icon = document.createElement("div");
        const randIdx = Math.floor(Math.random() * bullets.length);
        icon.innerText = bullets[randIdx];
        icon.classList.add("congrat");
        return icon;
      };
      const icons = Array.from(Array(count), iconGen);
      const fragment = document.createDocumentFragment();
      icons.forEach(ic => fragment.appendChild(ic));
      container.appendChild(fragment);
      return icons;
    };
    // count > 10 && (count = 10);
    const congrats = genIconArray(bulletcount);
    const random = 10 * Math.random();
    const singleton = 50;
    const angle = 270 / bulletcount;
    const transformPoly = (x, y, time) => [
      Math.cos(angle * time) * x - Math.sin(angle * time) * y,
      Math.sin(angle * time) * x + Math.cos(angle * time) * y
    ];
    const initial = transformPoly(singleton, singleton, random);

    for (let i = 0; i < congrats.length; i++) {
      const [initX, initY] = initial;
      const [currentX, currentY] = transformPoly(initX, initY, i);
      const congrat = congrats[i];
      suicideAnimate(
        congrat.animate(
          [
            // keyframes
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
            // timing options
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
