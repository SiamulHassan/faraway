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
      <Logo />
      <Form getDataForm={getDataForm} />
      <PackingList item={item} onDelet={handleDelet} onCheck={handleCheck} />
      <Stats item={item} />
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
function PackingList({ item, onDelet, onCheck }) {
  const [sorted, setSorted] = useState("input");
  let sortedVal;
  if (sorted === "input") sortedVal = item;
  if (sorted === "description")
    sortedVal = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sorted === "checked")
    sortedVal = item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedVal.map((item) => (
          <Item item={item} onDelet={onDelet} onCheck={onCheck} key={item.id} />
        ))}
      </ul>
      <select value={sorted} onChange={(e) => setSorted(e.target.value)}>
        <option value="input">Sort by input</option>
        <option value="description">Sort by description</option>
        <option value="checked">Sort by checked</option>
      </select>
    </div>
  );
}
function Item({ item, onDelet, onCheck }) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onCheck(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDelet(item.id)}>⨉</button>
      </li>
    </>
  );
}
function Stats({ item }) {
  if (!item.length)
    return (
      <p className="stats">
        Please create some item and start packing to go 🚀
      </p>
    );

  const numItems = item.length;
  // jodi packed er value true thake then taile return korbe false hole korbe na
  const numPackedItems = item.filter(
    (filteredItem) => filteredItem.packed
  ).length;
  const percentage = Math.floor((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `Your are ready to go ✈`
          : ` You have ${numItems} items on your list and you already packed
        ${numPackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
