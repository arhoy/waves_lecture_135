import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromo';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products_actions';
import CardBlock from '../utils/CardBlock/CardBlock';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }
    
    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    title = "Best Selling Guitars"
                    list = {this.props.products.bySell}
                />
                <HomePromotion/>
                <CardBlock
                    title = "New Arrivals"
                    list = {this.props.products.byArrival}
                />
                
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        products:state.products
    }
}

export default connect(mapStateToProps)(Home);