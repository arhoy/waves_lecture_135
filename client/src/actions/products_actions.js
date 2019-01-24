import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_BRAND,
    ADD_WOOD,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
        .then(response =>{
            return response.data[0]
        });
        return{
            type: GET_PRODUCT_DETAIL,
            payload:request
        }
}
export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}

export function getProductsBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => {
        return response.data;
    });
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => {
        return response.data;
    });
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
    .then(response => {
        return response.data;
    });
    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
        .then(response => response.data);
        return {
            type: GET_WOODS,
            payload:request
        }
}

export function getProductsToShop(skip,limit,filters = [], previousState = [] ){
    // dataToSubmit
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
        .then(response => {
            let newState = [
                ...previousState,
                ...response.data.articles
            ];

            return {
                size: response.data.size,
                articles: newState
            }
        })
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload:request
    }
}

export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
        .then(response => response.data);
    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function addBrand(dataToSubmit, existingBrands){
    // merging brands to existing list when adding a brand, as done after the response.
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
        .then( response => {
            let brands = [...existingBrands, response.data.brand];
            return {
                success:response.data.success,
                brands
            }

        })
        .catch(err=>console.log(`Error in addBrand -- product__actions ${err}`))
    return{
        type: ADD_BRAND,
        payload: request   // request has two properties, success and brands.
    }
}

export function addWood(dataToSubmit, existingWoods){
    // merging brands to existing list when adding a brand, as done after the response.
    const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
        .then( response => {
            let woods = [...existingWoods, response.data.wood];
            return {
                success:response.data.success,
                woods
            }

        })
        .catch(err=>console.log(`Error in addWood -- product__actions ${err}`))
    return{
        type: ADD_WOOD,
        payload: request   // request has two properties, success and brands.
    }
}

