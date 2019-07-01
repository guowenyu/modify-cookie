class MyButton extends HTMLElement {
  static get observedAttributes() {
    return ['btntxt']
  }

  get btntxt() {
    return this.getAttribute('btntxt')
  }

  set btntxt(val) {
    this.setAttribute('btntxt', val)
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    })

    shadowRoot.innerHTML = `
      <style>
        :host {
          margin: 10px 0;
          outline: none;
        }

        .btn {
          width: 60%;
          margin: 0 auto;
          color: #f0275b;
          background: #fff;
          border-radius: 4px;
          border: 1px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          height: 40px;
          font-size: 14px;
          cursor: pointer;
        }

        .btn span {
          flex: 1;
          text-align: center;
        }

        .btn:hover {
          opacity: 0.75;
          box-shadow: 0 0 0 2px #f0275b;
        }
      </style>

      <div class="btn">
        <span></span>
      </div>
    `
  }

  connectedCallback() {
    const spanDom = this.shadowRoot.querySelector('span')

    spanDom.innerText = this.btntxt
  }

  attributeChangedCallback(name, oldVal, newVal){
    if(!this[name]) {
      this[name] = newVal;
    }
  }
}

customElements.define('my-btn', MyButton);
