import React from 'react';
import Card from '../Card/Card';

const CardBlock = (props) => {

    const renderCards = (list) => (
        list ?
        list.map( (card,i) =>{
            return (
                <Card key = {i} {...card} />
            )
        })
        :null
    )
    return (
        <div className = "card_block">
            <div className = "container">
                {
                    props.title ?
                    <div> {props.title}</div> : null
                }
                <div style = {{
                    display: 'flex',
                    flexWrap:'wrap'
                }}>
                    {renderCards(props.list)}
                </div>

            </div>
        </div>
    );
};

export default CardBlock;