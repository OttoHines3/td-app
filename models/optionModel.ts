import { randomUUID } from 'crypto';
import { Schema, model, models } from 'mongoose';

const optionSchema = new Schema({
  _id: {
    type: String,
    default: randomUUID,
    unique: true,
  },
  optionSymbol: {
    type: String,
    required: true,
  },
  optionName: String,
  openInterest: Number,
  volume: Number,
  inTheMoney: Boolean,
  

});

const Option = models.Option || model('Option', optionSchema);

export default Option;
