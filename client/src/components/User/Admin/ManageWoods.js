import React, { Component } from 'react';
import { update, generateData, isFormValid, populateOptionFields,resetFields} from '../../utils/Form/formActions';
import { connect } from 'react-redux';
import { addWood, getWoods } from '../../../actions/products_actions';
import FormField from '../../utils/Form/FormField';

class ManageWoods extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Wood name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Wood Name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getWoods()); // gets brands list from server by itself.
    }

    showCategoryItems = () => {
        console.log('show Categories');
        //console.log(this.props.dispatch(get));
        return (
            this.props.products.woods ? 
            this.props.products.woods.map( (item,i) =>(
                <div 
                    key = {item._id}
                    className = "category_item"
                >
                    {item.name}
                </div>
            ))
            : null
        )
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'woods');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formdata,'woods');
        this.setState({
            formdata:newFormData,
            formSuccess:true
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'woods');
        let formIsValid = isFormValid(this.state.formdata,'woods');
        let existingWoods = this.props.products.woods;

        if(formIsValid){
            // dispatch the action.
            console.log(dataToSubmit,existingWoods);
            this.props.dispatch(addWood(dataToSubmit,existingWoods)).then(response =>{
                    if(response.payload.success){
                        this.resetFieldsHandler();
                    }
                    else{
                        this.setState({formError:true})
                    }
                })
                .catch(err => console.log(err,'form is Valid failzz'))
           
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className = "admin_category_wrapper">
                <h1>Woods</h1>
                <div className = "admin_two_column">
                    <div className = "left">
                        <div className = "brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className = "right">
                        <form onSubmit = { (event) => this.submitForm(event) }>
                            <FormField
                                id = "name"
                                formdata = {this.state.formdata.name}
                                change =  {element => this.updateForm(element)}
                            />

                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                            :null}

                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                            </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add Wood
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        products:state.products // I am still getting the brands so what the fuck does this do?!
    }
}
export default connect(mapStateToProps)(ManageWoods);