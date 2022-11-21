import axios from 'axios'
import { useSelector } from 'react-redux';
import {
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    All_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';


export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: All_PRODUCT_REQUEST });
        const { data } = await axios.get('api/v1/products');
        dispatch({
            type: All_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: All_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}