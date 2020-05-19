import React from 'react'

export default function Search (props) {
	
	return (
		<form {...props} className="float-center" >
			<input type="search" className="form-control" placeholder="Search ..."/>
			<button type="submit" className="btn btn-outline-success btn-sm btn-block">
				Search
			</button>
		</form>
	)
}
