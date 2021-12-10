const initialState={
    items:[],
    itemsCount:0
}


const CartReducer = (state=initialState,action)=>{
 switch (action.type){
     case 'ADD_ITEM':
        //  return {...state,items:[...state.items,action.payload]}
            if(state.items.length>0)
            {
               if(state.items.includes(action.payload)){
                    action.payload.quantity=action.payload.quantity+1
                    return {...state,itemsCount:state.itemsCount+1};
               }else{
                return {...state,items:[...state.items,action.payload],itemsCount:state.itemsCount+1}
               }
        }
            else{
                
                return {...state,items:[...state.items,action.payload],itemsCount:state.itemsCount+1}
            }
     case "INCREMENT_ITEM":
             let array = state.items.map(item=>{
                 if(action.payload.name===item.name){
                     item.quantity=item.quantity+1
                     return item
                 }else{
                     return item
                 }
             })
             return {...state,items:array}
     case "DECREMENT_ITEM":
             let arrayd = state.items.map(item=>{
                 if(action.payload.name===item.name){
                     item.quantity=item.quantity-1
                     return item
                 }else{
                     return item
                 }
             })
             return {...state,items:arrayd}
      case "DELETE_ITEM":
            let filterarray = state.items.filter(item=>item!==action.payload)
            console.log(filterarray)
            return {...state,items:filterarray}
       case "SET_NULL":
             return initialState
     default:
         return state;
 }
}

export default CartReducer;