import React from 'react';
import Button from '../../utils/Button/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {
    const detail = props.detail;  // passed productDetail as detail in product.js
  

    const showProdTags = (detail) => (
        <div className = "product_tags">
            {
                detail.shipping ? 
                <div className = "tag">
                    <FontAwesomeIcon 
                        icon = {faTruck}
                    />
                    <div className = "tag_text">
                        <div>Free Shipping</div>
                        <div>And Returns</div>
                    </div>
                </div>
                :null
            }
            {
                detail.shipping ? 
                    <div className = "tag">
                        <FontAwesomeIcon 
                            icon = {faCheck}
                        />
                        <div className = "tag_text">
                            <div>Available</div>
                            <div>In Store</div>
                        </div>
                    </div>
                :   <div className = "tag">
                    <FontAwesomeIcon 
                        icon = {faTimes}
                    />
                    <div className = "tag_text">
                        <div>Not Available</div>
                        <div>Pre-Order Only</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdSpecifications = (detail) => (
        <div className = "product_specifications">
            <h2>Specs</h2>
                <div className = "item"> <strong>Frets: </strong> {detail.frets}</div>
                <div className = "item"> <strong>Wood: </strong> {detail.wood.name}</div>
        </div>
    )
        
    

    const showProdAction = (detail) => (
        <div className = "product_actions">
            <div className = "price">  ${detail.price}</div>
            <div className = "cart">
                <Button
                    type = "add_to_cart_link"
                    runAction = {()=> props.addToCart(detail._id) }
                    title = "Add to Cart"
                >

                </Button>
            </div>
        </div>
    )
  
    return (
        <div>
          <h1>{detail.brand.name} {detail.name} </h1>
            <p> {detail.description} </p>
            {showProdTags(detail)}
            {showProdAction(detail)}
            {showProdSpecifications(detail)}
            
        </div>
    );
};

export default ProdNfo;