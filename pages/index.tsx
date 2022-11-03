import { OptionVar } from '../interfaces'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CloseTable from '../components/CloseTable'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
// import {CSVLink} from 'react-csv';



function App(){
  const today = new Date();
  const filename = "options"  + today.toISOString() + ".csv";

  
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [dataPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState([]);
  const [pageNumber2, setPageNumber2] = useState(1);
  const [dataPerPage2] = useState(10);
  const [allData, setAllData] = useState([]);


  //fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get<OptionVar[]>('/api/test/tester');
      const data = response.data;
      //slice data in half
      const data1 = data.slice(0, data.length/2);
      const data2 = data.slice(data.length/2, data.length);
      
      // setData(postData);
      // @ts-ignore
      setData(data1)
      setLoading(false);

      // @ts-ignore
      setData2(data2)
      setLoading(false);

      // @ts-ignore
      setAllData(data)
      setLoading(false);
  
    };//end of fetchData
  
    fetchData();
    
  }, []);//end of useEffect

 //get current data
 let indexOfLastData = pageNumber * dataPerPage;
 let indexOfFirstData = indexOfLastData - dataPerPage;
 let currentData = data.slice(indexOfFirstData, indexOfLastData);

  //get current data
  let indexOfLastData2 = pageNumber2 * dataPerPage2;
  let indexOfFirstData2 = indexOfLastData2 - dataPerPage2;
  let currentData2 = data2.slice(indexOfFirstData2, indexOfLastData2);

  //change page
  const paginate = (pageNumber : any) => { 
    setPageNumber(pageNumber);
    indexOfLastData = pageNumber * dataPerPage;
    indexOfFirstData = indexOfLastData - dataPerPage;
    currentData = data.slice(indexOfFirstData, indexOfLastData);

  }
  
  //change page
  const paginate2 = (pageNumber2 : any) => {
    setPageNumber2(pageNumber2);
    indexOfLastData2 = pageNumber2 * dataPerPage2;
    indexOfFirstData2 = indexOfLastData2 - dataPerPage2;
    currentData2 = data2.slice(indexOfFirstData2, indexOfLastData2);
  }


  return(

    <div className='bg-white'>
      <Header />
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none" >
        

      {/* <CSVLink target="_self" data={allData} filename={filename} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Export
            </CSVLink> */}
      </div>
      <div className='my-6 flex w-full justify-center '>
      <CloseTable className='position: absolute' data={currentData} />
      </div>
      <div>
      <Pagination 
        dataPerPage ={dataPerPage}
        totalData={data.length}
        paginate={paginate}
        pageNumber={pageNumber}
      />
      </div>
      <div className='my-6 flex w-full justify-center '>
      <CloseTable className='position: absolute' data={currentData2} />
      </div>
      <div>
      <Pagination 
        dataPerPage={dataPerPage2}
        totalData={data2.length}
        paginate={paginate2}
        pageNumber={pageNumber2}
      />
      </div>
    </div>
     
     );
    }//end of App
    
export default App