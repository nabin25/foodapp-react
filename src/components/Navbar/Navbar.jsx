import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';


const Navbar = ({setShowLogin}) => {

    const {cartItems, cartTotal, setCurrencySymbol, setCurrencyMultiplier} = useContext(StoreContext);

    const [menu, setMenu] = useState('home');


    const fetchCurrencyInfo = (e) => {
        let selectedCurrency = e.target.value;
        const api_key = 'YOUR_API_KEY'

        let options = {
            method: 'GET',
            url: `https://api.fastforex.io/fetch-one?from=USD&to=${selectedCurrency}&api_key=${api_key}`,
            headers: {accept: 'application/json'}
        };

        axios
        .request(options)
        .then(function (response) {
            const rate = response.data.result[selectedCurrency];
            console.log(rate);
            setCurrencyMultiplier(rate);
            switch(selectedCurrency){
                case 'USD':
                    setCurrencySymbol('$');
                    break;
                case 'NPR':
                    setCurrencySymbol('Rs.');
                    break;
                case 'GBP':
                    setCurrencySymbol('£');
                    break;
                case 'EUR':
                    setCurrencySymbol('€');
                    break;
                case 'AUD':
                    setCurrencySymbol('AU$');
                    break;
                case 'INR':
                    setCurrencySymbol('₹');
                    break;
                case 'JPY':
                    setCurrencySymbol('¥');
                    break;
            }
        })
        .catch(function (error) {
            console.error(error);
        });
            }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" /></Link>
        
        <ul className='navbar-menu'>
            <a href='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</a>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile app</li>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact</a>
        </ul>
        <div className="navbar-right">
            <select name="Currency" id="currency" onChange={fetchCurrencyInfo}>
                <option value={'USD'}>US Dollars</option>
                <option value={'NPR'}>Nepalese Rupees</option>
                <option value={'GBP'}>Pound Sterling</option>
                <option value={'EUR'}>Euro</option>
                <option value={'AUD'}>Australian Dollars</option>
                <option value={'INR'}>Indian Rupees</option>
                <option value={'JPY'}>Japanese Yen</option>
            </select>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={cartTotal()>0?'dot':''}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div> 
    </div>
    
  )
}

export default Navbar