import { Schema, model, models } from 'mongoose';
import { randomUUID } from 'crypto';



const alteredOptionSchema = new Schema({
    // _id: {
    //   type: String,
    //   default: randomUUID,
    //   unique: true,
    // },
   //create an attribute that is type array
    info: {
        type: Array,
    }
  });
  
  const alteredOption = models.alteredOption || model('Altered', alteredOptionSchema);
  
  export default alteredOption;