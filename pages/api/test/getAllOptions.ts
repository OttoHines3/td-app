import axios from "axios";
import {breakDownData} from "../../../utils/breakDownData"
  
export async function getOptionData() {
    // Fetch data from external API
    const options = {
        method: 'GET',
        baseURL: 'https://api.tdameritrade.com/v1/marketdata/chains',
        params: {
            apikey: '',
            symbol: 'IWM',
            strikeCount: '10',
            toDate: '2022-11-4',
            contractType: 'ALL'

        },

        headers: {
            Bearer: 'v+RqqnmDJlivn9XD2THXOUx8V0nhpDgT2O/B14kaKBZnPuIJ9QqtSmyQqSjtErz9c68kutJdqQz4LhKawY2VfSv+i7mkkGl5Zgs+NMmLTJAF3qzk3QBBgARgQmxX4/XRIwC9ujTxCwQdcAz46IsG5CrRQmN6wGKHoOQO4G/vLDvEINUFkC7aXT6ZFVK7fcjRQWwMZ2a7p91LT/cB5JC9gQ0+Wbew7TUgECOCn2Cn1lhMDExeL/OrbqjLtFZ4TZEaWq/dv0tUybbctBtkMfR4shm81TVVu0WsgjWh1D36ECBaS+UVJFpNidCDaqfHbTVTPsJr4PzGSKfowg/WfA+8PmS7UNBlEIj841aVYJLbSO4yz8RPY1Bd+0PvZY1f8N5GF7esqww2NzvKITDYWId6n8K2+izbvqPf+uI7nNwZS8FvMepCa95rP7LJr5yvsFGUeT2cyrfG+jq7hdon/S66ljI4aE4daQvhIIyCXgclYSOqWYAcEfeRMhEGod2R+auy2sO0nnEbBg07qL2CIftoGukquDBV34GCefUKz100MQuG4LYrgoVi/JHHvl0kJyiRT467wXfQ49WPRJfOLVGIvhzBd/J1009hoiVIN4Q6KATT6d6t50T1Oc9CRpxmt8uMFDRKF1EjryNOjI0GmeYfuBK2KDZxw+nPAOCZF4+Eftk8k7mULncMgE8cxFNp8me4bc9TFbVUN6bWyknrIMS/OEzMojPwCICv2id09x7FXN9k5ufuF2k2Ne9q/fZdgCpmMykbbgqHqjBOizGGhemfY4AFc4B8xs3v7Zeu94YNeBF3oT10ec/zx33pw9odcSqXfB8cI0FLcYZBgODeqXjRPNqZwkluUoB9TLbmng1+zDQDvqIdWIczijDFKBHoT55hoLjWJcWW1mbL5CU+5+H5NGt7P70AR+YUZm6X9J3ZDJ5SEwZvdUzK87ceSnvBND4cdVVOnYmQSnmVjCjkuaKYiv073oR5Cpe3dtwcWpRJn27Gum/gFVERdM5uKI/wmxSuMsKwWZBroSHHgTc++5e4zh1DBjcLWpxIGzP2IUo9PHq4ysOnn7CgCodsNBtmhUKP86W2ZM/IetE78L+ouOOcBQdgW83sfzz4212FD3x19z9sWBHDJACbC00B75E',
            'Content-Type': 'application/json'
        }//headers
    };//options
//to save the search parameters for the next time the user searches
   let p2= {
        symbol: 'IWM',
        strikeCount: '10',
        toDate: '2022-11-4',
        contractType: 'ALL'
    }//end p2

    const res = await axios.request(options);

    const data = await res.data;
    const altData = breakDownData(data, p2);
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