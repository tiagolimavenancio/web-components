class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._template = ` 
        <style>
          :host {
              position: relative;
          }
          *, *::after, *::before{
              box-sizing: border-box;
          }
          .backdrop {
            display: none;
            position: fixed;
            overflow: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 99;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }
          .active {
            display: block;
          }
          .modal {
            position: relative;
            top: 10%;
            margin: auto;
            width: 80%;
            max-width: 500px;
            max-height: 312px;
            z-index: 100;
            background-color: #fefefe;
          }
          .header {
            padding: 10px;
            z-index: 10;
            background-color: #2196f3;
            color: #fff;
          }
          .content {
            padding: 20px;
          }
          .footer {
            position: relative;
            bottom: 0;
            padding: 1em;
            border-top: 1px #ddd solid;
            width: 100%;
            text-align: right;
          }
          .fadeInDown {
            animation-name: fadeInDown;
            animation-duration: 0.35s;
            animation-fill-mode: both;
          }
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-5%);
            }
            100% {
              opacity: 1;
              transform: translateY(0%);
            }
          }
          @media (max-width: 500px) {
            .modal {
              width: 100% !important;
            }
          }        
        </style>        
        <div class="backdrop">
            <div class="modal fadeInDown">
                <div class="header">                  
                  <slot name="header">
                    Default Header
                  </slot>
                </div>
                <div class="content">
                  <slot name="content">
                    <div>
                      Default Content
                    </div>
                  </slot>
                </div>
                <div class="footer">
                    <slot name="footer">
                    
                    </slot>
                </div>
            </div>
        </div>
    `;
    this._shadowRoot.innerHTML = this._template;
  }

  static get observedAttributes() {
    return ["show"];
  }

  _isDefined(param) {
    return param && param.value && param.value.length > 0 ? true : false;
  }

  connectedCallback() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {}

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._shadowRoot.querySelector(".backdrop")) return;

    if (name === "show") {
      if ([true, "true"].indexOf(newVal) > 0) {
        this._openModal();
      } else if ([false, "false"].indexOf(newVal) > 0) {
        this._closeModal();
      }
    }
  }

  _openModal() {
    document.body.style.overflow = "hidden";
    this._shadowRoot.querySelector(".backdrop").classList.add("active");
  }

  _closeModal() {
    document.body.style.overflow = "unset";
    this._shadowRoot.querySelector(".backdrop").classList.remove("active");
  }

  disconnectedCallback() {}
}

window.customElements.define("modal-b", Modal);
