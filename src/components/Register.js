import React from 'react'
import { NavLink,useNavigate  } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {Formik, Form} from 'formik';
import TextField from './TextField';
import TextArea from './TextArea';
import * as Yup from 'yup';




const Register = () => {
    const navigate = useNavigate(); 
    const validate = Yup.object({
        name        : Yup.string().max(15, 'Must be 15 characters or less').required('Name is required'),
        email       : Yup.string().email('Email is invalid').required('Email is required'),
        age         : Yup.number().typeError('Age must be a number').integer('Age must be an integer').required('Age is required'),
        mobile      : Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
                    .required('Mobile number is required'),
        work        : Yup.string().required('Work is required'),
        address     : Yup.string().required('Address is required'),
        description : Yup.string().required('Description is required'), 

        // password : Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        // confirmPassword : Yup.string().oneOf([Yup.ref('password'), null], 'Password must be match with confirm password').required('Confirm password is required'), 

    });

    const addUser =  async(formData,resetForm) => {
      
        try {
             await axios.post('http://localhost:5000/api/users/register', formData);
             toast.success("Data saved successfully");
             resetForm();
             navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data);
            } else {
                toast.error("Error saving data");
            }
        }
    }
    return (
        <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: '',
                    mobile: '',
                    work: '',
                    address: '',
                    description: '',
                }}

                validationSchema={validate}

                onSubmit={(values, { resetForm }) => {
                     addUser(values,resetForm);
                }}
    >
        {/* {(formik) => ( */}
            <>
            <div className='container mt-5'>
              <NavLink to="/" >Home</NavLink>
                <Form>
                   <div className='row'>
                     <TextField label="Name" name="name" type="text"></TextField>
                     <TextField label="Email" name="email" type="email"></TextField>
                     <TextField label="Age" name="age" type="text"></TextField>
                     <TextField label="Mobile" name="mobile" type="text"></TextField>
                     <TextField label="Work" name="work" type="text"></TextField>
                     <TextField label="Address" name="address" type="text"></TextField>
                     <TextArea label="Description" name="description" type="text"></TextArea>
                     {/* <LinearProgress color="primary" /> */}
                     <button type="submit"  className="btn btn-primary mt-4">Submit</button>
                    </div>
                </Form> 
                </div>
            </>

        {/* )
        } */}
    </Formik>
       
    )
}

export default Register