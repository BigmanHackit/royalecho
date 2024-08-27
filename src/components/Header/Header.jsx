import { Link } from 'react-router-dom';
import './Header.css'

export default function Header() {
    return (
        <>
            <header>
                <Link to="/" className='logo'><img src="../../../public/images/gold-logo.png" alt="" /></Link>
                <ul>
                <Link to="/">Home</Link>
                    {/*<Link to="#">Services</Link> */}
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/affiliate">Affiliate</Link>
                </ul>
            </header>
        </>
        );
}