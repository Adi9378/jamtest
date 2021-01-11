import React, {useEffect, useState} from 'react'
import Spinner from './Spinner';
import './Column.scss';
import ES6Promise from 'es6-promise';
import axios from 'axios';
ES6Promise.polyfill();


const ColumnData = ({selected}) => {

    const [results, setResults] = useState({rows: [], totalRows: 0, loaded: false});
    const unshow = results.totalRows - results.rows.length;

    //get data about column selected
    useEffect(() => {
        if(selected !== ''){
            const str = selected.replace(/\s+/g, "-"); 
            axios.get(`http://localhost:3333/api/census/column/${str}`)
                .then((res) => {
                    const tableRes = res.data.rows;
                    axios.get(`http://localhost:3333/api/census/column/total/${str}`)
                        .then((response) => {
                            setResults({rows: tableRes, totalRows: response.data.rows[0].total, loaded:true})
                        });
                });
            return function cleanup(){
                setResults({rows:[], totalRows: 0, loaded:false});
            };
        }
    }, [selected])

    // create table rows with data
    const tableRows = results.rows.map((row) => {
        return (
            <tr key={row.column}>
                <td>{row.column}</td>
                <td>{row.count}</td>
                <td>{row.avg.toFixed(1)}</td>
            </tr>
        );
    });

    return (
        <div>
            {selected !== '' && !results.loaded && (<Spinner />)}
            { unshow > 0 && (
                <p>{unshow} resultats non affichés</p>
            )}
            { selected !== '' && results.loaded && (
                <div>
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
                </div>
            )}
        </div>
    );
};

export default ColumnData;