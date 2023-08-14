import { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

// Array.from({ length: 10 }, (currELe, i) =>
//   console.log("current:::", currELe, i)
// );

function App() {
  const [item, setItem] = useState([]);
  const getDataForm = (formData) => {
    setItem((prevData) => [...prevData, formData]);
  };
  const handleDelet = (id) => {
    setItem((prev) => prev.filter((filteredItem) => filteredItem.id !== id));
  };
  return (
    <div className="App">
      <Logo />
      <Form getDataForm={getDataForm} />
      <PackingList item={item} onDelet={handleDelet} />
      <Stats />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🌎 Far Away</h1>;
}
function Form({ getDataForm }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      quantity,
      id: Math.floor(Math.random() * 100),
      packed: false,
    };
    getDataForm(newItem);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ? 😒</h3>
      {/* option e je value select korchi sei value ta value prop er maddhome quantity state e joma hocche; ar num ta to arr thke pacchi */}
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ item, onDelet }) {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item item={item} onDelet={onDelet} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelet }) {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDelet(item.id)}>⨉</button>
      </li>
    </>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (x%)</em>
    </footer>
  );
}
