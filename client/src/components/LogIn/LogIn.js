import React from 'react'
import "./LogIn.scss"
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {setUser} from '../redux/user/userActions'
import {connect} from 'react-redux'
const LogIn = (props) => {
    const [loading,setLoading] = React.useState(false)
    console.log(props)
    const [error,setError] = React.useState(null)
    const {register, handleSubmit, formState:{errors}} = useForm()
    const onSubmit = (data)=>{
        setLoading(true)
        console.log(data)
        axios.post(`/signin`,{
            phoneNumber:data.mobileno,
            password:data.password
        }).then(res=>{
            setLoading(false)
            if(res.data.message==="success"){
                console.log(res.data);
                props.setUser(res.data.token)
                props.history.push("/cart")
            }else{
                setError(res.data.message)
            }
        })
    }
    return (
        <div className="signupdiv">
            <h1>LogIn</h1>
            <form onSubmit = {handleSubmit(onSubmit)}>
            <div className="shadow row signupcontent">
               {props.location.state!==undefined? <p className="successsent">Sign Up Success please Log In to continue</p>:null}
                <div style={{textAlign:"left"}} className="col-12">
                <label>
                    Mobile Number
                </label>
                <input className={errors.mobileno?`errorinput`:``} {...register('mobileno',{required:true})} style={{padding:"1% 1%"}} name="mobileno"  placeholder="Enter Your Mobile Number" />
                {errors.mobileno?<div className="ui pointing red basic label">Mobile Number is Invalid</div>:null}
                </div>


                <div style={{textAlign:"left"}} className="col-12">
                <label>
                    Password
                </label>
                <input className={errors.password?`errorinput`:``} {...register('password',{required:true})} style={{padding:"1% 1%"}} name="password"  placeholder="Enter Password" />
                {errors.password?<div className="ui pointing red basic label">Password is Invalid</div>:null}

                </div>
                {
                    error!==null?<p>{error}</p>:null
                }

                {loading?
                <div className="ui active dimmer">
                <div className="ui medium text loader">Loading</div>
              </div> 
                :<div className="col-12">
                    <button className="blackbutton" type="submit">LogIn</button>
                </div>} 
                <div className="col-12">
                    <Link style={{color:"black"}} to="/login">Forgot password?</Link>
                </div> 
            </div>
            </form>
           
        </div>
    );
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:user=>dispatch(setUser(user))
    }
}

export default connect(null,mapDispatchToProps)(LogIn);