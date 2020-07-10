class Modal extends HTMLElement {
  constructor() {
    super();
    this.visible = false;
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
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  }

  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }

  static get observedAttributes() {
    return ["visible", "title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && this.shadowRoot) {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    }

    if (name === "visible" && this.shadowRoot) {
      if (newValue === null) {
        this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
        this.dispatchEvent(new CustomEvent("close"));
      } else {
        this.shadowRoot.querySelector(".wrapper").classList.add("visible");
        this.dispatchEvent(new CustomEvent("open"));
      }
    }
  }

  _render() {
    const wrapperClass = this.visible ? "wrapper visible" : "wrapper";
    const styles = "./styles.css";
    const container = document.createElement("div");
    container.innerHTML = `
        <link type="text/css" rel="stylesheet" href=${styles}>
        <div class='${wrapperClass}'>
            <div class='modal'>
              <span class='title'>${this.title}</span>
              <div class='content'>
                <slot></slot>
              </div>
              <div class='button-container'>
                <button class='cancel'>Cancel</button>
                <button class='ok'>Okay</button>
              </div>
            </div>
        </div>
    `;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(container);
  }

  _attachEventHandlers() {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("cancel"));
      this.removeAttribute("visible");
    });

    const okButton = this.shadowRoot.querySelector(".ok");
    okButton.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("ok"));
      this.removeAttribute("visible");
    });
  }

  disconnectedCallback() {}
}

window.customElements.define("simple-modal", Modal);
