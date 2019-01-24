import React, { Component } from 'react';
import PageTop from '../utils/PageTop/PageTop';
import {connect} from 'react-redux';
import {getProductDetail, clearProductDetail} from '../../actions/products_actions';
import {addToCart} from '../../actions/user_actions';
import ProdNfo from './ProdNfo/ProdNfo';

import ProdImg from './ProdImg/ProdImg';

class Product extends Component {
    componentDidMount(){
        const {id} = this.props.match.params;
     
        this.props.dispatch(getProductDetail(id))
            .then(response =>{
                if(!this.props.products.prodDetail){
                    this.props.history.push('/shop');
                }
            })
        
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());
    }
    addToCartHandler = (id) => {
        console.log('add to cart',id);
        this.props.dispatch(addToCart(id));
    }
    render() {
     
        const prodDetail = this.props.products.prodDetail? this.props.products.prodDetail : {};

        return (
            <div>
                 <PageTop
                     title = {`Product:${prodDetail.name}`}
                 />
                 <div className = "container">
                    {
                        this.props.products.prodDetail ? 
                        <div className = "product_detail_wrapper">
                            <div className = "left">
                                <div style = {{width: '450px'}}>
                                    <ProdImg
                                        detail = {prodDetail}
                                    />   
                                </div>  
                            </div>
                            <div className = "right"
                                style = {{marginLeft:'1rem'}}
                            >
                                <ProdNfo
                                    addToCart = { (id)=> this.addToCartHandler(id) }
                                    detail = {prodDetail}
                                />
                            </div>
                        </div>
                        : 'Loading'
                    }   
                 </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        products:state.products
    }
}

export default connect(mapStateToProps)(Product);