import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import "./User.scss"
const ModalReturn = ({name,item,user,orderId,navigation}) => {

    console.log(navigation)
    const {register, handleSubmit, formState:{errors}} = useForm()
  const [open, setOpen] = React.useState(false)
  const [success,setSuccess] = React.useState(null)
  const onSubmit = (data)=>{
    console.log(data)
 axios.post("/order/return",{bankAccountNo:data.number,ifscCode:data.ifsc,bankName:data.name,bankBranch:data.branch,phone:data.upi,token:user,orderId})
 .then(res=>{

  navigation.history.push("/orderstatus",{heading:"Return in Process",content:"Your Amount will be credited to your bank account within 2 days"})

 })
 .catch(err=>console.log(err))
}
  return (
    <Modal
    style={{height:"80%",margin:"auto"}}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button className="ui blue button">Return</Button>}
    >
      <Modal.Header><h3>Enter Bank Details</h3></Modal.Header>
      <Modal.Content image scrolling>

        <Modal.Description>
        
        <div className="contactusdiv">
                <div className="signupdiv">
            <form onSubmit = {handleSubmit(onSubmit)}>
            <div className="signupcontent">
               

                <div style={{textAlign:"left", paddingBottom:"5%"}} >
                <label>
                   Bank Name
                </label>
                <input className={errors.name?`errorinput`:``} {...register('name',{required:true})} style={{padding:"1% 1%"}} name="name"  placeholder={`Enter Your Bank Name`} />
                {errors.name?<div className="ui pointing red basic label">Bank Name is Invalid</div>:null}
                </div>

                <div style={{textAlign:"left", paddingBottom:"5%"}} >
                <label>
                   Account Number
                </label>
                <input className={errors.number?`errorinput`:``} {...register('number',{required:true})} style={{padding:"1% 1%"}} name="number"  placeholder={`Enter Your Bank Account Number`} />
                {errors.number?<div className="ui pointing red basic label">Account Number is Invalid</div>:null}
                </div>

                <div style={{textAlign:"left", paddingBottom:"5%"}} >
                <label>
                   Branch Name
                </label>
                <input className={errors.branch?`errorinput`:``} {...register('branch',{required:true})} style={{padding:"1% 1%"}} name="branch"  placeholder={`Enter Your Branch`} />
                {errors.branch?<div className="ui pointing red basic label">Branch is Invalid</div>:null}
                </div>

                <div style={{textAlign:"left", paddingBottom:"5%"}} >
                <label>
                   Bank IFSC Code
                </label>
                <input className={errors.ifsc?`errorinput`:``} {...register('ifsc',{required:true})} style={{padding:"1% 1%"}} name="ifsc"  placeholder={`Enter Your IFSC Code`} />
                {errors.ifsc?<div className="ui pointing red basic label">Bank IFSC is Invalid</div>:null}
                </div>

                <div style={{textAlign:"left", paddingBottom:"5%"}} >
                <label>
                   Mobile Number (UPI)
                </label>
                <input className={errors.upi?`errorinput`:``} {...register('upi',{required:true})} style={{padding:"1% 1%"}} name="upi"  placeholder={`Enter Your UPI Code`} />
                {errors.upi?<div className="ui pointing red basic label">UPI is Invalid</div>:null}
                </div>
                
                {
                    success!==null?<p className="successmessage">{success}</p>:null
                }
                <div className="col-12">
                    <button className="blackbutton" type="submit">Submit</button>
                </div> 
            </div>
            </form>
           
        </div>
            </div>

            <div style={{height:"50%"}}>
        </div>

        </Modal.Description>
      </Modal.Content>
  
    </Modal>
  )
}
const mapStateToProps = ({user})=>{
    return {
        user:user.user
    }
}
export default connect(mapStateToProps)(ModalReturn)