import React from 'react';
import { useParams } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import UserImage from '../../src/user.png';
const Details = () => {
    const { id } = useParams();
    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Welcome Manpreet Puar</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className='row'>
                    <div className='add_btn'>
                                <button className='btn btn-primary mx-2'><CreateIcon /></button>
                                <button className='btn btn-danger'><DeleteOutlineIcon /></button>
                            </div>
                        <div className='left_view col-lg-6 col-md-6 col-12'>
                
                            <img src={UserImage} alt="image" style={{ width: 50 }} />
                            <h3 className='mt-3'>Name: <span>Manpreet Puar</span></h3>
                            <h3 className='mt-3'>Age: <span>21</span></h3>
                            <p className='mt-3'><MailOutlineIcon />Email: <span>powar086@gmail.com</span></p>
                            <p className='mt-3'><WorkIcon />Occupation: <span>Engineer</span></p>
                        </div>
                        <div className='right_view col-lg-6 col-md-6 col-12'>
                         
                            <p className='mt-4'><MobileScreenShareIcon /> Mobile <span>+91 8968514555</span></p>
                            <p className='mt-3'><FmdGoodIcon /> Location <span>Mohali</span></p>
                            <p className='mt-3'>Description <span>this is testb f dsf dfkj kdsfd fjgdsjfjdsjkfksd</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details