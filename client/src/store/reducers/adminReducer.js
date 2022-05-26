import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders : [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            //console.log(' c1 ', action)
            return {
                ...copyState,  
            }
            
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            //console.log(' c2 ', action) //luu data vao redux
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
            //console.log(' c3-position ', action)
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
            //console.log(' c3-role ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];                         
            console.log(' c3-role ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;                         
            //console.log(' c3-user su ', action)
            return {
                ...state,  
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];                         
            console.log(' c3- fa ', action)
            return {
                ...state,  
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;                         
            //console.log(' c3-user su ', action)
            return {
                ...state,  
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];                         
            console.log(' c3-user fa ', action)
            return {
                ...state,  
            }
        
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;                        
            return {
                ...state,  
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];                         
            return {
                ...state,  
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            console.log('first') 
            return {
                 ...state,
            }

        //fetch doctor infor(price, payment, province)
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            console.log('fetch required doctor data action: ', action)
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }    
        
        default:
            return state;
        
    }
}

export default adminReducer;