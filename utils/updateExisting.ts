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
   if(currCallInfo.length !=  newCallInfo.length) {
         console.log("hoessssss");
   }

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