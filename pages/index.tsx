import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Option {
  optionName: string;
  openI: number;
  volume: number;

}
 
let FINALCALLARR : Option[] = [];
let FINALPUTARR : Option[] =[];

const Home: NextPage = ({ data }) => {
  // const [optionData, setOptionData] = useState(null)
  if(data) console.log(data);
  


  
  

  const { callExpDateMap } = data
  const { putExpDateMap } = data

 if(callExpDateMap && putExpDateMap) getDATA(callExpDateMap,putExpDateMap);

   
  return (
    <div className={styles.container}>
      <p>Hello</p>

      <main className={styles.main}>
        {data !== null ?
          <>
            <p> Symbol: {data.symbol}</p>
            <p>number of contracts: {data.numberOfContracts}</p>
            <p>Underlying price: {data.underlyingPrice}</p>
          </>
           : <p>loading</p>}
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
}

export default Home


export async function getServerSideProps() {

  // Fetch data from external API
  const options = {
    method: 'GET',
    baseURL: 'https://api.tdameritrade.com/v1/marketdata/chains',
    params: { apikey: 'RQRUTEVH7G7QUR20Z7ITJYUEZRKTRAPD', 
    symbol: 'IWM', 
    strikeCount: '10', 
    toDate: '2022-10-28',
    contractType: 'ALL'
  
  },

    headers: {
      Bearer: 'v+RqqnmDJlivn9XD2THXOUx8V0nhpDgT2O/B14kaKBZnPuIJ9QqtSmyQqSjtErz9c68kutJdqQz4LhKawY2VfSv+i7mkkGl5Zgs+NMmLTJAF3qzk3QBBgARgQmxX4/XRIwC9ujTxCwQdcAz46IsG5CrRQmN6wGKHoOQO4G/vLDvEINUFkC7aXT6ZFVK7fcjRQWwMZ2a7p91LT/cB5JC9gQ0+Wbew7TUgECOCn2Cn1lhMDExeL/OrbqjLtFZ4TZEaWq/dv0tUybbctBtkMfR4shm81TVVu0WsgjWh1D36ECBaS+UVJFpNidCDaqfHbTVTPsJr4PzGSKfowg/WfA+8PmS7UNBlEIj841aVYJLbSO4yz8RPY1Bd+0PvZY1f8N5GF7esqww2NzvKITDYWId6n8K2+izbvqPf+uI7nNwZS8FvMepCa95rP7LJr5yvsFGUeT2cyrfG+jq7hdon/S66ljI4aE4daQvhIIyCXgclYSOqWYAcEfeRMhEGod2R+auy2sO0nnEbBg07qL2CIftoGukquDBV34GCefUKz100MQuG4LYrgoVi/JHHvl0kJyiRT467wXfQ49WPRJfOLVGIvhzBd/J1009hoiVIN4Q6KATT6d6t50T1Oc9CRpxmt8uMFDRKF1EjryNOjI0GmeYfuBK2KDZxw+nPAOCZF4+Eftk8k7mULncMgE8cxFNp8me4bc9TFbVUN6bWyknrIMS/OEzMojPwCICv2id09x7FXN9k5ufuF2k2Ne9q/fZdgCpmMykbbgqHqjBOizGGhemfY4AFc4B8xs3v7Zeu94YNeBF3oT10ec/zx33pw9odcSqXfB8cI0FLcYZBgODeqXjRPNqZwkluUoB9TLbmng1+zDQDvqIdWIczijDFKBHoT55hoLjWJcWW1mbL5CU+5+H5NGt7P70AR+YUZm6X9J3ZDJ5SEwZvdUzK87ceSnvBND4cdVVOnYmQSnmVjCjkuaKYiv073oR5Cpe3dtwcWpRJn27Gum/gFVERdM5uKI/wmxSuMsKwWZBroSHHgTc++5e4zh1DBjcLWpxIGzP2IUo9PHq4ysOnn7CgCodsNBtmhUKP86W2ZM/IetE78L+ouOOcBQdgW83sfzz4212FD3x19z9sWBHDJACbC00B75E',
      'Content-Type': 'application/json'
    }
  };

  const res = await axios.request(options);
  
  const data = await res.data


  // Pass data to the page via props
  return { props: { data } }
}


export function getDATA(callExpDateMap: any, putExpDateMap: any){

    // get the Array of Expiration Dates for Calls and Puts 
    const callExpiries = Object.keys(callExpDateMap).map((key) => {
      return callExpDateMap[key]
    })
  
    const putExpiries = Object.keys(putExpDateMap).map((key) => {
      return putExpDateMap[key]
    })
  
    for (let i = 0; i < Object.keys(callExpiries).length; i++) {
      const callStrikePrices: object = callExpiries[i]
      for (let j = 0; j < Object.keys(callStrikePrices).length; j++) {
    
        const optionData: object = Object.entries(callStrikePrices)[j]
        
        Object.entries(optionData)[1].map((entry) => {
          const {openInterest, totalVolume, description}  = entry[0]
          let tempOption: Option = {optionName:"temp", openI:-1, volume:-1};
          tempOption.optionName = description;
          tempOption.openI = openInterest;
          tempOption.volume = totalVolume;
          if(tempOption) FINALCALLARR.push(tempOption);
        }) //Object.entries  
      
      }//for j
    }// for i
  
    for (let i = 0; i < Object.keys(putExpiries).length; i++) {
      const putStrikePrices: object = putExpiries[i]
      for (let j = 0; j < Object.keys(putStrikePrices).length; j++) {
        const optionData: object = Object.entries(putStrikePrices)[j]
        Object.entries(optionData)[1].map((entry) => {
          const {openInterest, totalVolume, description}  = entry[0]
          let tempOption: Option = {optionName:"temp", openI:-1, volume:-1};
          tempOption.optionName = description;
          tempOption.openI = openInterest;
          tempOption.volume = totalVolume;
          if(tempOption) FINALPUTARR.push(tempOption);
        }) //Object.entries  
  
      }//for j
    }// for i

    if(FINALCALLARR) console.log("Final Calls: ", FINALCALLARR);
    if(FINALPUTARR) console.log("Final Puts: ", FINALPUTARR);
}