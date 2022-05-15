import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders : [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            console.log(' c1 ', action)
            return {
                ...copyState,  
            }
            
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log(' c2 ', action) //luu data vao redux
            return {
                ...state,  
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];                               
            console.log(' c3 ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;                             
            console.log(' c3-position ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];                         
            console.log(' c3-position ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;                             
            console.log(' c3-role ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];                         
            console.log(' c3-role ', action)
            return {
                ...state,  
            }
        
        default:
            return state;
    }
}

export default adminReducer;