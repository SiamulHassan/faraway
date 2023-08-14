import React, { useState } from "react";
import "./style.css";
const AccordionItem = ({ title, text, num }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <div className={`acc-item ${open ? "open" : ""}`} onClick={handleOpen}>
      <span className="num">{num <= 9 ? `0${num + 1}` : num + 1}</span>
      <h2 className="acc-heading">{title}</h2>
      <span>{open ? "-" : "+"}</span>
      {open && <p className="content-box">{text}</p>}
    </div>
  );
};

export default AccordionItem;
