import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'

const ModalExampleScrollingContent = ({item}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
    style={{height:"80%",margin:"auto"}}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Details</Button>}
    >
      <Modal.Header><h3>Details</h3></Modal.Header>
      <Modal.Content image scrolling>

        <Modal.Description>
        <p><span>Address: </span>{item.address}</p>
         <p><span>Amount: </span>{item.amount}</p>
         <p><span>Created At: </span>{item.createdAt}</p>
         <p><span>Payment Mode: </span>{item.paymentMode}</p>
         <p><span>Payment Status: </span>{item.paymentStatus}</p>
         <p><span>Phone: </span>{item.phone}</p>
         <p><span>Status: </span>{item.status}</p>
         <p><span>Transcaction ID: </span>{item.transactionId}</p>
         <h4>Items:</h4>
        
        {
            item.allProduct.map(e=>(
                <div>
                    <p><span>Name: </span>{e.name}</p>
                    <p><span>Price: </span>{e.price}</p>
                    <p><span>Quantity: </span>{e.quantity}</p>
                    -----
                </div>
            ))
        }
      
        <div style={{height:"50%"}}>
        </div>
        


        </Modal.Description>
      </Modal.Content>
  
    </Modal>
  )
}

export default ModalExampleScrollingContent