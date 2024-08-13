

import logo from './logo.svg';
import './App.css';
import LogIn from './components/LogIn';
import Header from './components/Header';

import Dashboard from './components/Dashboard';
import Units from './components/Units';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Ingrdients from './components/Ingrdients';
import Recipes from './components/Recipes';
import Users from './components/Users';
import Orders from './components/Orders';
import Reports from './components/Reports';
import RecipeIngredients from './components/RecipeIngredients';
import Order from './components/Order';
import BazaarList from './components/BazaarList';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/admin' element={<Header/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/units' element={<Units/>} />
          <Route path='/admin/categories' element={<Categories/>} />
          <Route path='/admin/ingredients' element={<Ingrdients/>} />
          <Route path='/admin/recipes' element={<Recipes/>} />
          <Route path='/admin/users' element={<Users/>}/>
          <Route path='/admin/orders' element={<Orders/>}/>
          <Route path='/admin/order' element={<Order/>}/>
          <Route path='/admin/order/:id' element={<Order/>}/>
          <Route path='/admin/reports' element={<Reports/>}/>
          <Route path='/admin/recipeingredients/:recipeId' element={<RecipeIngredients/>}/>
          <Route path='/admin/printbazaarlist/:orderId' element={<BazaarList/>}/>
          </Route>
          <Route path='/logout' element={<LogIn/>} />
      </Routes>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
