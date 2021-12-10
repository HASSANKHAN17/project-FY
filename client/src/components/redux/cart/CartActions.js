export const addToCart = (item)=>{
    return {
        type:"ADD_ITEM",
        payload:item
    }
}

export const incrementItem = (item)=>{
    return {
        type:"INCREMENT_ITEM",
        payload:item
    }
}

export const decrementItem = (item)=>{
    return {
        type:"DECREMENT_ITEM",
        payload:item
    }
}

export const deleteItem = (item)=>{
    return {
        type:"DELETE_ITEM",
        payload:item
    }
}

export const setNull = ()=>{
    return{
        type:"SET_NULL"
    }
}