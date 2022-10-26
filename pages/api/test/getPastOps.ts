import connectMongo from '../../../utils/connectMongo';
import Altered from '../../../models/alteredOptionModel';

export async function getDBOps() {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const cursor =  Altered.find();
    const data = await cursor.exec();

    return data;

}//end of getDBOps

export default async function getPastOps(req:any, res: any) {
    const data = await getDBOps();
    try {
        res.status(200).json("data");
    } 
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}
        