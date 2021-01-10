import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Column.scss';

const ColumnData = ({selected}) => {

    const [results, setResults] = useState({rows: [], totalRows: 0});

    //get data about column selected
    useEffect(() => {
        const str = selected.replace(/\s+/g, "-"); 
        axios.get(`http://localhost:3333/api/census/column/${str}`)
            .then((res) => {
                const tableRes = res.data.rows;
                axios.get(`http://localhost:3333/api/census/column/total/${str}`)
                    .then((response) => {
                        setResults({rows: tableRes, totalRows: response.data.rows[0].total})
                    });
            });
    }, [selected])

    // create table rows with data
    const tableRows = results.rows.map((row) => {
        if(row.column !== null){
            return (
                <tr key={row.column}>
                    <td>{row.column}</td>
                    <td>{row.count}</td>
                    <td>{row.avg.toFixed(1)}</td>
                </tr>
            );
        }
    });
    console.log(tableRows);

    return (
        <div>
            { selected !== '' && (
                <table>
                    <thead>
                        <tr>
                            <th>Value</th>
                            <th>Count</th>
                            <th>Average Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ColumnData;