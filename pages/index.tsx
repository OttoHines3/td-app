import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import FormData from 'form-data'
import addTest from './api/test/add'
import { useEffect, useState } from 'react'


//Start of Page
const Home: NextPage = () => {
  const [optionData, setOptionData] = useState(null)

  
  // if(data) console.log(data);
  
  // const { callExpDateMap } = data
  // const { putExpDateMap } = data

//  if(callExpDateMap && putExpDateMap) breakDownData(callExpDateMap,putExpDateMap);

   
  return (
    <div className={styles.container}>
      <p>Hello</p>

      <main className={styles.main}>
        {/* {data !== null ?
          <>
            <p> Symbol: {data.symbol}</p>
            <p>number of contracts: {data.numberOfContracts}</p>
            <p>Underlying price: {data.underlyingPrice}</p>
          </>
           : <p>loading</p>} */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}//end of Home

export default Home


// export async function getServerSideProps() {

//   // Fetch data from external API
//   const options = {
//     method: 'GET',
//     baseURL: 'https://api.tdameritrade.com/v1/marketdata/chains',
//     params: { apikey: 'RQRUTEVH7G7QUR20Z7ITJYUEZRKTRAPD', 
//     symbol: 'IWM', 
//     strikeCount: '1', 
//     toDate: '2022-11-4',
//     contractType: 'ALL'
  
//   },

//     headers: {
//       Bearer: 'v+RqqnmDJlivn9XD2THXOUx8V0nhpDgT2O/B14kaKBZnPuIJ9QqtSmyQqSjtErz9c68kutJdqQz4LhKawY2VfSv+i7mkkGl5Zgs+NMmLTJAF3qzk3QBBgARgQmxX4/XRIwC9ujTxCwQdcAz46IsG5CrRQmN6wGKHoOQO4G/vLDvEINUFkC7aXT6ZFVK7fcjRQWwMZ2a7p91LT/cB5JC9gQ0+Wbew7TUgECOCn2Cn1lhMDExeL/OrbqjLtFZ4TZEaWq/dv0tUybbctBtkMfR4shm81TVVu0WsgjWh1D36ECBaS+UVJFpNidCDaqfHbTVTPsJr4PzGSKfowg/WfA+8PmS7UNBlEIj841aVYJLbSO4yz8RPY1Bd+0PvZY1f8N5GF7esqww2NzvKITDYWId6n8K2+izbvqPf+uI7nNwZS8FvMepCa95rP7LJr5yvsFGUeT2cyrfG+jq7hdon/S66ljI4aE4daQvhIIyCXgclYSOqWYAcEfeRMhEGod2R+auy2sO0nnEbBg07qL2CIftoGukquDBV34GCefUKz100MQuG4LYrgoVi/JHHvl0kJyiRT467wXfQ49WPRJfOLVGIvhzBd/J1009hoiVIN4Q6KATT6d6t50T1Oc9CRpxmt8uMFDRKF1EjryNOjI0GmeYfuBK2KDZxw+nPAOCZF4+Eftk8k7mULncMgE8cxFNp8me4bc9TFbVUN6bWyknrIMS/OEzMojPwCICv2id09x7FXN9k5ufuF2k2Ne9q/fZdgCpmMykbbgqHqjBOizGGhemfY4AFc4B8xs3v7Zeu94YNeBF3oT10ec/zx33pw9odcSqXfB8cI0FLcYZBgODeqXjRPNqZwkluUoB9TLbmng1+zDQDvqIdWIczijDFKBHoT55hoLjWJcWW1mbL5CU+5+H5NGt7P70AR+YUZm6X9J3ZDJ5SEwZvdUzK87ceSnvBND4cdVVOnYmQSnmVjCjkuaKYiv073oR5Cpe3dtwcWpRJn27Gum/gFVERdM5uKI/wmxSuMsKwWZBroSHHgTc++5e4zh1DBjcLWpxIGzP2IUo9PHq4ysOnn7CgCodsNBtmhUKP86W2ZM/IetE78L+ouOOcBQdgW83sfzz4212FD3x19z9sWBHDJACbC00B75E',
//       'Content-Type': 'application/json'
//     }
//   };

//   const res = await axios.request(options);
  
//   const data = await res.data


//   // Pass data to the page via props
//   return { props: { data } }
// }//end of getServerSideProps


//  //Break down the data from thinkorswim API
//  function breakDownData(callExpDateMap: any, putExpDateMap: any){

//     // get the Array of Expiration Dates for Calls and Puts 
//     const callExpiries = Object.keys(callExpDateMap).map((key) => {
//       return callExpDateMap[key]
//     })//end of callExpiries
//     const putExpiries = Object.keys(putExpDateMap).map((key) => {
//       return putExpDateMap[key]
//     })//end of putExpiries
    
//     // get the Array of Strikes for Calls 
//     for (let i : number = 0; i < Object.keys(callExpiries).length; i++) {
//       const callStrikePrices = Object.keys(callExpiries[i]).map((key) => {
//         return callExpiries[i][key]
//       })//end of callStrikePrices
//       for (let j : number = 0; j < Object.keys(callStrikePrices).length; j++) {
//         const optionData = Object.keys(callStrikePrices[0]).map((key) => {
//           return callStrikePrices[j][key]  
//         })//end of optionData
//           let tempOption: Option = {optionName:"temp", openI:-1, volume:-1, inTheMoney:false, optionSymbol: "temp"}
//           tempOption.optionName = optionData[0].description;
//           tempOption.openI = optionData[0].openInterest;
//           tempOption.volume = optionData[0].totalVolume;
//           tempOption.inTheMoney = optionData[0].inTheMoney;
//           tempOption.optionSymbol = optionData[0].symbol;
//           if(!detectDuplicates(tempOption,FINALCALLARR)){
//              FINALCALLARR.push(tempOption);
//              console.log("FINALCALLARR: ", FINALCALLARR)
//           }
//       }//for j
//     }// for i

//     //get the Array of Strikes for Puts
//     for (let i : number = 0; i < Object.keys(putExpiries).length; i++) {
//       const putStrikePrices = Object.keys(putExpiries[i]).map((key) => {
//         return putExpiries[i][key]
//       })//end of putStrikePrices
//       for (let j : number = 0; j < Object.keys(putStrikePrices).length; j++) {
//         const optionData = Object.keys(putStrikePrices[0]).map((key) => {
//           return putStrikePrices[j][key]
//         })//end of optionData
//           let tempOption: Option = {optionName:"temp", openI:-1, volume:-1, inTheMoney:false, optionSymbol: "temp"}
//           tempOption.optionName = optionData[0].description;
//           tempOption.openI = optionData[0].openInterest;
//           tempOption.volume = optionData[0].totalVolume;
//           tempOption.inTheMoney = optionData[0].inTheMoney;
//           tempOption.optionSymbol = optionData[0].symbol;
//           if(!detectDuplicates(tempOption, FINALPUTARR)) {
//             FINALPUTARR.push(tempOption) 
//             console.log("FINALPUTARR: ",FINALPUTARR)
//           }
//       }//for j
//     }// for i
    
    
//     if(FINALCALLARR) console.log("Final Calls: ", FINALCALLARR);
//     if(FINALPUTARR) console.log("Final Puts: ", FINALPUTARR);

//     //hitDatabase();

// }//breakDownData

// // function to hit the database and insert the data
//  async function hitDatabase() {
//   for (let i = 0; i < FINALCALLARR.length; i++) {
//     const options = {
//       method: 'POST',
//       url: 'http://localhost:3000/api/test/add',
//       headers: {'Content-Type': 'application/json'},
//       data: {
//         optionSymbol: FINALCALLARR[i].optionSymbol,
//         optionName: FINALCALLARR[i].optionName,
//         openInterest: FINALCALLARR[i].openI,
//         volume: FINALCALLARR[i].volume 
//       }//data
//     };//options

//     const res = await axios.request(options).then(function (response) {
//       console.log(response.data);
//     }).catch(function (error) {
//       console.error(error);
//     });//axios
//   }//for i
// }//hitDatabase

// //store the raw data in the database
// async function storeRawData(arr : Option[]){

//   const options = {
//     method: 'POST',
//     url: 'http://localhost:3000/api/test/addOption',
//     headers: {'Content-Type': 'application/json'},
//     data: {
//       info: arr,
//     }//data
//   }

//   const res = await axios.request(options)
//   .then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });//axios

// }//storeRawData

// //function to detect duplicates in FINALCALLARR using the optionSymbol
// function detectDuplicates(temp : Option, arr:Option[])   
// {  
//     if(arr.length == 0) return false;
//     for (let i = 0; i < arr.length; i++) {
//       if(temp.optionSymbol == arr[i].optionSymbol) return true;
//     }
//     return false;

// }//detectDuplicates