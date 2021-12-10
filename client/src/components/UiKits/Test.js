import React,{useState} from 'react'
import "./SectionCard.scss"
import { useSpring, animated,config,useTransition } from 'react-spring'
const Test = () => {
    const [items,setItems] = React.useState([])
    const transition = useTransition(items,{
        from:{x:-100,y:800,opacity:0},
        enter:item=>async (next)=>{
            await next({x:0,y:item.y,opacity:1,delay:1000})
        },
        leave:{x:100,y:800,opacity:0}
    })
    return (
      <div>
          <button 
          onClick={()=>setItems([{y:-100},{y:-50},{y:0}])}>{items.length>0?"UNMOUNT":"MOUNt"}</button>
          <div style={{height:10,width:10,background:"black"}}>
            {
                transition((style,item)=>
                item?<animated.div style={style} className="item" />:""
                )
            }
          </div>
      </div>
    );
}

export default Test;