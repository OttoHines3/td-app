import { getDBOps } from "../pages/api/test/getPastOps";
import axios from "axios";
import { breakDownData } from "./breakDownData";

export async function getOptionData2() {
    //get a month from now
    let monthFromNow: Date = new Date();
    monthFromNow.setMonth(monthFromNow.getMonth() + 1);
    //get day of month from now
    let dayOfMonth: number = monthFromNow.getDate();
    //get month of month from now
    let month: number = monthFromNow.getMonth() + 1;
    //get year of month from now
    let year: number = monthFromNow.getFullYear();

   
    
    const dateStr = String(year) + '-' + String(month) + '-' + String(dayOfMonth);
    console.log(dateStr);

    // Fetch data from external API
    const options = {
        method: 'GET',
        baseURL: 'https://api.tdameritrade.com/v1/marketdata/chains',
        params: {
            apikey: process.env.API_KEY,
            symbol: 'IWM',
            toDate: dateStr,
            contractType: 'ALL'

        },

        headers: {
            Bearer: process.env.BEARER,
            'Content-Type': 'application/json'
        }//headers
    };//options


//to save the search parameters for the next time the user searches
   let p2= {
        symbol: 'IWM',
        toDate: dateStr,
        contractType: 'ALL'
    }//end p2

   
    const res = await axios.request(options);

    const data = await res.data;
    let altData;

    altData = breakDownData(data,p2);

    return altData;
}//end of getOptionData



export async function updateExisting() {
    let newData = await getOptionData2();
    let currData =  await getDBOps();

    //remove layer of arrays
    let currCallInfo = currData[0].info[0].FINALCALLARR;
    let currPutInfo = currData[0].info[0].FINALPUTARR;
    let params = currData[0].info[0].params;
    //remove layer of arrays
    let newCallInfo = newData.FINALCALLARR;
    let newPutInfo = newData.FINALPUTARR;
 

    for (let i = 0; i < currCallInfo.length; i++) {
        //find matching option in new data
        let match = newCallInfo.find((option : any) => {
            return option.optionSymbol == currCallInfo[i].optionSymbol;
        });
        if (match) {
            //update openInterestChange and newOINumber
            currCallInfo[i].openInterestChange = match.openInterest - currCallInfo[i].openInterest;
            currCallInfo[i].newOINumber = match.openInterest;
        }else {
            console.log("no match");
            currCallInfo[i].openInterestChange = -111111111111111111111;

            
        }
        //find matching option in new data
        let match2 = newPutInfo.find((option : any) => {
            return option.optionSymbol == currPutInfo[i].optionSymbol;
        });

        if (match2) {
            //update openInterestChange and newOINumber
            currPutInfo[i].openInterestChange = match2.openInterest - currPutInfo[i].openInterest;
            currPutInfo[i].newOINumber = match2.openInterest;
        }else{
            console.log("no match");
            currPutInfo[i].openInterestChange = -111111111111111111111;
        }
        
    }//end of for

    // //for loop to console log the changes
    // for (let i = 0; i < currCallInfo.length; i++) {
    //     console.log("currCallInfo[i].openInterestChange: ", currCallInfo[i].openInterestChange);
        
    // }//end of for
  

    //combine arrays
    let finalArr = currCallInfo.concat(currPutInfo);
   
    // const solution ={currCallInfo, currPutInfo};
    
    

    return finalArr;
}//end of updateExisting