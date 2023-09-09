import React, { useEffect, useState } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {Formik, Form} from 'formik';
import TextField from './TextField';
import TextArea from './TextArea';
import * as Yup from 'yup';

const Edit = () => {
    const navigate = useNavigate();
    const [userdata, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect( ()=>{
        getUserDetail(id)
    },[id])
    const validate = Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        age: Yup.number().integer('Age must be an integer').required('Age is required'),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
        work: Yup.string().required('Work is required'),
        address: Yup.string().required('Address is required'),
        description: Yup.string().required('Description is required'),
    });

    const getUserDetail = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            console.log(response.data);
            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    }

    const updateUser = async (formData, resetForm) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${formData.id}`, formData);
            toast.success("Data updated successfully");
            resetForm();
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data);
            }else if(error.response && error.response.status === 400){
                console.log(error);
                toast.error(error.response.data);
            } else {
                toast.error("Error saving data");
            }
        }
    }

    return (
        loading ? (
             <div></div>
         ) :  
        <Formik
         initialValues={{
                id: userdata ? userdata._id : '',
                name: userdata ? userdata.name : '',
                email: userdata ? userdata.email : '',
                age: userdata ? userdata.age : '',
                mobile: userdata ? userdata.mobile : '',
                work: userdata ? userdata.work : '',
                address: userdata ? userdata.address : '',
                description: userdata ? userdata.description : '',
                }}

            validationSchema={validate}

            onSubmit={(values, { resetForm }) => {
                updateUser(values, resetForm);
            }}
        >
            <>
                <div className='container mt-5'>
                  
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
                            <button type="submit" className="btn btn-primary mt-4">Update</button>
                        </div>
                    </Form>
                </div>
            </>
        </Formik>
    )
}

export default Edit