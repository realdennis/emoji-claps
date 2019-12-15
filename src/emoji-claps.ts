import { LitElement, html, customElement, property } from 'lit-element';
import { perFrameReducer } from '@realdennis/next-frame';
import {
  bubbleBounceCreator,
  buttonBounceCreator,
  fireworkAnimateCreator
} from './animates/index';

@customElement('emoji-claps')
export class EmojiClaps extends LitElement {
  @property({ type: String }) emoji = '👍';
  @property({ type: Number, reflect: true }) currentcount = 0;
  @property({ type: Number }) maxcount = 50;
  @property({ type: Array }) bullets = ['🥰', '🎉', '🔥', '👍'];
  @property({ type: Number }) bulletcount = 5;
  @property({ type: String }) prefix = '+';

  private holdIntervalTimer: number | null = 0;
  private congratsAnimate!: () => Animation;
  private buttonAnimate!: () => Animation;
  private bubbleAnimate!: () => Animation;
  private alreadyFull: boolean;

  constructor() {
    super();
    this.holdIntervalTimer = null;
    window.addEventListener('mouseup', this.onCancelHoldHandler);
    window.addEventListener('blur', this.onCancelHoldHandler);
    // Handle about hold effect
  }

  disconnectedCallback() {
    window.removeEventListener('mouseup', this.onCancelHoldHandler);
    window.removeEventListener('blur', this.onCancelHoldHandler);
    // Cleanup the custom-element effect
  }

  firstUpdated() {
    const clapContainer = this.shadowRoot!.querySelector('.clap-container');
    const clapButton = this.shadowRoot!.querySelector('.clap-button');
    const countBubble = this.shadowRoot!.querySelector('.count-bubble');
    this.congratsAnimate = fireworkAnimateCreator(
      clapContainer as Element,
      this.bullets,
      this.bulletcount
    );
    this.buttonAnimate = buttonBounceCreator(clapButton!);
    this.bubbleAnimate = bubbleBounceCreator(countBubble!);
  }

  playClapAnimate = () => {
    [this.bubbleAnimate, this.buttonAnimate, this.congratsAnimate].reduce(
      perFrameReducer
    );
  };

  onHoldHandler = () => {
    // Should make sure clear effect
    this.onCancelHoldHandler();
    this.holdIntervalTimer = window.setInterval(this.onClapHanlder, 150);
  };

  onCancelHoldHandler = () => {
    this.holdIntervalTimer !== null &&
      window.clearInterval(this.holdIntervalTimer);
  };

  onClickHandler = () => {
    this.fireEvent('click');
    this.onClapHanlder();
  };

  onClapHanlder = () => {
    if (this.currentcount < this.maxcount) {
      this.currentcount++;
    }
    if (this.currentcount === 50 && !this.alreadyFull) {
      this.fireEvent('full');
      this.alreadyFull = true;
    }
    this.playClapAnimate();
  };

  fireEvent = (eventType: string) => {
    const eventObj = new Event(eventType);
    this.dispatchEvent(eventObj);
  };

  render() {
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          user-select: none;
          -webkit-user-select: none;
        }
        .wrapper {
          margin: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .count-bubble {
          background-color: black;
          color: white;
          font-size: 10px;
          width: 35px;
          height: 35px;
          border-radius: 100%;
        }
        .clap-container {
          user-select: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-touch-callout: none;
          position: relative;
          width: 60px;
          height: 60px;
          cursor: pointer;
        }
        .clap-button {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease filter;
          z-index: 1;
          font-size: 40px;
          user-select: none;
          border-radius: 100%;
        }
      </style>
      <div class="wrapper count-bubble">${this.prefix}${this.currentcount}</div>
      <div
        class="wrapper clap-container"
        @contextmenu=${e => e.preventDefault()}
        @mousedown=${this.onHoldHandler}
        @touchstart=${this.onHoldHandler}
        @mouseup=${this.onCancelHoldHandler}
        @touchend=${this.onCancelHoldHandler}
        @touchcancel=${this.onCancelHoldHandler}
        @click=${this.onClapHanlder}
      >
        <div
          class="clap-button"
          style="filter: grayscale(${(1 - this.currentcount / 50).toFixed(2)})"
        >
          ${this.emoji}
        </div>
        <!-- bullet will be here -->
      </div>
    `;
  }
}
