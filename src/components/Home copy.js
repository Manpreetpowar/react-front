import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {deleteUser} from './CommonFunction';
import DataTable from 'react-data-table-component';

const Home = () => {
    useEffect(()=>{
        getUsers();
        
    },[]);

    const [users, setUsers] = useState([]);
    const [filterRecords, setFilterRecords] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state


    const getUsers = async () =>{
            try {
              const response =  await axios.get('http://localhost:5000/api/users/getUsers');
              setUsers(response.data);
              setFilterRecords(response.data);
              setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
    } 
   
    // Handle delete wala code
    const handleDelete = async (userId) => { 
         const confirmDelete = window.confirm("Are you sure you want to delete this item?");
         if (confirmDelete) {
                try {
                   await deleteUser(userId);
                    getUsers();
                    toast.success('User has been deleted successfully');
                } catch (error) {
                    toast.error(error.message);
                    console.log(error.message);
                }
               
        }
      };

      //DATATABLE CODE STARTS****************
      const column = [
        {
            name : "Id",
            selector:  (row, index) => index + 1,
            sortable:false
        },
        {
            name : "Username",
            selector: row => row.name,
            sortable:true
        },
        {
            name : "Email",
            selector: row => row.email,
            sortable:true
        },
        {
            name : "Age",
            selector: row => row.age,
            sortable:true
        },
        {
            name : "Mobile",
            selector: row => row.mobile,
            sortable:true
        },
        {
            name : "Job",
            selector: row => row.work,
            sortable:true
        },

      ];


      const handleFilter = (event) => {
        const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setUsers(newData);
       
    }

      //DATATABLE CODE ENDS******************
    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2'>
                    <Link to="/register" className='btn btn-primary'>Add Data</Link>
                </div>
              
                <div className='mt-4'>
                <div style={{display:'flex', justifyContent:'right'}}>
                    <input type="text" placeholder='Serach...' onChange={handleFilter} style={{padding:'6px, 10px'}}/>
                </div>
                <DataTable
                columns={column}
                data={users}
                pagination
                selectableRows
                fixedHeader
                 selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    // subHeaderComponent={
                    //     <input type='text' placeholder='Search Here' value={search} onChange={(e) => setSearch(e.target.value)} />
                    // }
                >
                </DataTable>
                </div>
                {/* <table className="table mt-2">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Id</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                                    <tr>
                                        <td colSpan="6" className='text-center'>Loading...</td>
                                    </tr>
                               ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className='text-center'>Data Not Found</td>
                                    </tr>
                                ) : (
                     users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.work}</td>
                                <td>{user.mobile}</td>
                                <td className='d-flex justify-content-right'>
                                <Link className='btn btn-success' to={`/user/${user._id}`}><RemoveRedEyeIcon/></Link>&nbsp;&nbsp;
                                <Link className='btn btn-primary' to={`/edit/${user._id}`}><CreateIcon/></Link>&nbsp;&nbsp;
                                <Link className='btn btn-danger'  onClick={() => handleDelete(user._id)} ><DeleteOutlineIcon/></Link>
                                </td>
                            </tr>
                            ))
                            )}
                    
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}

export default Home