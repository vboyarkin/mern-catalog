import "./App.sass";
import FilterPanel from "./components/FilterPanel";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <FilterPanel />
      <ItemList />
    </div>
  );
}

export default App;
