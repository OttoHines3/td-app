import axios from "axios";
import { noSSR } from "next/dynamic";
import {breakDownData} from "../../../utils/breakDownData"

const dataReady = false;
  
export async function getOptionData() {
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
            strikeCount: '20',
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
        strikeCount: '20',
        toDate: dateStr,
        contractType: 'ALL'
    }//end p2

   
    const res = await axios.request(options);

    const data = await res.data;
    let altData;

    altData = breakDownData(data,p2);

    return altData;
}//end of getOptionData


export default async function getAllOptions(req: any, res: any) {
    const data = await getOptionData();
    try {
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}