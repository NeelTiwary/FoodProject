import { GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "../constants/menuConstants"
import axios from "axios";
export const getMenus = (id) => async(dispatch) =>{
    try {
        dispatch({type: GET_MENU_REQUEST});
        const response = await axios.get(`/api/v1/eats/stores/${id}/menus`)
        console.log(response.data.data[0].menu);
        dispatch({
            type : GET_MENU_SUCCESS,
            payload : response.data.data[0].menu,
        })
    }catch(err){
        dispatch(
            {
                type: GET_MENU_FAIL,
                payload :err.message,
            }
        )
    }
}