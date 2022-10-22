import { randomUUID } from 'crypto';
import { Schema, model, models } from 'mongoose';

const optionSchema = new Schema({
  optionName: String,
  openInterest: Number,
  volume: Number

});

const Option = models.Option || model('Option', optionSchema);

export default Option;
