import { Link } from 'react-router-dom';
function home() {
  return (
    <center>
    <div className='position-absolute top-50 start-50 translate-middle'>
      
      <Link to='/login'>
        <button type='submit' class='btn btn-primary' href='/login'>
          login
        </button>
      </Link>
      <br></br>
      <br></br>
      <Link to='/signup'>
        <button type='submit' class='btn btn-primary' href='/signup'>
          signup
        </button>
      </Link>
      

      
    </div>
    </center>
  );
}

export default home;
