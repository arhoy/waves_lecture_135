import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//==============
//    LINKS    //
//==============
const links = [
    { name: 'My Account', linkTo: '/user/dashboard'},
    { name: 'My Profile', linkTo: '/user/user_profile'},
    { name: 'My Cart', linkTo: '/user/cart'},
];

const admin = [
    {
        name:'Site Info',
        linkTo: '/admin/site_info'
    },
    {
        name:'Add Products',
        linkTo: '/admin/add_product'
    },
    {
        name:'Manage Categories',
        linkTo: '/admin/manage_categories'
    }
];

const UserLayout = (props) => {

    // generate links
    const generateLinks = (links)=>{
        return(
            links.map(link=>(
                <Link key = {link.name} to = {link.linkTo}>{link.name}</Link>
            ))
        ) 
    }

    return (
        <div className = "container">
            <div className = "user_container">
                <div className = "user_left_nav">
                    <h2>My Account</h2>
                    <div className = "links">
                        {generateLinks(links)}
                    </div>
                    {
                      props.user.userData.isAdmin ? 
                        <div>
                            <h2>Admin</h2>
                            <div className = "links">
                                { generateLinks(admin) }
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
              
                <div className = "user_right">
                    {props.children}
                </div>
            </div>
            
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);