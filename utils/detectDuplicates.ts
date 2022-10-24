import {OptionVar} from '../interfaces/index'

//function to detect duplicates in FINALCALLARR using the optionSymbol
export function detectDuplicates(temp : OptionVar, arr:OptionVar[])   
{  
    if(arr.length == 0) return false;
    for (let i = 0; i < arr.length; i++) {
      if(temp.optionSymbol == arr[i].optionSymbol) return true;
    }
    return false;

}//detectDuplicates
