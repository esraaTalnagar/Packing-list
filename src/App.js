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
      function handelDeleteItems () {
        setItems(items => items.splice(0, items.length));
      };
    
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handelAddItems} />
        <PackingList items={items} onDeleteItems={handelDeleteItem}  onToggleItems={handelToggleItem} onClear={handelDeleteItems}  />
        <States items={items} />
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
function PackingList({ items, onDeleteItems, onToggleItems , onClear }) {
  const [sortBy , setSortBy] = useState('packed')

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description'){
    sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
  }

  if (sortBy === 'packed') {
    sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
  }

  return (
    <div className="list">
      <ul >
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems}  />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClear} >Clear list</button>
      </div>
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
function States({ items }) {

  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }
  const packedItems = items.filter(item => item.packed);
  const packedItemsCount = packedItems.length;
  const totalItemsCount = items.length;
  const packedPercentage = totalItemsCount === 0 ? 0: Math.round((packedItemsCount / totalItemsCount) * 100);

  return (
    <footer className="stats">
      <em> {packedPercentage === 100 ? "You are ready to go! 🎉"  :  `you have ${totalItemsCount} items on your list, and you already packed ${packedItemsCount} (${packedPercentage}%)`}</em>
    </footer>
  );
}
export default App;
