import react from "react";
import "../styles/footer.css";
import icon from "../images/notepad_icon.png";
function Footer(){
    return(
        <div id="footer" className="footer container-fluid">
            <div class="row align-items-center">
            <div class="col">
            <p>About the Project.</p>
            <p>This is a Secure Notepad for storing your Passwords and writing notes.</p>
            <p>you can access your writings anytime,anywhare!!</p>
            </div>
            <div class="col">
            <img class="logo-size" src={icon}/>
            </div>
            </div>
        </div>
    );
};

export default Footer;