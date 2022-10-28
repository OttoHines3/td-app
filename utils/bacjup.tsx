import { OptionVar } from '../interfaces'
import React, {useMemo, useEffect, useState} from 'react'
import { useTable } from 'react-table'
import axios from 'axios'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Props ={
  data: OptionVar[];
};

const columns = [
  {
    Header: 'Option Name', 
    accessor: 'optionName' as keyof OptionVar, 
  },
  {
    Header: 'Option Symbol',
    accessor: 'optionSymbol' as keyof OptionVar,
  },
  {
    Header: 'Volume',
    accessor: 'volume' as keyof OptionVar,
  },
  {
    Header: 'Yesterday Open Interest',
    accessor: 'openInterest' as keyof OptionVar,

  },
  {
    Header: 'Today\'s Open Interest',
    accessor: 'newOINumber' as keyof OptionVar,
  },
  {
    Header: 'Open Interest Change',
    accessor: 'openInterestChange' as keyof OptionVar,
  },
  {
    Header: 'in the Money',
    accessor: 'inTheMoney' as keyof OptionVar,
  },
];//end columns

function Table(props: Props){
  const data = useMemo(() => props.data, [props.data])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow 
  } = useTable({ columns , data });
  return<table>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>;
}//end of Table

function App(){
  const [data, setData] = useState<OptionVar[]>([]);
  const fetchData = async () => {
    const response = await axios.get<OptionVar[]>('http://localhost:3000/api/test/tester');
    setData(response.data);
  };//end of fetchData

  //fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  return(
    
    <div>
      {data.length > 0 ? <Table data={data}/> : <div>loading...</div>}
    </div>
     
  );
}//end of App

export default App