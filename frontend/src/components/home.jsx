import { Link } from 'react-router-dom';
import "../styles/home.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";

function home() {

  //add a axios to get the secret route directly if the user is logged in
  return (
    <div>
      <Navbar/>
   <div class="bg-home container">
   <center>
      <div>{new Date().toLocaleString('en-GB',{
        hour:"2-digit",
        minute:"2-digit"
      })}
      </div>
      </center>
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
