import { Link } from "react-router-dom";
import React from "react";

function Footer(props) {
  return (
    <div className="row mx-0 footer-bg">
      <div className="col-12 ">
        <div className="row  d-none">
          <div className="col-12">
            <h6 className="footer-t">
              overcome ignorance and <br /> fight for equality
            </h6>
          </div>
        </div>

        <div className="row mt-4 mb-5  d-none">
          <div className="col-12 text-center footer_btn">
            <Link to="#" className="footer_btn-news mx-1">
              recieve news
            </Link>
            <Link to="#" className="footer_btn-donate mx-1">
              donate
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="row mx-0">
            <div className="col-12">
              <div className="row mx-0 mt-5">
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="row">
                    <div className="col-12 footer-col">
                      <div>navigation</div>
                      <ul>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com"
                          >
                            home
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/about_us"
                          >
                            about us
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/what_we_do"
                          >
                            what we do
                          </a>
                        </li>

                        <li>
                          <Link to="/faq">FAQ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="row">
                    <div className="col-12 footer-col">
                      <div>see us</div>
                      <ul>
                        <li>
                          <Link to="#">encouraging testing</Link>
                        </li>
                        <li>
                          <Link to="#">strengthening advocacy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="row">
                    <div className="col-12 footer-col">
                      <div>legal</div>
                      <ul>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/what_we_do"
                          >
                            general info
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/privacy_policy"
                          >
                            privacy policy
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/product_information"
                          >
                            Product Information
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="row">
                    <div className="col-12 footer-col">
                      <div>talk to us</div>
                      <ul>
                        <li>
                          <div>info@jewelrydistricts.com</div>
                        </li>
                        <li>
                          <div className="d-none">+66 2399 1145</div>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://jewelrydistricts.com/article/contact_us"
                          >
                            contact us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="footer-hr" />
              <div className="row mb-5">
                <div className="col-6 col-md-4 my-auto order-md-1">
                  <img
                    src="../../assets/img/icons/logo.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-12 col-md-4 my-auto order-md-2 order-last text-center">
                  <div className="copyright mt-5">
                    © 2022 . All Rights Reserved.
                  </div>
                </div>
                <div className="col-6 col-md-4 my-auto order-md-3 text-right">
                  <Link to="#" className="text-decoration-none ml-2">
                    <i className="fa-brands footer_social-icon fa-twitter twitter"></i>
                  </Link>
                  <Link to="#" className="text-decoration-none ml-2">
                    <i className="fa-brands footer_social-icon fa-linkedin-in linkedin"></i>
                  </Link>
                  <Link to="#" className="text-decoration-none ml-2">
                    <i
                      className="fa-brands footer_social-icon fa-facebook-f facebook"
                      style={{ paddingRight: "11px", paddingLeft: "11px" }}
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
