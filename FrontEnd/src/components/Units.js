import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Units() {
  const [data, setData] = useState({ id: 0, name: '' });
  const [list, setList] = useState([]);
  const [error, setError] = useState({ 
    nameError: ''
   });

  let navigate = useNavigate();

  useEffect(() => {
    bind();
  }, []);

  function bind() {
    setData({ id: 0, name: '' });
    axios.get(process.env.REACT_APP_BASE_URL + 'units')
      .then((res) => {
        setList(res.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  function handleChange(e) {
    setError({ nameError: "" });
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errObj = { nameError: '' };

    if (data.name.trim() === '') {
      errObj.nameError = 'Name is required';
    } else if (data.name.trim().length <= 2) {
      errObj.nameError = 'Name must be longer than 2 characters';
    }

    if (errObj.nameError) {
      setError(errObj);
    } else {
      // If no validation errors, proceed with saving
      // saveUnit();
      if (data.id === 0) {
        axios.post(process.env.REACT_APP_BASE_URL + 'units', data)
          .then((res) => {
            bind();
            toast.success("Added New Unit", {
              position: "top-right",
              autoClose: 1000
            });
          })
          .catch((ex) => {
            console.log(ex);
          });
      } else {
        axios.put(process.env.REACT_APP_BASE_URL + 'units/' + data.id, data)
          .then((res) => {
            bind();
            toast.success("Unit is Updated", {
              position: "top-right",
              autoClose: 1000
            });
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
      // Clear the form after saving/updating
      bind();
    }
  }


  function handleDelete(e, id) {
    e.preventDefault();
    if (window.confirm('Sure to delete?')) {
      axios.delete(process.env.REACT_APP_BASE_URL + 'units/' + id)
        .then((res) => {
          bind();
          toast.success("Unit Deleted Successfully", {
            position: "top-right",
            autoClose: 1000
          });
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }

  function handleEdit(e, id) {
    e.preventDefault();
    axios.get(process.env.REACT_APP_BASE_URL + 'units/' + id)
      .then((res) => {
        setData({ id: id, name: res.data.name });
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  function handleClear(e) {
    e.preventDefault();
    bind();
  }

  return (
    <div className='unit'>
      <ToastContainer/>
      <div className='container-fluid'>
        {/* Breadcrumb */}
        <div className='text-start mt-2'>
          <p data-toggle='tooltip' data-placement='bottom' title='Dashboard/Unit' className='bread fs-5'>
            <span><Link className='text-decoration-none text-muted' to={'/admin/dashboard'}>Dashboard</Link></span> / Units
          </p>
        </div>

        {/* Title */}
        <div className='row'>
          <div className='col-lg-6'>
            <div className='text-start mb-2 mt-2'>
              <h1>Units</h1>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='text-end my-3 mx-2'>
              <button onClick={() => navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className='card border mt-5 mx-2'>
          <div className='card-body'>
            <div>
              <div className='row'>
                <div className='col-lg-12 text-start'>
                  <label className='text-start' style={{ fontSize: '20px' }}>Name</label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={data.name}
                    id='name'
                    type='text'
                    className='form-control mt-2'
                  />
                  {error.nameError && <span className='text-danger'>{error.nameError}</span>}
                </div>

                <div className='col-lg-12 text-start'>
                  <button onClick={(e) => handleSubmit(e)} className='btn btn-primary m-3'>Save</button>
                  <button onClick={(e) => handleClear(e)} className='btn btn-danger'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Table */}
        <div className='card my-5 mx-2'>
          <div className='card-body'>
            <table className='table table-hover'>
              <thead style={{ backgroundColor:"#EEEEEE"}}>
                <tr>
                  <th scope='col'>Sr.No.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {list.map((eachRow, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td>{eachRow.name}</td>
                    <td>
                      <button onClick={(e) => handleEdit(e, eachRow.id)} className='btn btn-sm btn-primary me-1'>
                        Edit
                      </button>
                      <button onClick={(e) => handleDelete(e, eachRow.id)} className='btn btn-sm btn-danger'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
