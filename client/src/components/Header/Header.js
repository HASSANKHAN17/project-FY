import React from 'react'
import "./Header.scss"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Logo from '../../Images/Group 15.png'
const Header = (props) => {
console.log(props);
	return (
        <div className=" p-5  rounded" style={{marginBottom:"2%"}}>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top  navbarclass " >
	<div className="container-fluid">
		<Link className="navbar-brand"  style={{color:"black"}} to="/"><img style={{height:"6vh"}} src={Logo} /></Link>
	<button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
		<span className="navbar-toggler-icon" ></span>
	</button>
	<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto" id="nav">
			<li className="nav-item">
			{props.id==="2"?<Link  className="nav-link active" to="/aboutus">About Us</Link>:<Link  className="nav-link"  to="/aboutus">About Us</Link>}
			</li>
			<li className="nav-item">
			{props.id==="6"?<Link  className="nav-link active" to="/termsandconditions">Terms</Link>:<Link  className="nav-link"  to="/termsandconditions">Terms</Link>}
			</li>
			<li className="nav-item">
			{props.id==="7"?<Link  className="nav-link active" to="/privacypolicy">Privacy Policy</Link>:<Link  className="nav-link"  to="/privacypolicy">Privacy Policy</Link>}
			</li>
			<li className="nav-item">
			{props.id==="8"?<Link  className="nav-link active" to="/refund">Refund Policy</Link>:<Link  className="nav-link"  to="/refund">Refund Policy</Link>}
			</li>
			<li className="nav-item">
			{props.id==="9"?<Link  className="nav-link active" to="/shipment">Shipping Policy</Link>:<Link  className="nav-link"  to="/shipment">Shipping Policy</Link>}
			</li>
            <li className="nav-item">
			{props.id==="3"?<Link  className="nav-link active" to="/contactus">Contact Us</Link>:<Link  className="nav-link"  to="/contactus">Contact Us</Link>}
			</li>
			<li className="nav-item">
			{props.id==="4"?<Link  className="nav-link active" to={(props.user===null || props.user===undefined)?"/signup":"/userdetails"}><i className="fa-2x fa fa-user-circle" aria-hidden="true"></i></Link>:<Link  className="nav-link"  to={(props.user===null || props.user===undefined)?"/signup":"/userdetails"}><i className="fa-2x fa fa-user-circle" aria-hidden="true"></i></Link>}
			</li>
            <li className="nav-item">
			{props.id==="5"?<Link  className="nav-link active" to="/cart"><span className="custombadge">{props.cart.length}</span><i className="fa-2x fa fa-shopping-bag" aria-hidden="true"></i></Link>:<Link  className="nav-link"  to="/cart"><span className="custombadge">{props.cart.length}</span><i className="fa-2x fa fa-shopping-bag" aria-hidden="true"></i></Link>}
			</li>
			
		</ul>
	</div>
</div>
</nav>
</div>
    );

}
const mapStateToProps=({cart,user})=>{
	return {
		cartCount:cart.itemsCount,
		cart:cart.items,
		user:user.user
	}
}
export default connect(mapStateToProps)(Header);