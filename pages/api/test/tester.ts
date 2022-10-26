import { updateExisting } from "../../../utils/updateExisting";

export default async function tester(req:any, res: any) {
   const data =  await updateExisting();
    try {
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}