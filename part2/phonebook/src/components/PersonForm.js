import React from 'react';

const PersonForm = ({addPers, handleaChange, handlebChange, content, numb}) => {
    console.log(handleaChange, handlebChange)
    return(
  <form onSubmit={addPers}>
       

<div>
  name: <input value = {content} onChange={handleaChange}/>
  <div>number: <input value = {numb} onChange={handlebChange}/></div>
</div>
<div>
  <button type="submit">add</button>
</div>
</form>
    )
}
















export default PersonForm