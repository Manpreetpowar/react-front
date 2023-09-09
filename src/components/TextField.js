import React from "react";
import {ErrorMessage, useField} from 'formik';

const TextField = ({label, ...props}) => {

    const [field, meta] = useField(props);
//    console.log(field);
//    console.log(props);
  return (
        <div className="mb-3 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 col-12">  
            <label htmlFor={field.name}>{label}</label>
            <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}` } 
                {...field} {...props}
                autoComplete="off"
             />  
             <ErrorMessage component="div" name={field.name} className="error"/>   
        </div>
  )
}

export default TextField