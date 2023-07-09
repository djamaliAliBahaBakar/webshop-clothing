import { Link, Outlet } from "react-router-dom";
import { Fragment ,useContext} from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg' 
//import './navigation.styles.jsx'
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles.jsx' 
import { UserContext } from "../../components/context/context-user";
import { CartContext } from "../../components/context/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
  const signOutHandler = async () => {
    const respo = await signOutUser()
  }
    return (
      <Fragment>
        <NavigationContainer>
            <NavigationContainer to='/'>
            <CrwnLogo className="logo"/>
            </NavigationContainer>
         
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            
            {currentUser? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>): 
              (<NavLink  to='/auth'>Sign-In</NavLink>)
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />} 
          </NavigationContainer>
          <Outlet />
      </Fragment>
    )
  }

  export default Navigation;