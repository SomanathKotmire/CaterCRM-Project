import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function RecipeIngredients() {

    let navigate = useNavigate();

    let { recipeId } = useParams();

    let [unit, setUnit] = useState("");
    const [data, setData] = useState({
        id: 0,
        recipeId: recipeId,
        ingredientId: 0,
        quantity: 0
    });

    const [ingredientList, setIngredientList] = useState([]);
    const [list, setList] = useState([]);
    const [recipe, setRecipe] = useState([]);

    function showData() {
        axios.get(process.env.REACT_APP_BASE_URL + "ingredients").then((res) => {
            setIngredientList(res.data);
        })
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + "recipies/" + recipeId).then((res) => {
            setRecipe(res.data);
        })
        bind();
        showData();
    }, []);

    function bind() {

        setData({
            id: 0,
            recipeId: recipeId,
            ingredientId: 0,
            quantity: 0,

        })
        axios.get(process.env.REACT_APP_BASE_URL + "recipies/listingredients/" + recipeId).then((res) => {
            setList(res.data);
        }).catch((ex) => {
            console.log(ex);
        });
    }

    function handleChange(e) {
        e.preventDefault();
        setData({ ...data, [e.target.id]: e.target.value });
        if (e.target.id === "ingredientId") {
            ingredientList.map((ingredient) => {
                if (ingredient.id == e.target.value) {
                    setUnit(ingredient.unit.name);
                }
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        axios.post(process.env.REACT_APP_BASE_URL + "recipies/addingredient", data).then((res) => {
            bind();
        }).catch((ex) => {
            console.log(ex);
        });
    }

    function handleDelete(e, id) {
        e.preventDefault();
        if (window.confirm("Sure to Delete?")) {
            axios.delete(process.env.REACT_APP_BASE_URL + "recipies/removeingredient/" + id).then((res) => {
                bind();
            }).catch((ex) => {
                console.log(ex);
            })
        }
    }

    function handleEdit(e, ri) {
        e.preventDefault();
        setData({
            id: ri.id,
            recipeId: recipeId,
            ingredientId: ri.ingredientId,
            quantity: ri.quantity
        });
        ingredientList.map((ingredient) => {
            if (ingredient.id == ri.ingredientId) {
                setUnit(ingredient.unit.name);
            }
        });
    }

    function handleClear(e) {
        bind();
    }


    return (

        <div>
            <div className='container-fluid'>
                <div className='text-start mt-2'>
                    <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/RecipeIngrdients' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>RecipeIngrdients</p>
                </div>
                <div className='row'>
                    <div className="col-lg-8">
                        <div className='text-start my-3 '>
                            <h2>Recipe Ingredients For {recipe.name} ({recipe.noOfPerson} People)</h2>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className='text-end my-3 mx-2'>
                            <button onClick={() => navigate(-1)} className='btn btn-danger'>Back</button>
                        </div>
                    </div>
                </div>
                <div className='card border mt-5 mx-2'>
                    <div className='card-body '>
                        <div className='row text-start '>
                            <div className='col-lg-4'>
                                <label className='mb-2'>Select an Ingredient</label>
                                <select onChange={(e) => { handleChange(e) }} type='text' value={data.ingredientId} className='form-control' id="ingredientId" style={{ height: '55px' }}>
                                    <option value="0">Select</option>
                                    {
                                        ingredientList.map((eachData, i) => {
                                            return (
                                                <option value={eachData.id}>{eachData.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-lg-4'>
                                <label className='mb-2'>Quantity</label>
                                <input onChange={(e) => { handleChange(e) }} type='text' value={data.quantity} id='quantity' className='form-control' />
                            </div>
                            <div className='col-lg-4'>
                                <label className='mb-2'>Unit</label>
                                <label style={{ height: '55px' }} className='form-control'>{unit}</label>
                            </div>
                        </div>
                        <div className='col-lg-12 mt-3 text-start'>
                            <button onClick={(e) => { handleSubmit(e) }} className='btn btn-primary me-2'>Save</button>
                            <button onClick={(e) => { handleClear(e) }} className='btn btn-danger'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='card mt-5 mx-2'>
                    <div className='card-body'>
                        <table class="table table-hover">
                            <thead style={{ backgroundColor: "#88c8bc" }}>
                                <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Ingredient Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {
                                    list.map((eachRow, i) => {
                                        return (
                                            <tr key={i} >
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachRow.ingredientName}</td>
                                                <td>{eachRow.quantity}</td>
                                                <td>{eachRow.unitName}</td>
                                                <td>
                                                    <button onClick={(e) => { handleEdit(e, eachRow) }} className='btn btn-sm btn-primary me-1'><i className="fa-regular fa-pen-to-square"></i></button>
                                                    <button onClick={(e) => { handleDelete(e, eachRow.id) }} className='btn btn-sm btn-danger text-white'><i className="fa-solid fa-trash"></i></button>
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
    )
}
