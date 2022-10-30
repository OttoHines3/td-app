import { OptionVar } from '../interfaces'
import React, {useMemo, useEffect, useState} from 'react'
// import { useTable, useSortBy } from 'react-table'
import axios from 'axios'
// import styled from 'styled-components'
import './'
import CloseTable from '../components/CloseTable'
import ReactPaginate from 'react-paginate'
import CommandPallete from '../components/CommandPallete'
import { flatten } from 'lodash'
import Header from '../components/Header'


type Props ={
  data: OptionVar[];
};

const columns = [
  {
    Header: 'Option Name', 
    accessor: 'optionName' as keyof OptionVar, 
    sortType: 'alphanumeric'
  },
  {
    Header: 'Option Symbol',
    accessor: 'optionSymbol' as keyof OptionVar,
  },
  {
    Header: 'Yesterday Open Interest',
    accessor: 'openInterest' as keyof OptionVar,

  },
  {
    Header: 'Today\'s Open Interest',
    accessor: 'newOINumber' as keyof OptionVar,
    sortType: 'alphanumeric',
  },
  {
    Header: 'Open Interest Change',
    accessor: 'openInterestChange' as keyof OptionVar,
    sortType: 'alphanumeric',
  },
  {
    Header: 'Volume',
    accessor: 'volume' as keyof OptionVar,
    sortType: 'alphanumeric',
  },
  {
    Header: 'In the Money',
    accessor: 'inTheMoney' as keyof OptionVar,
    sortType: 'basic',
  },
];//end columns

// function Table(props: Props){
//   const data = useMemo(() => props.data, [props.data])
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow 
//   } = useTable(
//     { 
//       columns , 
//       data 
//     },
//     useSortBy,
//     );

//   // return<table style={{ border: 'solid 1px blue' }}>
//   //   <thead>
//   //     {headerGroups.map(headerGroup => (
//   //       <tr 
//   //       key={Math.random()}

//   //       // {...headerGroup.getHeaderGroupProps()}
//   //       >
//   //         {headerGroup.headers.map((column : any) => (
//   //           <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{
//   //             borderBottom: 'solid 3px blue',
//   //             background: 'green',
//   //             color: 'white',
//   //             fontWeight: 'bold',
//   //             padding: '10px',
//   //           }}>{column.render('Header')}
//   //            <span>
//   //               {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//   //             </span>
//   //           </th>
//   //         ))}
//   //       </tr>
//   //     ))}
//   //   </thead>
//   //   <tbody {...getTableBodyProps()}>
//   //     {rows.map(row => {
//   //       prepareRow(row)
//   //       return (
//   //         <tr {...row.getRowProps()}>
//   //           {row.cells.map(cell => {
//   //             return <td {...cell.getCellProps()} style={{
//   //               padding: '30px',
//   //               textAlign: 'center',
//   //               background: '#fff',
//   //               border: 'solid 1px blue',
//   //               borderSpacing : '3px',
//   //             }}>{cell.render('Cell')}</td>
//   //           })}
//   //         </tr>
//   //       )
//   //     })}
//   //   </tbody>
//   // </table>;
// }//end of Table

function App(){
  
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage] = useState(10);
  const fetchData = async () => {
    const response = await axios.get<OptionVar[]>('/api/test/tester');
    const data = response.data;
    const slice = data.slice(offset, offset + perPage)

    // setData(postData);
    // @ts-ignore
    setData(slice)
    setPageCount(Math.ceil(data.length / perPage))

  };//end of fetchData

  //fetch data on page load
  useEffect(() => {
    fetchData();
  }, [offset]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };//end of handlePageClick

  const flattenedData = flatten(data)

  return(

    
    <div className='bg-white'>
      <Header />
      <div className='my-6 flex w-full justify-center '>



    
      <CloseTable data={flattenedData} />
      
      </div>
      {/* {data} */}

      <ReactPaginate

        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
     {/* <CommandPallete data={flattenedData}/> */}
    </div>
     
     );
     {/* {data.length > 0 ? <Table data={data}/> : <div>loading...</div>} */}
    }//end of App
    
export default App