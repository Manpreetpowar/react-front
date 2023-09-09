import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from './CommonFunction';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
// import './Home.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


// const SkeletonLoading = () => {
//     return (
//       <div className="skeleton-loading mt-5">
//         <Skeleton height={30} width={1200} style={{ marginBottom: '10px' }} />
//         <Skeleton height={30} width={1110} style={{ marginBottom: '10px' }} />
//         <Skeleton height={30} width={1023} style={{ marginBottom: '10px' }} />
//         <Skeleton height={30} width={1140} style={{ marginBottom: '10px' }} />
//         <Skeleton height={30} width={1180} style={{ marginBottom: '10px' }} />
//       </div>
//     );
//   };


const Home = () => {
    useEffect(() => {
        getUsers();

    }, []);

    const [users, setUsers] = useState([]);
    const [filterRecords, setFilterRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/getUsers');
            setUsers(response.data);
            setFilterRecords(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }



    // Handle delete wala code
    const handleDelete = async (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteUser(userId).then(() => {
                        getUsers();
                        toast.success('User has been deleted successfully');
                    });
                } catch (error) {
                    toast.error(error.message);
                    console.log(error.message);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Handle the cancel action (user clicked "No")
                //   Swal.fire('Cancelled', 'Your data is safe.', 'error');
            }
        });
    };

    //DATATABLE CODE STARTS****************
    const column = [
        {
            name: "Id",
            selector: (row, index) => index + 1,
            sortable: false
        },
        {
            name: "Username",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Age",
            selector: row => row.age,
            sortable: true
        },
        {
            name: "Mobile",
            selector: row => row.mobile,
            sortable: true
        },
        {
            name: "Job",
            selector: row => row.work,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <Link className='btn btn-success' to={`/user/${row._id}`}><RemoveRedEyeIcon /></Link>&nbsp;&nbsp;
                    <Link className='btn btn-primary' to={`/edit/${row._id}`}><CreateIcon /></Link>&nbsp;&nbsp;
                    <Link className='btn btn-danger' onClick={() => handleDelete(row._id)} ><DeleteOutlineIcon /></Link>
                </>
            )
        }
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
                {loading ? (
                    <div className='mt-5'><Skeleton count={10}  style={{ marginTop: '10px' }} className="custom-skeleton" />
                    </div>
        ) : ( 
                    <DataTable
                        columns={column}
                        data={users}
                        pagination
                        fixedHeader
                        highlightOnHover
                        subHeader
                        // theme="solarized"
                        // selectableRowsHighlight
                        // selectableRows
                        // expandableRows
                        // expandableRowsComponent={ExpandedComponent}
                        subHeaderComponent={
                            <input type='text' placeholder='Search Here' onChange={handleFilter} />
                        }
                    >
                    </DataTable>
                )}
                </div>

            </div>
        </div>
    )
}

export default Home