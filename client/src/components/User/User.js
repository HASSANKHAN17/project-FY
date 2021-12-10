import React from 'react'
import "./User.scss"
import Header from '../Header/Header'
import {setUser} from '../redux/user/userActions'
import {connect} from 'react-redux'
import axios from 'axios'
import ModalExampleScrollingContent from './ModalCustom'
import InputModal from './InputModal'
import ModalReturn from './ModalReturn'
import ModalCancel from './ModalCancel'
import Footer from '../Footer/Footer'
import ReactPaginate from 'react-paginate'
const User = (props) => {
    const [state,setState] = React.useState(false)
    const [data,setData] = React.useState([])
    const [loading,setLoading]=React.useState(false)
    //paginate
    const [paginateData,setPaginateData]=React.useState([])
    const [pageNumber,setPageNumber]=React.useState(0)

    const dataPerPage=3;
    const pageVisited=pageNumber*dataPerPage
    const displayData=paginateData.slice(pageVisited,pageVisited+dataPerPage)
    .map((item,index)=>{
        return (
            <div className=" carddetails">

                            <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                            <p><span style={{color:"grey"}}>Status:</span> {item.status}</p>
                            <p><span style={{color:"grey"}}>Date:</span> {item.date}</p>
                            </div>
                            <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                            <p><span style={{color:"grey"}}>Address:</span> {item.address}</p>
                            <p><span style={{color:"grey"}}>Phone No:</span> {item.phone}</p>
                            </div>
                            <p><span style={{color:"grey"}}>Items:</span> {item.allProduct.map((e)=><span>{e.name} |</span>)}</p>
                            <ModalExampleScrollingContent item={item} />
                            {
                                item.status==="Delivered"?<ModalReturn navigation={props} orderId={item._id} />:null
                            }
                            {
                                item.status==="Out For Delivery" && item.paymentMode==="ONLINE"?<ModalCancel navigation={props} orderId={item._id} />:null
                            }
                            {
                                item.status==="Out For Delivery" && item.paymentMode==="COD"?<button className="ui red button" onClick={()=>cancelCodItem(item._id)}>Cancel</button>:null
                            }
                            
                        </div>
        )
    })
    const pageCount = Math.ceil(paginateData.length/dataPerPage)
   
    const changePage = ({selected})=>{
        setPageNumber(selected)
    }
   

    React.useEffect(()=>{
        setLoading(true)
        axios.post(`/user/single-user`,{token:props.user})
        .then(res=>{
            setData(res.data.User)
            setLoading(false)
            setPaginateData(res.data.User.history.slice(0,50))
        
        })
    },[])
    const cancelCodItem = (id)=>{
        axios.post("/order/cancel",{orderId:id,token:props.user})
 .then(res=>{
        props.history.push("/orderstatus",{heading:"Order Cancelled",content:"Please let us know the reason for cancellation in contact us tab"})
 })
 .catch(err=>console.log(err))
    }
    const renderContent =()=>{
        if (typeof window.orientation === 'undefined') {
            return(
                <div className="userinformation">
                <Header id="4" />
                <div className="row">
                <div className="menu col-2">
                    <h1>Account</h1>
                    <div onClick={()=>setState(false)} className={state?"subrows":"subrows active"}>
                        <p><i class="far fa-user"></i> Personal Information</p>
                    </div>
                    <div onClick={()=>setState(true)} className={state?"subrows active":"subrows"}>
                        <p><i class="far fa-clipboard"></i> History</p>
                    </div>
                    <button className="blackbutton" style={{width:"70%",marginTop:"5%",marginLeft:"15%"}} onClick={()=>{
                        props.setUser(null)
                        props.history.push("/")
                        }}>Log out</button>
                </div>
                   {!state?<div className="detailcontainer col-9">
                        <h1>Personal Details</h1>   
                        <div className="informationdiv">
                        <p><span style={{color:"grey"}}>Name: </span>{data.name} <InputModal name="name" /></p>
                        <p><span style={{color:"grey"}}>Email: </span>{data.email}<InputModal name="email" /></p>
                        <p><span style={{color:"grey"}}>Address: </span>{data.address}<InputModal name="address" /></p>
                        <p><span style={{color:"grey"}}>Phone Number: </span>{data.phoneNumber}<InputModal name="phoneNumber" /></p>
                        <p><span style={{color:"grey"}}>Pin Code: </span>{data.pin}<InputModal name="pin" /></p>
                        </div>
                    </div>:
                    <div className="detailcontainer col-9">
                        <h1>History</h1>   
                        {displayData}
                     <ReactPaginate
                     previousLabel={`Previous`}
                     nextLabel={"Next"}
                     pageCount={pageCount}
                     onPageChange={changePage}
                     containerClassName={'paginationBttns'}
                     previousLinkClassName={`previousBttn`}
                     nextLinkClassName={'nextBttn'}
                     disabledClassName={'paginationDisabled'}
                     activeClassName={'paginationActive'}
                     />
                       
                      {console.log(data.history)}
                    </div>
                    }
                </div>
                {
                console.log(props)
            }
            <Footer />
            </div>
            
            )
         }else{
             return(
                <div className="userinformation">
                <Header id="4" />
                <div>
                
                   {!state?<div className="detailcontainer">
                        <h1 style={{textAlign:"center"}}>Personal Details</h1>   
                        <div className="informationdiv" style={{marginLeft:"5%",marginTop:"5%"}}>
                        <p><span style={{color:"grey"}}>Name: </span>{data.name} <InputModal name="name" /></p>
                        <p><span style={{color:"grey"}}>Email: </span>{data.email}<InputModal name="email" /></p>
                        <p><span style={{color:"grey"}}>Address: </span>{data.address}<InputModal name="address" /></p>
                        <p><span style={{color:"grey"}}>Phone Number: </span>{data.phoneNumber}<InputModal name="phoneNumber" /></p>
                        <p><span style={{color:"grey"}}>Pin Code: </span>{data.pin}<InputModal name="pin" /></p>
                        <button className="blackbutton" style={{width:"70%",marginTop:"5%",marginLeft:"15%"}} onClick={()=>{
                        props.setUser(null)
                        props.history.push("/")
                        }}>Log out</button>
                        <p className="gotolink" onClick={()=>setState(true)}>Go To History</p>
                        </div>
                    </div>:
                    <div className="detailcontainer" style={{margin:"0 4%"}}>
                         <p onClick={()=>setState(false)}><i class="fas fa-chevron-left"></i> Go Back To Personal Details</p>
                        <h1>History</h1>   
                        {displayData}
                     <ReactPaginate
                     previousLabel={`Previous`}
                     nextLabel={"Next"}
                     pageCount={pageCount}
                     onPageChange={changePage}
                     containerClassName={'paginationBttns'}
                     previousLinkClassName={`previousBttn`}
                     nextLinkClassName={'nextBttn'}
                     disabledClassName={'paginationDisabled'}
                     activeClassName={'paginationActive'}
                     />
                      
                     
                    </div>
                    }
                </div>
                {
                console.log(props)
            }
            <Footer />
            </div>
             )
         }
    }
    return (
        <div>
    {loading?( <div className="ui active dimmer">
    <div className="ui medium text loader">Loading</div>
  </div> ):renderContent()}
  </div>
        
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        setUser:user=>dispatch(setUser(user))
    }
}
const mapStateToProps = ({user})=>{
    return {
        user:user.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User);