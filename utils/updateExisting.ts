import { getOptionData } from "../pages/api/test/getAllOptions";
import { getDBOps } from "../pages/api/test/getPastOps";




export async function updateExisting() {
    let newData = await getOptionData();
    let currData =  await getDBOps();

    //remove layer of arrays
    let currCallInfo = currData[0].info[0].FINALCALLARR;
    let currPutInfo = currData[0].info[0].FINALPUTARR;
    let params = currData[0].info[0].params;
    //remove layer of arrays
    let newCallInfo = newData.FINALCALLARR;
    let newPutInfo = newData.FINALPUTARR;
 

    for (let i = 0; i < currCallInfo.length; i++) {
       if(currCallInfo[i].optionSymbol == newCallInfo[i].optionSymbol) {
           currCallInfo[i].openIntrestChange = newCallInfo[i].openIntrest - currCallInfo[i].openIntrest;
           currCallInfo[i].newOINumber = newCallInfo[i].openIntrest;
       }//end of if

       if(currPutInfo[i].optionSymbol == newPutInfo[i].optionSymbol) {
           currPutInfo[i].openIntrestChange = newPutInfo[i].openIntrest - currPutInfo[i].openIntrest;
           currPutInfo[i].newOINumber = newPutInfo[i].openIntrest;
       }//end of if
        
    }//end of for
   
    const solution ={currCallInfo, currPutInfo, params};

    return solution;
}//end of updateExisting