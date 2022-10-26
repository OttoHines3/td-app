import getPastOps from './getPastOps';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 **/
let res : any = {};
export
let lastSearch : any = getPastOps(null, res);

const data = Object.keys(lastSearch).map((key) => {
    return lastSearch[key]
})


console.log(data);