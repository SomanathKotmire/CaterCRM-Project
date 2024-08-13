import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Ingrdients() {

    let navigate = useNavigate();

    const [data, setData] = useState({
        id: 0,
        name: "",
        unitId: 0,
        rate: "",
        imagePath: ""
    });

    const [error, setError] = useState({
        nameError: '',
        unitIdError: '',
        rateError: '',
        imagePathError: ''
    });

    const [list, setList] = useState([])
    const [unitList, setUnitList] = useState([])

    function showData() {
        axios.get(process.env.REACT_APP_BASE_URL + "units").then((res) => {
            setUnitList(res.data);
        })
    };

    useEffect(() => {
        showData();
        bind();
    }, []);

    function bind() {
        setData({
            id: 0,
            name: "",
            unitId: "",
            rate: "",
            imagePath: ""
        })
        axios.get(process.env.REACT_APP_BASE_URL + "ingredients").then((res) => {
            setList(res.data);
        }).catch((ex) => {
            console.log(ex);
        });
    }

    function handleChange(e) {
        e.preventDefault();
        setError({
            nameError: "",
            unitIdError: '',
            rateError: '',
            imagePathError: ''
        });
        setData({ ...data, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const errObj = {};

        if (data.name.trim() === '') {
            errObj.nameError = 'Name is required';
        } else if (data.name.trim().length <= 2) {
            errObj.nameError = 'Name must be longer than 2 characters';
        }
        if (data.unitId.trim() === '') {
            errObj.unitIdError = 'Unit is required';
        }
        if (data.rate.trim() === '') {
            errObj.rateError = 'Rate is required';
        }

        // if (errObj.nameError || errObj.unitIdError || errObj.rateError || errObj.imagePathError) {
        if (Object.keys(errObj).length > 0) {
            setError(errObj);
        } else {

            // alert("No ERROR")
            if (data.id == 0) {
                axios.post(process.env.REACT_APP_BASE_URL + "ingredients", data).then((res) => {
                    bind();
                }).catch((ex) => {
                    console.log(ex);
                });
            } else {
                axios.put(process.env.REACT_APP_BASE_URL + "ingredients/" + data.id, data).then((res) => {
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
            axios.delete(process.env.REACT_APP_BASE_URL + "ingredients/" + id).then((res) => {
                bind();
            }).catch((ex) => {
                console.log(ex);
            })
        }
    }

    function handleEdit(e, id) {
        e.preventDefault();
        axios.get(process.env.REACT_APP_BASE_URL + "ingredients/" + id).then((res) => {
            setData({
                id: id,
                name: res.data.name,
                unitId: res.data.unitId,
                rate: res.data.rate,
                imagePath: res.data.imagePath
            })
        }).catch((ex) => {
            console.log(ex);
        });
    }

    function handleClear(e) {
        bind();
    }

    return (
        <div>
            <div className='recipe'>
                <div className='container-fluid'>
                    <div className='text-start mt-2'>
                        <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Ingredients' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Ingredients</p>
                    </div>
                    <div className='row'>
                        <div className="col-lg-6">
                            <div className='text-start mb-2 mt-2'>
                                <h1>Ingredients</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='text-end my-3 mx-2'>
                                <button onClick={() => navigate(-1)} className='btn btn-danger'>Back</button>
                            </div>
                        </div>
                    </div>

                    <div className='card mt-5 mx-2'>
                        <div className='card-body'>
                            <form>
                                <div className='row text-start'>

                                    <div className='col-lg-3'>
                                        <label>Name</label>
                                        <input onChange={(e) => { handleChange(e) }} type='text' value={data.name} id="name" className='form-control' />
                                        {error.nameError && <span className='text-danger'>{error.nameError}</span>}

                                    </div>
                                    <div className='col-lg-3'>
                                        <label>Unit</label>
                                        <select type='text' onChange={(e) => { handleChange(e) }} className='form-control' value={data.unitId} id="unitId" style={{ height: '55px' }}>
                                            <option value="0">Select</option>
                                            {
                                                unitList.map((eachData, i) => {
                                                    return (
                                                        <option value={eachData.id}>{eachData.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        {error.unitIdError && <span className='text-danger'>{error.unitIdError}</span>}

                                    </div>
                                    <div className='col-lg-3'>
                                        <label>Rate</label>
                                        <input onChange={(e) => { handleChange(e) }} type='text' value={data.rate} id="rate" className='form-control' />
                                        {error.rateError && <span className='text-danger'>{error.rateError}</span>}

                                    </div>
                                    <div className='col-lg-3'>
                                        <label>Image</label>
                                        <input onChange={(e) => { handleChange(e) }} type='text' value={data.imagePath} id="imagePath" className='form-control' />
                                    </div>

                                </div>

                                <div className='col-lg-12 mt-3 text-start'>
                                    <button onClick={(e) => { handleSubmit(e) }} className='btn btn-primary me-2'>Save</button>
                                    <button onClick={(e) => { handleClear(e) }} className='btn btn-danger'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='card my-5 mx-2'>
                        <div className='card-body'>
                            <table class="table table-hover">
                                <thead style={{ backgroundColor: "#88c8bc" }}>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Image</th>
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
                                                    <td>{eachRow.unit.name}</td>
                                                    <td>{eachRow.rate}</td>
                                                    <td>{eachRow.imagePath}</td>
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
    )
}
