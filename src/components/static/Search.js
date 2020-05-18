import React from 'react'

export default function Search (props) {
	
	return (
		<form {...props} className="form-inline float-center" >
			<input type="search" className="form-control" placeholder="Search ..."/>
			<button type="submit" className="btn btn-outline-success">
				Search
			</button>
		</form>
	)
}
