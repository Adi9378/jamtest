import React, {useState, useEffect} from 'react';
import './Column.scss';
import ES6Promise from 'es6-promise';
import axios from 'axios';
ES6Promise.polyfill();

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
    // create list with column names to select data to looking for
    const list = columns.map(column => <option key={column.cid} value={column.name}>{column.name}</option>)
    
    return (
        <div className='column-list'>
            <label>Choisissez les données à afficher</label><br/>
            <select onChange={handleChange}>
                <option value=''>Sélectionnez des données</option>
                {list}
            </select>
        </div>
    );
};

export default ColumnsList;