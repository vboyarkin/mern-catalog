import "./App.sass";
import FilterPanel from "./components/FilterPanel";
import ItemList from "./components/ItemList";

function App() {
  window.IS_DEV = true;

  return (
    <div className="App">
      <FilterPanel />
      <ItemList />
    </div>
  );
}

export default App;
