<div align="center">
  <h1>Emoji-Claps</h1>
  <img src="https://media.giphy.com/media/L0ZowtBQQPiDmqw91H/giphy.gif" alt="like">
  <p> An experience-addicted element for claping👏 / liking👍 / disliking👎 .</p>
  <img src="https://media.giphy.com/media/SRwJziI9B7RzqGDdtv/giphy.gif" alt="dislike">
</div>

## What's new?

Yes, you can `click` and `hold` to increase the number.
Try it on [Codepen](https://codepen.io/realdennis/pen/RwNGLEE)!

## Installation

```sh
$ yarn add emoji-claps // ES module
```
or in browser
```html
<script src="https://unpkg.com/emoji-claps/dist/emoji-claps.umd.js"></script>
<!-- It's umd bundle-->
```

## Polyfill

The animation use `Element.animate` method and `effect.target`, it's fancy and imperative but not fully support for low version browser & Safari, so please run the [`web-animation next` polyfill](https://github.com/web-animations/web-animations-js) before initial.

```html
<script src="https://rawgit.com/web-animations/web-animations-js/master/web-animations-next-lite.min.js"></script>
```

## Usage

```html 
<emoji-claps 
             emoji="👏" 
             currentcount="30" 
             maxcount="50" 
             bullets='["😍","🎉","🔥","😆"]' 
             bulletcount="6" 
             prefix="+"
             ></emoji-claps>
```  

## Event

### full
The `full` event will trigger when `currentcount === maxcount`.

Take an example
```javascript
const emojiClaps = document.querySelector('emoji-claps');
emojiClaps.addEventListener('full',e=>{
  // Do something if currentcount is 50 (maxcount)
})
```

### click
The `click` event will trigger when user click `emoji-claps`.

Take an example
```javascript
const emojiClaps = document.querySelector('emoji-claps');
emojiClaps.addEventListener('click',e=>{
  // Do something track after user click
})
```

---
LICENSE MIT © 2019 realdennis
