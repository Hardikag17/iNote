//jshint esversion:6
import react from "react";
import "../styles/Navbar.css";

function Navbar(){
    return(
        <div class='transparent'>
      <nav class='navbar navbar-expand-lg '>
        <div class='container-fluid'>
          <h1 class='r navbar-brand link-light' href="">
            #DTech 
          </h1>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'>
              <i class='fas fa-bars'></i>
            </span>
          </button>
          <div class='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul class='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li class='nav-item'>
                <a
                  class='x nav-link active link-light'
                  aria-current='page'
                  href='#about'>
                  About
                </a>
              </li>
              <li class='nav-item'>
                <a class='x nav-link link-light' href='https://github.com/Hardikag17'>
                  Projects
                </a>
              </li>
              <li class='nav-item'>
                <a class='x nav-link link-light' href='#footer'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
}

export default Navbar;