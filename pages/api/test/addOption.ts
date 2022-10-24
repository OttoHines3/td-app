import connectMongo from '../../../utils/connectMongo';
import Altered from '../../../models/alteredOptionModel';
import axios from 'axios';
import {getOptionData} from "./getAllOptions"
import { OptionVar } from '../../../interfaces';



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function addRawData(req:any, res: any) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    
    const data = await getOptionData();
    const sendToDb = {
      info: data
    }
    
    await Altered.create(sendToDb);
  
    res.status(200).json({sendToDb});
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

