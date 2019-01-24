import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CollapseRadio extends Component {
    state = {
        open:false,
        value: '0' // this list will get send to parent component.
    }

    componentDidMount() {
        if(this.props.initState){
            this.setState({open:this.props.initState})
        }
    }

    handleClick = (e) => {
        //console.log('I was clicked!',e.target.innerHTML);
        this.setState({ open: !this.state.open});
    }
    handleAngle = () => (
        <FontAwesomeIcon icon = { this.state.open ? faAngleUp: faAngleDown}/>
    )
    
    handleChange = (event) => {
        this.props.handleFilters(event.target.value);
        this.setState({
            value:event.target.value
        })
    }

    renderList = () => (
        this.props.list ? 
        this.props.list.map( (item,i) =>(
            <FormControlLabel
                key = {item._id}
                value = {`${item._id}`} 
                label = {item.name}
                control = { 
                  <Radio/>
                 }
            >

            </FormControlLabel>
           
        ))
        : null
    )
      
    render() {
    
        return (
            <div className = "collapse_items_wrapper">
                <List
                    style = {{borderBottom: '2px solid black'}} 
                >
                    <ListItem 
                        onClick = { (e)=>this.handleClick(e) }
                        style = {{padding: '10px 23px 23px 0'}}
                    >
                       <ListItemText 
                            primary= {this.props.title} 
                            className = "collapse_title"
                       />
                       {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component = "div" style = {{padding: '0px'}}>

                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        
                        </List>
                    </Collapse>
                 
                </List>
                
            </div>
        );
    }
}

export default CollapseRadio;