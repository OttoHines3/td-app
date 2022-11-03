
import flatten from 'lodash/flatten';
import Pagination from './Pagination';
import { OptionVar } from '../interfaces';
import React, { useEffect, useState } from 'react';
import {CSVLink} from 'react-csv'



  export default function CloseTable({data}: any) {

  

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{data[0] != undefined ? data[0].putOrCall+'S' : " "} Options Grinder</h1>
            <p className="mt-2 text-sm text-gray-700">
              Not Finiancial Adivce. Use at your own risk.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Symbol
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Expiration Date
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Strike Price
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Todays Open Interest
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Yesterdays Open Interest
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Open Interest Change
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Volume
                      </th> 
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
           
                    {data.map((data: any, idx: any) => (
                      <tr key={Math.random() + idx}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"> 
                          {data.optionName.substring(0,data.optionName.indexOf(' ')) + " " + data.putOrCall}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {data.optionName.substring(data.optionName.indexOf(' ') + 1, data.optionName.indexOf(' ') + 12)}
                        </td> 
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 text-center">{data.strikePrice}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{data.newOINumber}</td>
                         <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{data.openInterest}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{data.openInterestChange}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{data.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  