import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import "./User.scss"
const InputModal = ({name,user}) => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [success,setSuccess] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const onSubmit = (data)=>{
    console.log(data)
   axios.post(`/user/edit-user`,[{propName:name,value:data.name}],{headers:{token:user}})
   .then(res=>console.log(res))
   .catch(err=>console.log(err))
}

// [
//   {"propName": "name", "value": "ABCD"},
//   {"propName": "email", "value": "fidakhan1234567890@gmail.com"}
// ]
  return (
    <Modal
    style={{height:"50%",margin:"auto"}}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<span className="editspan"><i class="far fa-edit"></i></span>}
    >
      <Modal.Header><h3>Enter {name}</h3></Modal.Header>
      <Modal.Content image scrolling>

        <Modal.Description>
        <div className="contactusdiv">
                <div className="signupdiv">
            <form onSubmit = {handleSubmit(onSubmit)}>
            <div className=" row signupcontent">
               

                <div style={{textAlign:"left"}} className="col-12">
                <label>
                    {name}
                </label>
                <input className={errors.name?`errorinput`:``} {...register('name',{required:true})} style={{padding:"1% 1%"}} name="name"  placeholder={`Enter Your ${name}`} />
                {errors.name?<div className="ui pointing red basic label">{name} is Invalid</div>:null}
                </div>

                
                {
                    success!==null?<p>{success}</p>:null
                }
                <div className="col-12">
                    <button className="blackbutton" type="submit">Submit</button>
                </div> 
            </div>
            </form>
           
        </div>
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

export default connect(mapStateToProps)(InputModal)