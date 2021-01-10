import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Column.scss';

const ColumnsList = ({changeColumn}) => {

    // send selected column to app
    const handleChange = ({target}) => {
        changeColumn(target.value);
    };

    const [columns, setColumns] = useState([]);
    
    // get columns names from api
    useEffect(() => {
        axios.get('http://localhost:3333/api/census/columns/')
            .then((res) => {
                setColumns(res.data.rows);
            });
    }, [])
    // create list with column names
    const list = columns.map(column => <option key={column.cid} value={column.name}>{column.name}</option>)
    
    return (
        <div>
            <label>Choisissez les donénes à afficher</label>
            <select onChange={handleChange}>
                {list}
            </select>
        </div>
    );
};

export default ColumnsList;