import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import artlist1 from '../../assets/images/artslide6.jpg'
import artlist2 from '../../assets/images/artslide7.jpg'
import artlist3 from '../../assets/images/artslide8.jpg'
import noimgartist from '../../assets/images/noimgartist.jpg'
import startOne from '../../assets/images/1.png'
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <>
        <div className="container">
            <div className="tagline">
                <h2>FEEL THE BEAUTY OF ART</h2>
            </div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100"  src={artlist1} alt="First slide" />
                    <div className="carousel-caption d-md-block">
                        <h5>ArtDeal</h5>
                        <p>A beautiful body perishes, but a work of art dies not.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100"  src={artlist2} alt="Second slide" />
                    <div className="carousel-caption d-md-block">
                        <h5>ArtDeal</h5>
                        <p>A beautiful body perishes, but a work of art dies not.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100"  src={artlist3} alt="Third slide" />
                    <div className="carousel-caption d-md-block" >
                        <h5>ArtDeal</h5>
                        <p>Life is short, the art long.</p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div >
                <div class="tagline">
                    <h2>TOP ARTIST</h2>
                </div>
                <div>
                    <div className="column" >
                        <div className="card" align="center" >
                        <img src={noimgartist}  height="200px"/>
                        <h3  align="center">Mithun</h3>
                        <img src={startOne} width="60%" />
                        <p><button className="button">View profile</button></p>
                        </div>
                    </div>
                    <div className="column" >
                        <div className="card" align="center" >
                        <img src={noimgartist}  height="200px"/>
                        <h3  align="center">Mithun</h3>
                        <img src={startOne} width="60%" />
                        <p><button className="button">View profile</button></p>
                        </div>
                    </div>
                    <div className="column" >
                        <div className="card" align="center" >
                        <img src={noimgartist}  height="200px"/>
                        <h3  align="center">Mithun</h3>
                        <img src={startOne} width="60%" />
                        <p><button className="button">View profile</button></p>
                        </div>
                    </div>
                    <div className="column" >
                        <div className="card" align="center" >
                        <img src={noimgartist}  height="200px"/>
                        <h3  align="center">Mithun</h3>
                        <img src={startOne} width="60%" />
                        <p><button className="button">View profile</button></p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </> 
  );
};

export default Home;