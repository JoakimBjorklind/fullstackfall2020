import React from 'react';

const PersonForm = ({addPers, handleaChange, handlebChange, name, number}) => {
    console.log(handleaChange, handlebChange)
    return(
  <form onSubmit={addPers}>
       

<div>
  name: <input value = {name} onChange={handleaChange}/>
  <div>number: <input value = {number} onChange={handlebChange}/></div>
</div>
<div>
  <button type="submit">add</button>
</div>
</form>
    )
}
















export default PersonForm