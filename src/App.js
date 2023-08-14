import { useState } from "react";
import "./index.css";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form/Form";
import PackingList from "./components/PackingList/PackingList";
import Stats from "./components/Stats/Stats";
import Accordion from "./components/Accordion/Accordion";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];
// Array.from({ length: 10 }, (currELe, i) =>
//   console.log("current:::", currELe, i)
// );
// console.log(Number(true));
function App() {
  const [item, setItem] = useState([]);
  const getDataForm = (formData) => {
    setItem((prevData) => [...prevData, formData]);
  };
  const handleDelet = (id) => {
    setItem((prev) => prev.filter((filteredItem) => filteredItem.id !== id));
  };
  const handleCheck = (id) =>
    setItem((prevItem) =>
      prevItem.map((prevItem) =>
        prevItem.id === id
          ? { ...prevItem, packed: !prevItem.packed }
          : prevItem
      )
    );
  return (
    <div className="App">
      <div className="accordion-component">
        <Accordion />
      </div>
      <Logo />
      <Form getDataForm={getDataForm} />
      <PackingList item={item} onDelet={handleDelet} onCheck={handleCheck} />
      <Stats item={item} />
    </div>
  );
}

export default App;
