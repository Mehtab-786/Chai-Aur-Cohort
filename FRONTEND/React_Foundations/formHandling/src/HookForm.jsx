import React from 'react'
const ROLES = ["Frontend", "Backend", "AI Engineer"];
import {useForm} from 'react-hook-form'

function HookForm() {
  const {register, handleSubmit, watch, formState:{errors,isSubmitted,isSubmitting,submitCount,}} =  useForm({defaultValues:{name :"Mehtab"},mode:'onSubmit'})
  
  const submitHandler = (data) => {console.log(data)}
  
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label>
          Full name 
          <input type='text' {...register("name",{required:'Name is required'})}/>
          {errors.name && <span>{errors.name}</span>}
        </label>
        <label>
          Email 
          <input type='text' {...register("email",{required:'email is required'})}/>

        </label>
          <button type="submit" disabled={isSubmitting} >{
            isSubmitting ? 'Submitting...' : 'Submit'
} {submitCount} </button>
      </form>
    </div>
  )
}

export default HookForm