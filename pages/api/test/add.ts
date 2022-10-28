import connectMongo from '../../../utils/connectMongo';
import Option from '../../../models/optionModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

//stale connection
export default async function addTest(req:any, res: any) {
  
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');

    const option = await Option.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ option });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
