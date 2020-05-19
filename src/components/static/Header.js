import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png'
import Search from './Search'

function Header(props) {
	
	return (
		<>
			<div className="container">
				<div className="row p-2">
					<div className="col-sm-9">
						<Link to="/" className="row" style={{textDecoration: "none"}}>
							<div className="col-2">
								<img src={logo} width="70%" alt="Ultimate Sports" />
							</div>
							<h5 className="col-10 text-left">
								Ultimate Sports Events <br />
								<small><i>Your Ultimate Events</i></small>
							</h5>
						</Link>
					</div>
					<div className="col-sm-3 text-center">
						<Search />
					</div>
				</div>
			</div>
			<nav className="navbar navbar-light navbar-expand justify-content-between bg-dark sticky-top shadow">
				<div className="container">
					<button className="navbar-toggler navbar-toggler-right" type="button" 
						data-toggle="collapse" data-target="#navbar-content" 
						aria-controls="navbar-content" aria-expanded="false" aria-haspopup="true"
						aria-label="Toggle navigation" >
						<span className="navbar-toggler-icon"></span>
					</button>
					<div id="navbar-content" 
						className="collapse navbar-collapse">
						
						<ul className="nav navbar-nav navbar-center">
							<li className="nav-item" >
								<Link className="nav-link text-white" to='/'>
									<i className="fas fa-home"></i> HOME
								</Link>
							</li>
							<li className="nav-item " >
								<Link className="nav-link text-white" to='/about'>
									<i className="fas fa-info"></i> ABOUT
								</Link>
							</li>
							<li className="nav-item {navPosts}" >
								<Link className="nav-link text-white" to="/events">
									<i className="fas fa-book-open"></i> EVENTS
								</Link>
							</li>
							<li className="nav-item {navProjects}" >
								<Link className="nav-link text-white" to="/history">
									<i className="fas fa-book"></i> HISTORY 
								</Link>
							</li>
						</ul>
						
					</div>
				</div>
			</nav>
		</>
	)
}

export default Header
