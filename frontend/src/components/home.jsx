import { Link } from 'react-router-dom';
import "../styles/home.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
function home() {
  return (
    <div>
      <Navbar/>
   <div class="container">
      
    <div className='row align-items-center position-absolute top-50 start-50 translate-middle '>
        <div class="col">
        <Link to='/login'>
          <button type='submit' class='gap btn btn-primary btn-light btn-lg' href='/login'>
            Login
          </button>
        </Link>
        </div>
        <div class="col">
        <Link to='/signup'>
          <button type='submit' class='gap btn btn-primary btn-light btn-lg' href='/signup'>
            Register
          </button>
        </Link>
        </div> 
    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default home;
