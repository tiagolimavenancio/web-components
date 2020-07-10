class Modal extends HTMLElement {
  constructor() {
    super();
    this._modalVisible = false;
    this._modal;
    this._render();
  }

  connectedCallback() {
    this._modal = this.shadowRoot.querySelector(".modal");
    this.shadowRoot
      .querySelector(".close")
      .addEventListener("click", this._closedModal.bind(this));
  }

  attributeChangeCallback(name, oldValue, newValue) {}

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".close")
      .removeEventListener("click", this._closedModal);
  }

  _render() {
    const styles = "./styles.css";
    const container = document.createElement("div");
    container.innerHTML = `
        <link type="text/css" rel="stylesheet" href=${styles}>
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <slot name="header"><h1>Default Text</h1></slot>
                </div>
                <div class="modal-body">
                    <slot><slot>
                </div>
            </div>
        </div>
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(container);
  }

  _openedModal() {
    this._modalVisible = true;
    this._modal.style.display = "block";
  }
  _closedModal() {
    this._modalVisible = false;
    this._modal.style.display = "none";
  }
}
window.customElements.define("modal-c", Modal);
