import {OptionVar} from '../interfaces/index'
import {detectDuplicates} from "./detectDuplicates"

  
  let FINALCALLARR : OptionVar[] = [];
  let FINALPUTARR : OptionVar[] =[];
 
 const dataReady = false;

 //Break down the data from thinkorswim API
 export function breakDownData(data: any, params: any){
    const { callExpDateMap } = data
    const { putExpDateMap } = data
  
    // get the Array of Expiration Dates for Calls and Puts 
    const callExpiries = Object.keys(callExpDateMap).map((key) => {
      return callExpDateMap[key]
    })//end of callExpiries
    const putExpiries = Object.keys(putExpDateMap).map((key) => {
      return putExpDateMap[key]
    })//end of putExpiries
    
    // get the Array of Strikes for Calls 
    for (let i : number = 0; i < Object.keys(callExpiries).length; i++) {
      const callStrikePrices = Object.keys(callExpiries[i]).map((key) => {
        return callExpiries[i][key]
      })//end of callStrikePrices

      for (let j : number = 0; j < Object.keys(callStrikePrices).length; j++) {
        const optionData = Object.keys(callStrikePrices[0]).map((key) => {
          return callStrikePrices[j][key]  
        })//end of optionData
          let tempOption: OptionVar = {optionName:"temp", openInterest:-1, volume:-1, inTheMoney:false, optionSymbol: "temp", newOINumber:-1, openInterestChange: -1};
          tempOption.optionName = optionData[0].description;
          tempOption.openInterest = optionData[0].openInterest;
          tempOption.volume = optionData[0].totalVolume;
          tempOption.inTheMoney = optionData[0].inTheMoney;
          tempOption.optionSymbol = optionData[0].symbol;
          if(!detectDuplicates(tempOption,FINALCALLARR)){
             FINALCALLARR.push(tempOption);
            //  console.log("FINALCALLARR: ", FINALCALLARR)
          }
      }//for j
    }// for i
  
    //get the Array of Strikes for Puts
    for (let i : number = 0; i < Object.keys(putExpiries).length; i++) {
      const putStrikePrices = Object.keys(putExpiries[i]).map((key) => {
        return putExpiries[i][key]
      })//end of putStrikePrices
      for (let j : number = 0; j < Object.keys(putStrikePrices).length; j++) {
        const optionData = Object.keys(putStrikePrices[0]).map((key) => {
          return putStrikePrices[j][key]
        })//end of optionData
          let tempOption: OptionVar = {optionName:"temp", openInterest:-1, volume:-1, inTheMoney:false, optionSymbol: "temp", newOINumber:-1, openInterestChange: -1}
          tempOption.optionName = optionData[0].description;
          tempOption.openInterest = optionData[0].openInterest;
          tempOption.volume = optionData[0].totalVolume;
          tempOption.inTheMoney = optionData[0].inTheMoney;
          tempOption.optionSymbol = optionData[0].symbol;
          if(!detectDuplicates(tempOption, FINALPUTARR)) {
            FINALPUTARR.push(tempOption) 
            // console.log("FINALPUTARR: ",FINALPUTARR)
          }
      }//for j
    }// for i
    
    
    // if(FINALCALLARR) console.log("Final Calls: ", FINALCALLARR);
    // if(FINALPUTARR) console.log("Final Puts: ", FINALPUTARR);

    return {FINALCALLARR, FINALPUTARR, params}
  }//breakDownData