import React, { Component } from 'react';
import { update, generateData, isFormValid, populateOptionFields,resetFields} from '../../utils/Form/formActions';
import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../../actions/products_actions';
import FormField from '../../utils/Form/FormField';

class ManageBrands extends Component {
    
    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Brand name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Brand Name'
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
        this.props.dispatch(getBrands()); // gets brands list from server by itself.
    }

    showCategoryItems = () => {

        return (
            this.props.products.brands ? 
            this.props.products.brands.map( (item,i) =>(
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
        const newFormdata = update(element,this.state.formdata,'brands');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formdata,'brands');
        this.setState({
            formdata:newFormData,
            formSuccess:true
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'brands');
        let formIsValid = isFormValid(this.state.formdata,'brands');
        let existingBrands = this.props.products.brands;

        if(formIsValid){
            // dispatch the action.
            this.props.dispatch(addBrand(dataToSubmit,existingBrands)).then(response =>{
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
                <h1>Brands</h1>
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
                                Add Brand
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

export default connect(mapStateToProps)(ManageBrands);