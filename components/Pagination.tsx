import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({
  dataPerPage,
  totalData,
  paginate,
  pageNumber,

} : any) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='py-2 -mt-px flex flex-wrap  place-content-center'>
    <div className='w-20'>
      <p className='text-sm text-gray-700'>
        <span className='font-small'>
          {" "}
          {pageNumber * dataPerPage - 10}{" "}
        </span>
        to
        <span className='font-small'> {pageNumber * dataPerPage} </span>
        of
        <span className='font-small'> {totalData} </span>
        results
      </p>
    </div>
    <nav className=''>
      <ul className=''>
        <li className="hidden md:-mt-px md:flex flex-wrap w-fit place-content-center">
          {pageNumbers.map((number) => (
            <a key={number}
              onClick={() => {
                paginate(number);
              }}
              href='#'
              className={
                pageNumber === number
                  ? "hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  : "hover:bg-gray-100 inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }
            >
              {number}
            </a>
            
          ))}
        </li>
      </ul>
    </nav>
  </div>
    
  )
}


















{/* <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          1
        </a>
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
    //       aria-current="page"
    //     >
    //       2
    //     </a>
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //     >
    //       3
    //     </a>
    //     <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
    //       ...
    //     </span>
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //     >
    //       8
    //     </a>
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //     >
    //       9
    //     </a>
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //     >
    //       10
    //     </a>
    //   </div>
    //   <div className="-mt-px flex w-0 flex-1 justify-end">
    //     <a
    //       href="#"
    //       className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //     >
    //       Next
    //       <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
    //     </a>
    //   </div>
    // </nav> */}