import React from 'react';

const Filter = ({newFilter, handlecChange}) => {
    console.log(handlecChange)
    return(
<div>
filter shown with <input value = {newFilter} onChange={handlecChange}/>

</div>
    )
}














export default Filter