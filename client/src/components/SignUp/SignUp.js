import React from 'react'
import "./SignUp.scss"
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
const SignUp = ({history}) => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [error,setError] = React.useState(null)
    const [loading,setLoading] = React.useState(false)
    const onSubmit = (data)=>{
        setLoading(true)
        console.log(data)
        if(data.password!==data.confirmpassword){
            setError( "Password's Don't Match");
            setLoading(false)
        }
        axios.post(`${process.env.REACT_APP_DEV_LINK}/signup`,{name:data.name,email:data.email,password:data.password,cPassword:data.confirmpassword,pin:data.pincode,address:data.address,phoneNumber:data.mobileno})
        .then(response=>{
            setLoading(false)
            if(Object.keys(response.data).includes("error")){

                setError(response.data.error.message)
                console.log(response.data);
               // 
            }else if(Object.keys(response.data).includes("success")){
                console.log(response.data);
                history.push("/login",response.data.success)
            }else{
                setError("Something went wrong")
            }
        })
        .catch(err=>{
          //  console.log(err);
          setLoading(false)
            setError("Something went wrong")
        })
     
    }
    return (
        <div className="signupdiv">
            <h1>SignUp</h1>
            <form onSubmit = {handleSubmit(onSubmit)}>
            <div className="shadow row signupcontent">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label>
                    Name
                </label>
                <input className={errors.name?`errorinput`:``} {...register('name',{required:true})} name="name" placeholder="Enter Your Name" />
                {errors.name?<div className="ui pointing red basic label">Name is Invalid</div>:null}
                </div>
               
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label>
                    Mobile Number
                </label>
                <input className={errors.mobileno?`errorinput`:``} {...register('mobileno',{required:true})}  name="mobileno" placeholder="Enter Your Mobile Number" />
                {errors.mobileno?<div className="ui pointing red basic label">Mobile Number is Invalid</div>:null}
                </div>


                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label >
                   Email
                </label>
                <input className={errors.email?`errorinput`:``} {...register('email',{required:true})} name="email" placeholder="Enter Your Email" />
                {errors.email?<div className="ui pointing red basic label">Email is Invalid</div>:null}
                </div>

                <div  className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label>
                    Pin Code
                </label>
                <input className={errors.pincode?`errorinput`:``} {...register('pincode',{required:true})} name="pincode" placeholder="Enter Your Pin Code" />
                {errors.pincode?<div className="ui pointing red basic label">PinCode is Invalid</div>:null}
                </div>

                
                <div style={{textAlign:"left"}} className="col-12">
                <label>
                   Address
                </label>
                <input className={errors.address?`errorinput`:``} {...register('address',{required:true})} name="address" placeholder="Enter Your Address" />
                {errors.address?<div className="ui pointing red basic label">Address is Invalid</div>:null}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label>
                    Password
                </label>
                <input className={errors.password?`errorinput`:``} {...register('password',{required:true})} name="password" placeholder="Enter Password" />
                {errors.password?<div className="ui pointing red basic label">Password is Invalid</div>:null}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label>
                    Confirm Password
                </label>
                <input className={errors.confirmpassword?`errorinput`:``} {...register('confirmpassword',{required:true})} name="confirmpassword" placeholder="Confirm Password" />
                {errors.confirmpassword?<div className="ui pointing red basic label">Invalid Confirm Password</div>:null}
                </div>
                
                {error!==null?<div className="col-12 ui red message">
                {error}
                </div>:null}
                {loading===false?<div className="col-12">
                    <button className="blackbutton">SignUp</button>
                </div>: <div className="ui active dimmer">
    <div className="ui medium text loader">Loading</div>
  </div> }
                {loading===false?<div className="col-12" style={{margin:0}}>
                    <Link style={{color:"black"}} to="/login">Already a user? LogIn instead</Link>
                </div>:null }
            </div>
            </form>
        </div>
    );
}

export default SignUp;