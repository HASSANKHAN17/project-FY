import './App.scss';
import {Route,Switch} from 'react-router-dom' 
import Home from './components/Home'
import SignUp from './components/SignUp/SignUp'
import LogIn from './components/LogIn/LogIn'
import Stationaries from './components/Stationaries/Stationaries'
import Books from './components/Books/Books'
import SectionDetail from './components/UiKits/SectionDetail'
import Cart from './components/cart/Cart'
import ContactUs from './components/ContactUs/ContactUs'
import Test from './components/UiKits/Test'
import User from './components/User/User'
import OrderPlaced from './components/OrderPlaced/OrderPlaced'
import AboutUs from './components/AboutUs/AboutUs'
import OrderStatus from './components/OrderPlaced/OrderStatus'
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Refund from './components/PrivacyPolicy/Refund'
import Shipment from './components/PrivacyPolicy/Shipment'
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/stationaries" component={Stationaries} />
      <Route path="/books" component={Books} />
      <Route path="/sectiondetail" component={SectionDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/contactus" component={ContactUs} />
      <Route path="/test" component={Test} />
      <Route path="/userdetails" component={User} />
      <Route path="/orderplaced" component={OrderPlaced} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/orderstatus" component={OrderStatus} />
      <Route path="/termsandconditions" component={TermsAndConditions} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/refund" component={Refund} />
      <Route path="/shipment" component={Shipment} />
    </Switch>
  );
}

export default App;
