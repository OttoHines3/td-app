import getPastOps from './getPastOps';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 **/

let lastSearch : any = getPastOps(null, null);

const data = Object.keys(lastSearch).map((key) => {
    return lastSearch[key]
})

const {info} = data[0];

console.log(info);