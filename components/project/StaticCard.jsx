import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function StaticCard({title , staticNimber , bgColor ,page  , params}) {
  return (
    <div className={`w-full md:w-[46%] cursor-pointer xl:w-[24%] mb-4 ml-2 min-h-[140px] bg-gradient-to-r ${bgColor} rounded-md  p-5`}>
       <Link href ={`/${page}?status=${params}`} >              
    <div className="flex items-center justify-between  text-white  pb-6">
        <p className="md:text-xl text-xl   font-semibold">{title}</p>
        {/* <h5 className="md:text-xl text-sm ltr:ml-auto rtl:mr-auto">
            <span className="text-white-light"></span>{staticNimber}
        </h5> */}
    </div>

<div>
  <p className=' text-white text-[42px] font-bold'>{staticNimber}</p>
</div>



    {/* <div className='mt-4 flex justify-between '>
        <p className='text-white text-2xl font-semibold'>view details</p>
   
    </div> */}
    </Link>   
</div>

  )
}
