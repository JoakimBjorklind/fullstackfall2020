import React from 'react';

const PersonForm = ({addPers, handleaChange, handlebChange, newName, newNumber}) => {
    return(
  <form onSubmit={addPers}>
       

<div>
  name: <input value = {newName} onChange={handleaChange}/>
  <div>number: <input value = {newNumber} onChange={handlebChange}/></div>
</div>
<div>
  <button type="submit">add</button>
</div>
</form>
    )
}
















export default PersonForm