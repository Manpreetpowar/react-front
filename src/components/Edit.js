import React,{useState} from 'react'
import {useParams} from 'react-router-dom';
const Edit = () => {

    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        address: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
  return (
    <>
    <div className='container'>
        
    <p>ID from URL: {id}</p>
        <form className='mt-4'>
            <div className='row'>
                <div className="mb-3 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name}
                        onChange={handleInputChange} />
                    <div id="emailHelp" className="form-text"></div>
                </div>


                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" value={formData.email}
                        onChange={handleInputChange} name="email" />
                    <div id="emailHelp" className="form-text"></div>
                </div>


                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                    <input type="text" className="form-control" value={formData.age}
                        onChange={handleInputChange} name="age" />
                    <div id="emailHelp" className="form-text"></div>
                </div>

                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mobile</label>
                    <input type="text" className="form-control" value={formData.mobile}
                        onChange={handleInputChange} name="mobile" />
                    <div id="emailHelp" className="form-text"></div>
                </div>


                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Work</label>
                    <input type="text" className="form-control" value={formData.work}
                        onChange={handleInputChange} name="work" />
                    <div id="emailHelp" className="form-text"></div>
                </div>


                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <input type="text" className="form-control" value={formData.address}
                        onChange={handleInputChange} name="address" />
                    <div id="emailHelp" className="form-text"></div>
                </div>

                <div className="mb-3 col-lg-12 col-md-12 col-12">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" value={formData.description}
                        onChange={handleInputChange} rows="3" name="description" ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </div>


        </form>
    </div>
</>
  )
}

export default Edit