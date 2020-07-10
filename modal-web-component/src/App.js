import React, { useState } from "react";
import "./web-components/modal-b";

function App() {
  const [open, setOpen] = useState(true);
  const [openDefault, setOpenDefault] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDefault = () => {
    setOpenDefault(true);
  };

  const handleCloseDefault = () => {
    setOpenDefault(false);
  };

  return (
    <div>
      <h1>Hi, I am a React App</h1>
      <button onClick={handleOpen}>Open Modal</button>
      <button onClick={handleOpenDefault}>Open Default Modal</button>

      <modal-b show={open}>
        <div slot="header">It´s Important</div>
        <div slot="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div slot="footer">
          <button onClick={handleClose}>Confirmar</button>
        </div>
      </modal-b>

      <modal-b show={openDefault}>
        <div slot="footer">
          <button onClick={handleCloseDefault}>Confirmar</button>
        </div>
      </modal-b>
    </div>
  );
}

export default App;
