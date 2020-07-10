class Modal extends HTMLElement {
  constructor() {
    super();
    this._modalVisible = false;
    this._modal;

    this._render();
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(value) {
    this.setAttribute("title", value);
  }

  get visible() {
    return this.hasAttribute("visible");
  }

  set visible(value) {
    if (value) {
      this._openedModal();
    } else {
      this._closedModal();
    }
  }

  static get observedAttributes() {
    return ["title", "visible"];
  }

  connectedCallback() {
    this._modal = this.shadowRoot.querySelector(".modal");
    this.shadowRoot
      .querySelector(".close")
      .addEventListener("click", this._closedModal.bind(this));
  }

  _render() {
    const styles = "./styles.css";
    const container = document.createElement("div");
    container.innerHTML = `
      <link type="text/css" rel="stylesheet" href=${styles}>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div id="mydivheader">
            <slot name="title">
              <div>Default Text</div>
            </slot>
            <span id='closeBtn' class="button display-topright" style='color:white;font-size:18px;top: -32px;float:right;padding: 7px 16px;'>×</span>
          </div>
          <div id="container" style='background-color:white;'>
            <slot name='body'>
              <div></div>
            </slot>
          </div>
        </div>
      </div>
      `;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(container);

    shadowRoot.querySelector("#closeBtn").addEventListener("click", (e) => {
      this._closedModal();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && this.shadowRoot) {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    }

    if (this.shadowRoot) {
      if (this.animate) {
        this.shadowRoot
          .querySelector(".modal-content")
          .classList.add("animate-top");
      } else {
        this.shadowRoot
          .querySelector(".modal-content")
          .classList.remove("animate-top");
      }
    }
  }

  _openedModal() {
    this._modalVisible = true;
    this._modal.style.display = "block";
  }

  _closedModal() {
    this._modalVisible = false;
    this._modal.style.display = "none";
  }

  remove() {
    this.parentNode.removeChild(this);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".close")
      .removeEventListener("click", this._closedModal);
  }
}

window.customElements.define("modal-lab", Modal);
