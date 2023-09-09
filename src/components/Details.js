import React, { useEffect, useState } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import UserImage from '../../src/user.png';
import axios from 'axios';
import {deleteUser} from './CommonFunction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Details = () => {
    const { id } = useParams();
    const [userdata, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getUserDetail = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            // console.log(response.data);
            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetail(id);
    }, [id]);

    const handleDelete = async (userId) => {
      
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
       
       if (confirmDelete) {
               try {
                await deleteUser(userId);
                  
                   toast.success('User has been deleted successfully');
                   navigate('/');
               } catch (error) {
                   toast.error(error.message);
                   console.log(error.message);
               }
              
       }
     };
     
    return (
        <div className='container mt-5'>
            <h1 style={{ fontWeight: 400 }}>Welcome {userdata ? userdata.name : <Skeleton height={20} width={427} style={{ marginBottom: '10px' }}/>}</h1>
            {loading ? (
                <p><Skeleton height={20} width={600} style={{ marginBottom: '10px' }} count={8}/></p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : userdata ? (
                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <div className='row'>
                            <div className='add_btn'>
                                <Link className='btn btn-primary mx-2' to={`/edit/${userdata._id}`}><CreateIcon /></Link>
                                <Link className='btn btn-danger' onClick={() => handleDelete(userdata._id)}><DeleteOutlineIcon /></Link>
                            </div>
                            <div className='left_view col-lg-6 col-md-6 col-12'>
                                <img src={UserImage} alt="user" style={{ width: 50 }} />
                                <h3 className='mt-3'>Name: <span>{userdata.name}</span></h3>
                                <h3 className='mt-3'>Age: <span>{userdata.age}</span></h3>
                                <p className='mt-3'><MailOutlineIcon />Email: <span>{userdata.email}</span></p>
                                <p className='mt-3'><WorkIcon />Occupation: <span>{userdata.work}</span></p>
                            </div>
                            <div className='right_view col-lg-6 col-md-6 col-12'>

                                <p className='mt-4'><MobileScreenShareIcon /> Mobile <span>{userdata.mobile}</span></p>
                                <p className='mt-3'><FmdGoodIcon /> Location <span>{userdata.address}</span></p>
                                <p className='mt-3'>Description <span>{userdata.description}</span></p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ) : 'Loading...'}
        </div>
    )
}

export default Details;
