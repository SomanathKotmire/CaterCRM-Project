import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Recipes() {

    let navigate = useNavigate();

    const [data, setData] = useState({
        id:0,
        name:"",
        categoryId:0,
        discription:"",
        noOfPerson:0
     });

     const [error, setError] = useState({
        nameError: '',
        categoryIdError: '',
        discriptionError: '',
        noOfPersonError: ''
    });
   
     const [categoryList, setCategoryList] = useState([]);
     const [list, setList] = useState([]);

     function showData(){
        axios.get(process.env.REACT_APP_BASE_URL + "categories").then((res)=>{
            setCategoryList(res.data);
        })
    };

     useEffect(()=>{
     
        bind();
        showData();
     },[]);

     function bind(){
        setData({
            id:0,
            name:"",
            categoryId:"",
            discription:"",
            noOfPerson:""
        })
        axios.get(process.env.REACT_APP_BASE_URL + "recipies").then((res)=>{
            setList(res.data);
        }).catch((ex)=>{
            console.log(ex);
        });
     }

     function handleChange(e){
        e.preventDefault();
        setError({
            nameError: '',
            categoryIdError: '',
            discriptionError: '',
            noOfPersonError: ''
        });
        setData({...data, [e.target.id]:e.target.value});
     }

     function handleSubmit(e){
        e.preventDefault();

        
        const errObj = {};

        if (data.name.trim() === '') {
            errObj.nameError = 'Name is required';
        } else if (data.name.trim().length <= 1) {
            errObj.nameError = 'Name must be longer than 2 characters';
        }
        if (data.categoryId.trim() === '') {
            errObj.categoryIdError = 'Category is required';
        }
        if (data.discription.trim() === '') {
            errObj.discriptionError = 'Discription is required';
        }
        if (data.noOfPerson.trim() === '') {
            errObj.noOfPersonError = 'noOfPerson is required';
        }else if (Number(data.noOfPerson.trim()) <= 0) {
            errObj.noOfPersonError = 'noOfPerson is must be atleast 1';
        }    

        if (Object.keys(errObj).length > 0) {
            setError(errObj);
        }else{
            if(data.id == 0){
                axios.post(process.env.REACT_APP_BASE_URL + "recipies", data).then((res)=>{
                    bind();
                }).catch((ex)=>{
                    console.log(ex);
                });
            }else{
                axios.put(process.env.REACT_APP_BASE_URL + "recipies/" + data.id, data).then((res)=>{
                    bind();
                }).catch((ex)=>{
                    console.log(ex);
                });
            }
        }    
     }

     function handleDelete(e, id){
        e.preventDefault();
        if(window.confirm("Sure to Delete?")){
            axios.delete(process.env.REACT_APP_BASE_URL + "recipies/"+ id).then((res)=>{
                bind();
            }).catch((ex)=>{
                console.log(ex);
            })
        }
     }
      
     function handleEdit(e,id){
        e.preventDefault();
        axios.get(process.env.REACT_APP_BASE_URL + "recipies/"+id).then((res)=>{
            setData({
                id:id,
                name:res.data.name,
                categoryId:res.data.categoryId,
                discription:res.data.discription,
                noOfPerson:res.data.noOfPerson
            })
        }).catch((ex)=>{
            console.log(ex);
        });
     }

     function handleClear(e){
        bind();
      }

  return (
    <div>
      <div className='recipe'>
            <div className='container-fluid'>
            <div className='text-start mt-2'>
          <p data-toggle="tooltip" data-placement="bottom" title='Dashboard/Recipes' className='bread fs-5'><span ><Link className='text-decoration-none text-muted' to={"/admin/dashboard"}>Dashboard</Link></span> / <span></span>Recipes</p>
        </div>
            <div className='row'>
          <div className="col-lg-6">
            <div className='text-start mb-2 mt-2'>
              <h1>Recipes</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='text-end my-3 mx-2'>
              <button onClick={()=> navigate(-1)} className='btn btn-danger'>Back</button>
            </div>
          </div>
        </div>
                <div className='card mt-5 mx-2'>
                    <div className='card-body'>
                        <form>
                            <div className='row text-start'>

                                <div className='col-lg-3'>
                                    <label>Name</label>
                                    <input onChange={(e)=>{handleChange(e)}} id='name' value={data.name} type='text' className='form-control' />
                                    {error.nameError && <span className='text-danger'>{error.nameError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>Category</label>
                                    <select type='text' onChange={(e)=>{handleChange(e)}} className='form-control' id="categoryId" value={data.categoryId} style={{height:'55px'}}>
                                        <option value="0">Select</option>
                                        {
                                            categoryList.map((eachData, i)=>{
                                                return(
                                                    <option value={eachData.id}>{eachData.name}</option>
                                                )
                                            })
                                        }
                                        
                                    </select>
                                    {error.categoryIdError && <span className='text-danger'>{error.categoryIdError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>discription</label>
                                    <input onChange={(e)=>{handleChange(e)}}  id='discription' value={data.discription}  type='text'  className='form-control' />
                                    {error.discriptionError && <span className='text-danger'>{error.discriptionError}</span>}
                                </div>
                                <div className='col-lg-3'>
                                    <label>No. Of Persons</label>
                                    <input onChange={(e)=>{handleChange(e)}} id='noOfPerson' value={data.noOfPerson} type='text' className='form-control' />
                                    {error.noOfPersonError && <span className='text-danger'>{error.noOfPersonError}</span>}
                                </div>

                            </div>

                            <div className='col-lg-12 mt-3 text-start'>
                                <button onClick={(e)=>{handleSubmit(e)}} className='btn btn-primary me-2'>Save</button>
                                <button onClick={(e)=>{handleClear(e)}} className='btn btn-danger'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='card my-5 mx-2'>
                    <div className='card-body'>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">discription</th>
                                    <th scope="col">No. Of Persons</th>
                                    <th scope="col">Add Ingredients</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {
                                    list.map((eachRow,i)=>{
                                        return(
                                            <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td>{eachRow.name}</td>
                                                <td>{eachRow.category.name}</td>
                                                <td>{eachRow.discription}</td>
                                                <td>{eachRow.noOfPerson}</td>
                                              
                                                <td><Link to={"/admin/recipeingredients/" + eachRow.id}>
                                                <button className='btn btn-sm btn-success fw-bold'>+Add</button></Link>
                                                </td>
                                                <td>
                                                    <button onClick={(e)=>{handleEdit(e, eachRow.id)}} className='btn btn-sm btn-primary me-1'><i className="fa-regular fa-pen-to-square"></i></button>
                                                    <button onClick={(e)=>{handleDelete(e, eachRow.id)}} className='btn btn-sm btn-danger me-1'><i className="fa-solid fa-trash"></i></button>
                                                    
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
