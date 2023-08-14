import { useState } from "react";
import Item from "../Item/Item";

export default function PackingList({ item, onDelet, onCheck }) {
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
