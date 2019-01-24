import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = (props) => {

    switch(props.type){
        case "default":
            return (
                <button className = {!props.altClass? props.btnStyle: props.altClass  }>
                    {props.title}
                </button>
        )
        case "link":
            return (
                <Link to = {props.linkTo}>
                    <button className = {!props.altClass? props.btnStyle: props.altClass  }>
                    {props.title}
                    </button>
                </Link>
            )
        case "bag_link":
                return (
                    <div className = "bag_link"
                         onClick = { props.runAction }
                         style = {{
                            marginTop: `${!props.marginTop? 0: props.marginTop}`
                        }}
                    >
                        <FontAwesomeIcon
                            icon = {faShoppingBag}
                        />
                    </div>
                )
        case "add_to_cart_link":
                return (
                    <div
                         className = "add_to_cart_link"
                         onClick = { props.runAction }
                     >
                         <FontAwesomeIcon icon = {faShoppingBag}/>
                         {props.title}
                    </div>
                )
        default:
            return (
                    <button className = {props.btnStyle}>
                      {props.title}
                    </button>
             
            )
    }

};

export default Button;