const initialStateUser={
    user:null
}

const userReducer = (state=initialStateUser,action)=>{
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload}
        default:
            return state;
    }
}

export default userReducer;