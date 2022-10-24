import connectMongo from '../../../utils/connectMongo';
import Altered from '../../../models/alteredOptionModel';


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 **/

export default async function getPastOps(req:any, res: any) {
    try {
        
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        
        const cursor = Altered.find({})
        const data = await cursor.exec();
        console.log(data);

        res.status(200).json({data});
        return data;
    } 
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}
        