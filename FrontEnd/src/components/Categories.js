
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Categories() {

  let navigate = useNavigate();

  const [data, setData] = useState({
    id: 0,
    name: ""
  })

  const [error, setError] = useState({ 
    nameError: ''
   });

  const [list, setList] = useState([])

  useEffect(() => {
    bind();
  }, []);

  function bind() {
    setData({
      id: 0,
      name: ""
    })
    axios.get(process.env.REACT_APP_BASE_URL + "categories").then((res) => {
      setList(res.data);
    }).catch((ex) => {
      console.log(ex);
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setError({ nameError: "" })
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
    }else{
      if (data.id == 0) {
        axios.post(process.env.REACT_APP_BASE_URL + "categories", data).then((res) => {
          bind();
        }).catch((ex) => {
          console.log(ex);
        });
      } else {
        axios.put(process.env.REACT_APP_BASE_URL + "categories/" + data.id, data).then((res) => {
          bind();
        }).catch((ex) => {
          console.log(ex);
        });
      }
    }
  }

  function handleDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Sure to Delete?")) {
      axios.delete(process.env.REACT_APP_BASE_URL + "categories/" + id).then((res) => {
        bind();
      }).catch((ex) => {
        console.log(ex);
      })
    }
  }

  function handleEdit(e, id) {
    e.preventDefault();
    axios.get(process.env.REACT_APP_BASE_URL + "categories/" + id).then((res) => {
      setData({
        id: id,
        name: res.data.name
      })
    }).catch((ex) => {
      console.log(ex);
    });
  }

  function handleClear(e){
    bind();
  }


  return (
    <div>
      <div className='category'>
        <div className='container-fluid'>
        <div className='text-start mt-2'>
          <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Categories' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Categories</p>
        </div>

        <div className='row'>
          <div className="col-lg-6">
            <div className='text-start mb-2 mt-2'>
              <h1>Categories</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='text-end my-3 mx-2'>
              <button onClick={()=> navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
          </div>
        </div>

          <div className='card border mt-5 mx-2'>
            <div className='card-body '>
               <div >
                <div className='row'>
                  <div className='col-lg-12 text-start'>
                    <label className='text-start ' style={{ fontSize: "20px" }}>Name</label>
                    <input onChange={(e) => { handleChange(e) }} value={data.name} id='name' type='text' className='form-control mt-2 ' ></input>
                    {error.nameError && <span className='text-danger'>{error.nameError}</span>}
                  </div>

                  <div className='col-lg-12 text-start'>
                    <button onClick={(e) => { handleSubmit(e) }} className='btn btn-primary m-3'>Save</button>
                    <button onClick={(e)=>{handleClear(e)}} className='btn btn-danger '>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*list table*/}
          <div>
            <div className='card border my-5 mx-2 bg-white'>
              <div className='card-body '>
                <table className="table table-hover">
                  <thead style={{ backgroundColor: "#88c8bc" }} >
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody class="table-group-divider">
                    {
                      list.map((eachRow, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{eachRow.name}</td>
                            <td>
                              <button onClick={(e) => { handleEdit(e, eachRow.id) }} className='btn btn-sm btn-primary me-1'><i className="fa-regular fa-pen-to-square"></i></button>
                              <button onClick={(e) => { handleDelete(e, eachRow.id) }} className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        )
                      })
                    }


                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>



      </div>
    </div>
  )
}
