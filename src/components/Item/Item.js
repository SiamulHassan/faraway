export default function Item({ item, onDelet, onCheck }) {
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
