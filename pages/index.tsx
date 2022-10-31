import { OptionVar } from '../interfaces'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
// import styled from 'styled-components'
import CloseTable from '../components/CloseTable'
import ReactPaginate from 'react-paginate'
import { flatten } from 'lodash'
import Header from '../components/Header'
import Pagination from '../components/Pagination'


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
    }//end of App
    
export default App