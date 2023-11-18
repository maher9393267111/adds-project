import React from 'react'
import SkeltonRow from './SkeltonRow'

export default function SkeltonTable() {

    const numberOfRows = 5;

    const renderedRows = [...Array(numberOfRows)].map((e, i) => (
      <div>
        <SkeltonRow />
      </div>
    ));


  return (
    <div>

{renderedRows}


    </div>
  )
}
