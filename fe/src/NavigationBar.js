import { Link } from 'react-router-dom';

const NavigationBar = () => {
	return (
        <nav className="navbar">
            <h1>Journey Genius!</h1>
            <div className="links">
                <Link to="/">Home</Link>
            </div>
        </nav>

    );
}

export default NavigationBar;