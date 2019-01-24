import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse'


class CollapseCheckBox extends Component {
    state = {
        open:false,
        checked: [] // this list will get send to parent component.
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
    
    handleToggle = (item) => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(item); // enter the array of checks and find the index.
        const newChecked = [...checked]; // create copy of checked array so we don't mutate the original array.
        // if it is not checked then add check otherwise remove the check.
        if(currentIndex === -1){
            newChecked.push(item);
        }
        else{
            newChecked.splice(currentIndex,1)
        }
        this.props.handleFilters(newChecked);
        this.setState({ checked:newChecked });
    }

    renderList = () => (
        this.props.list ? 
        this.props.list.map( (item,i) =>(
            <ListItem
                key = {item._id}
            >
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <Checkbox
                        color = "primary"
                        onChange={ ()=> this.handleToggle(item._id) }
                        checked = { this.state.checked.indexOf(item._id) !==-1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
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
                            {this.renderList()}
                        </List>
                    </Collapse>
                 
                </List>
                
            </div>
        );
    }
}

export default CollapseCheckBox;