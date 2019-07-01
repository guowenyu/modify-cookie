class MyInput extends HTMLElement {
  static get observedAttributes() {
    return ['tips', 'name', 'placeholder', 'rule'];
  }

  get error() {
    return this.hasAttribute('error')
  }

  set error(val) {
    if(val) {
      this.setAttribute('error', '')
    } else {
      this.removeAttribute('error')
    }
  }

  get value() {
    return this.getAttribute('value')
  }

  set value(val) {
    this.setAttribute('value', val)
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    })

    shadowRoot.innerHTML =
      `
      <style>
        :host {
          margin: 0;
          outline: none;
          width: 100%;
        }

        .item {
          display: grid;
          grid-template:
            "tips tips" 1fr
            "lable input" 42px
            "error error" 22px /
            60px 1fr;
          align-items: center;
          grid-gap: 10px;
        }
        .item p {
          grid-area: tips;
          color: #666;
          font-size: 12px;
          line-height: 14px;
        }
        .item lable {
          grid-area: lable;
          color: #333;
          font-size: 14px;
          line-height: 16px;
        }

        .item input {
          grid-area: input;
          padding: 4px 10px;
          box-sizing: border-box;
          height: 38px;
        }

        .item input::placeholder{
          color: #999;
        }

        .item .error {
          grid-area: error;
          color: red;
          font-size: 12px;
        }
      </style>
      <div class="item">
        <p></p>
        <label></label>
        <input type="text" />
        <div class="error"></div>
      </div>
    `;
  }

  connectedCallback() {
    const tipsDom = this.shadowRoot.querySelector('p')
    const labelDom = this.shadowRoot.querySelector('label')
    const inputDom = this.shadowRoot.querySelector('input')
    const errorDom = this.shadowRoot.querySelector('.error')

    // 初始化
    tipsDom.innerHTML = `${this.tips}(如：${this.placeholder})`

    labelDom.htmlFor = this.name
    labelDom.innerText = this.name

    inputDom.setAttribute('name', this.name)
    inputDom.setAttribute('id', this.name)
    inputDom.setAttribute('placeholder', this.placeholder)

    inputDom.addEventListener('blur', () => {
      let domain = inputDom.value;
      domain = domain.replace(/https?:\/\//, '')

      this.value = domain

      if(this.rule) {
        const error = new RegExp(this.rule).test(domain)
        errorDom.innerText = error ? '' : `${this.name}输入不正确，请参考例子`
      }
    })

    inputDom.addEventListener('change', () => {
      errorDom.innerText = ''
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(!this[name]) {
      this[name] = newValue
    }
  }
}

customElements.define('my-input', MyInput);
