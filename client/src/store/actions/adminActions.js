import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
         deleteUserService, editUserService, getTopDoctorHomeService,
         getAllDoctors, saveDetailDoctorService

} from '../../services/userService';
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_GENDER_START 
            })
            let res =  await getAllCodeService('GENDER')
            if(res && res.errCode === 0){
                //console.log('check getState ', getState)
               dispatch(fetchGenderSuccess(res.data));
            }else {
                dispatch(fetchGenderFailed());
            }
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart err ',e);
        }
    }
}

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
    
// })

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
    
})

export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try{
            let res =  await getAllCodeService('POSITION')
            if(res && res.errCode === 0){
                //console.log('check getState ', getState)
               dispatch(fetchPositionSuccess(res.data));
            }else {
                dispatch(fetchPositionFailed());
            }
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetch position err ',e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})


export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try{
           let res = await getAllCodeService('ROLE')
           if(res && res.errCode === 0) {
               dispatch(fetchRoleSuccess(res.data))
           }else dispatch(fetchRoleFailed());
        }catch(e){
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check create new user: ', res)
            if(res && res.errCode === 0){
            dispatch(saveUserSuccess(res.data));
            dispatch(fetchAllUsersStart());
            toast.success('Create a new user successed !')
            }else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFail: ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('check delete user: ', res)
            if(res && res.errCode === 0){
            dispatch(deleteUserSuccess());
            dispatch(fetchAllUsersStart());
            toast.success('Delete user successed !')
            }else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const updateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('check delete user: ', res)
            if(res && res.errCode === 0){
            dispatch(updateUserSuccess());
            dispatch(fetchAllUsersStart());
            toast.success('Update user successed !')
            }else {
                dispatch(updateUserFailed());
            }
        } catch (e) {
            dispatch(updateUserFailed());
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})



export const fetchAllUsersStart= () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllUsers('ALL');
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else {
                dispatch(fetchAllUsersFailed());
                toast.error('fetch all user error !')
            }
        }catch(e){
            dispatch(fetchAllUsersFailed())
        }
    }
}

export const fetchAllUsersSuccess= (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed= () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

//REDUX

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED})
            console.log('chekc  res 3: ',res);
        }catch(e){
            dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED})
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED})
            console.log('chekc  res 3: ',res);
        }catch(e){
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED})
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await saveDetailDoctorService(data);
            console.log(res.errCode)
            if(res && res.errCode === 0){
                toast.success('Save infor detail doctor success')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            }else{
                toast.error('Save infor detail doctor error')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        }catch(e){
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = (type) => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
} 

//fetch doctor price, payment, province
export const getRequiredDoctorInfor = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
            ) {
                let data={
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }

                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('RequiredDoctorInfor error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
}) 