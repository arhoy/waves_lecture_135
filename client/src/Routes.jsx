import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import Register_Login from './components/Register_Login/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User/UserDashboard';
import Auth from './hoc/Auth';
import Shop from './components/Shop/Shop';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';
import Product from './components/Product/Product';
import Cart from './components/User/Cart/Cart'


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path = "/user/cart" exact component = {Auth(Cart,true)}/>
        <Route path = "/user/dashboard" exact component = {Auth(UserDashboard,true)}/>
        <Route path = "/admin/manage_categories" exact component = {Auth(ManageCategories,true)}/>
        <Route path = "/admin/add_product" exact component = {Auth(AddProduct,true)}/>
        <Route path = "/product_detail/:id" component = {Auth(Product,null)}/>
        <Route path = "/register_login" exact component = {Auth(Register_Login,false)}/>
        <Route path = "/register" exact component = {Auth(Register,false)}/>
        <Route path = "/shop" exact component = {Auth(Shop,null)}/>
        <Route path = "/" exact component = {Auth(Home,null)} />
        
      </Switch>
    </Layout>

  )
}

export default Routes;
