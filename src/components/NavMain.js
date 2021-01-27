import React from 'react';
import logo from '../assets/images/pokeapi_256.888baca4.png';
export default class NavMain extends React.Component {

  render() {
    return <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-warning py-0">
    <div className="container col-12 px-0 mx-0">
        <a href="#">
            {/* <img src={ logo } className="w-50" /> */}
            <h5 className="text-white font-weight-bold my-2">HOTMART</h5>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-default">
            <div className="navbar-collapse-header">
                <div className="row">
                    <div className="col-6 collapse-brand">
                        <a href="#">
                          <img src={ logo } className="w-50" alt="" />
                        </a>
                    </div>
                    <div className="col-6 collapse-close">
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</nav>
</div>
  }
}
