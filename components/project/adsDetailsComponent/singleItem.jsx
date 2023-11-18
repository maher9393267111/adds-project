import { indexOf } from 'lodash'
import React from 'react'

export default function SingleItem({title , info}) {
  return (
    <div>
<div className="border-b mx-6 pb-2 border-[#ebedf2] dark:border-[#1b2e4b]">
                                <div className="flex items-center justify-between py-2">
                                  <div>
                                  <h6 className="font-semibold text-xl   text-[#515365] dark:text-white-dark">
                                        {title}
                                      
                                    </h6>
                                   
                                    <span className="block mt-2 text-white-dark dark:text-white-light">{info}</span>
                                  </div>
                                 




                                </div>
                            </div>




    </div>
  )
}
