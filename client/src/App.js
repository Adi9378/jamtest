import './App.css';
import ColumnsList from './components/ColumsList';
import ColumnData from './components/ColumnData';
import {useState} from 'react';

function App() {

  const [columnSelected, setColumnSelected] = useState('');

  const changeColumn = (value) => {
    setColumnSelected(value);
  };

  return (
    <div className="App">
        <ColumnsList changeColumn={changeColumn} />
        <ColumnData selected={columnSelected} />
    </div>
  );
}

export default App;
