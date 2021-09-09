import React, { Component } from "react";
import "./css/style.css"
import "bootstrap/dist/css/bootstrap.min.css";

import pic1 from "./resources/1.jpg"
import pic2 from "./resources/2.jpg"
import pic3 from "./resources/3.jpg"
import pic4 from "./resources/4.jpg"
import pic5 from "./resources/5.jpg"
import pic6 from "./resources/6.jpg"
import pic7 from "./resources/7.jpg"
import pic8 from "./resources/8.jpg"
import pic9 from "./resources/9.jpg"
import pic10 from "./resources/10.jpg"
import pic11 from "./resources/11.jpg"
import pic12 from "./resources/12.jpg"
import pic13 from "./resources/13.jpg"
import pic14 from "./resources/14.jpg"
import pic15 from "./resources/15.jpg"
import pic16 from "./resources/16.jpg"

export default class HomeDesign extends Component {
    render(){
        return(
            <div>
            Top News Start
  <div class="top-news">
      <div class="container ">
          <div class="row">
              <div class="col-md-6 tn-left">
                <div id="carousel-news" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li data-target="#carousel-news" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-news" data-slide-to="1"></li>
                    <li data-target="#carousel-news" data-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src={pic1} alt="Vaccine-news"/>
                      <div class="carousel-caption d-none d-md-block">
                        <a href=" ">Vietnam licenses new 5-in-1 vaccine</a>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src={pic2} alt="Poland assists"/>
                      <div class="carousel-caption d-none d-md-block">
                        <a href=" ">Poland to gift more than 501,000 vaccine doses to Viet Nam</a>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src={pic3} alt="Covivac"/>
                      <div class="carousel-caption d-none d-md-block">
                        <a href=" ">Volunteers get Covivac vaccine in second phase clinical trials</a>
                      </div>
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#carousel-news" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carousel-news" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div class="col-md-6 tn-right">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="tn-img">
                              <img src={pic4} alt=" "/>
                              <div class="tn-title">
                                  <a href=" ">Health ministry confirms 9,605 new COVID-19 cases</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="tn-img">
                              <img src={pic5} alt=" "/>
                              <div class="tn-title">
                                  <a href=" ">Gov’t places top priority on COVID-19 containment</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="tn-img">
                              <img src={pic6} alt=" "/>
                              <div class="tn-title">
                                  <a href=" ">Eight southern localities urged to tighten borders control to prevent COVID-19</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="tn-img">
                              <img src={pic7} alt=" "/>
                              <div class="tn-title">
                                  <a href=" ">HCMC to extend social distancing by one month to contain COVID-19 spread</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
   Top News End

  Main News Start
  <div class="main-news">
      <div class="container">
          <div class="row">
              <div class="col-lg-9">
                  <div class="row">
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic8} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Viet Nam to purchase nearly 20 million Pfizer vaccine doses</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic9} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">More than 5,000 new COVID-19 cases added to national tally</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic10} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Leaders seek EU’s COVID-19 vaccine support</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic13} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Domestic COVID-19 vaccine developer gets financial support</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic11} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Three Coronavirus-hit provinces to get over 4,000 tons rice from national reserve</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic12} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Volunteers get Covivac vaccine in second phase clinical trials</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic14} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">HCMC supports 2.5 million difficulty-struck people amidst pandemic time</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic15}alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Ha Noi to test 13 groups of high-risk residents</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-4">
                          <div class="mn-img">
                              <img src={pic16} alt=" "/>
                              <div class="mn-title">
                                  <a href=" ">Da Nang starts seven-day lockdown</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3">
                  <div class="mn-list">
                      <h2>Read More</h2>
                      <ul>
                          <li><a href=" ">Health ministry confirms 9,605 new COVID-19 cases</a></li>
                          <li><a href=" ">Ha Noi to test 13 groups of high-risk residents</a></li>
                          <li><a href=" ">HCMC to extend social distancing by one month to contain COVID-19 spread</a></li>
                          <li><a href=" ">Da Nang starts seven-day lockdown</a></li>
                          <li><a href=" ">Ha Noi to test 13 groups of high-risk residents</a></li>
                          <li><a href=" ">HCMC supports 2.5 million difficulty-struck people amidst pandemic time</a></li>
                          <li><a href=" ">Domestic COVID-19 vaccine developer gets financial support</a></li>
                          <li><a href=" ">Leaders seek EU’s COVID-19 vaccine support</a></li>
                          <li><a href=" ">More than 5,000 new COVID-19 cases added to national tally</a></li>
                          <li><a href=" ">Viet Nam to purchase nearly 20 million Pfizer vaccine doses</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  </div>
  Main News End
            </div>
        )
    }
}