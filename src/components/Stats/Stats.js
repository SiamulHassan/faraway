export default function Stats({ item }) {
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
