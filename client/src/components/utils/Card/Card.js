import React, { Component } from 'react';
import Button from '../Button/Button';
import {connect} from 'react-redux';
import { addToCart } from '../../../actions/user_actions';
class Card extends Component {

    renderCardImage = (images) => {
      
        if(images[0] && images.length > 0 ){
            // if there is an image pass the first image.
            return images[0].url
        }
        else{
            return '/images/image_not_availble.png'  
        }
    }
    render() {
        const props = this.props;
    
      
        return (
            <div className = {`card_item_wrapper ${props.grid}`}>
                <div 
                    className = "image"
                    style = {{
                        background: `url(${this.renderCardImage(props.images)}) no-repeat`
                    }} 
                >
                </div>
                <div className = "action_container">

                    <div className = "tags">
                        <div className = "brand"> {props.brand.name} </div>
                        <div className = "name"> {props.name} </div>
                        <div className = "price"> ${props.price} </div>
                    </div>

                    {
                        props.grid ? 
                        <div className = "description">
                            <p>
                                {props.description}
                            </p>
                        </div>
                        :null
                    }
                    <div className = "actions">
                        <div className = "button_wrapp">
                            <Button
                                type = "link"
                                linkTo = {`/product_detail/${props._id}`}
                                altClass = "card_link"
                                title = "See Details"
                            />
                        </div>
                        <div className = "button_wrapp">
                            <Button
                                type = "bag_link"
                                runAction = { ()=>{ 
                                    props.user.userData.isAuth ? 
                                        this.props.dispatch(addToCart(props._id))
                                    :
                                    console.log('need to login')
                                } }
                                marginTop = {'10px'}
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// to check if the user is auth.
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Card);