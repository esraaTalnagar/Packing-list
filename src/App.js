import {useState} from 'react'


function App() {
    const [items, setItems] = useState([]);
      function handelAddItems(item) {
        setItems((prevItems) => [...prevItems, item]);
      }

      function handelDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id));
      }

      function handelToggleItem(id) {
        setItems (items => items.map(item => {
          if (item.id === id) {
            return { ...item, packed: !item.packed };
          }
          return item;
        }));
      }
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handelAddItems} />
        <PackingList items={items} onDeleteItems={handelDeleteItem}  onToggleItems={handelToggleItem} />
        <States />
      </div>
    </>
  );
}

function Logo() {
  return <h1>Far Away 🛫🛬</h1>;
}
function Form({ onAddItems  }) {
  const [Desc , setDesc] = useState('')
  const [quantity, setQuantity] = useState(1);
  function handelSubmit(e) {
    e.preventDefault();
    if (!Desc) return;
    const newItem = { id: Date.now(), description: Desc, quantity, packed: false };
    setDesc('');
    setQuantity(1);
    onAddItems(newItem);


  }
  return (
    <form className="add-form" onSubmit={(e)=> handelSubmit(e)}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (<option value={num} key={num}>
          {num}
        </option>))}
      </select>
        <input type="text" placeholder="item..." value={Desc} onInput={(e) => setDesc(e.target.value)}/>
        <button type="submit"  >Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item , onDeleteItems, onToggleItems }) {


  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function States() {
  return (
    <footer className="stats">
      <em>you have X items on your list, and you already packed X items(X%)</em>
    </footer>
  );
}
export default App;
