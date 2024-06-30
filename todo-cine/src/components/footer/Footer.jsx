import React from "react";
import {
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    "Everything Cinema" or Todo-Cine in spanish is a robust single-page react application catering to cinephiles like me and indecisive movie watchers.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <a href="https://github.com/Harsh-Piplodiya" target="_blank" ><FaGithub /></a>
                    </span>
                    <span className="icon">
                        <a href="https://www.linkedin.com/in/harsh-piplodiya-24266a234/" target="_blank" ><FaLinkedin /></a>
                    </span>
                    <span className="icon">
                        <a href="https://twitter.com/harshp2910" target="_blank" ><FaTwitter /></a>
                    </span>
                    <span className="icon">
                        <a href="https://www.instagram.com/harshp2910/" target="_blank" ><FaInstagram /></a>
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;