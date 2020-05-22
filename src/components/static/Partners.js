import React from 'react'

export default function Partners (props) {
	const partners = props.partners
	const size = props.size

	let cards = 1
	if ( size <= 768 ) {
		cards = 1	
	} else if(size <= 992) {
		cards = 2
	} else {
		cards = 4
	}
	
	const getCards = ( index ) => {
		let htmlCards = []
		let count = index
		let max = cards + index
		//if ( cards > 1 ) {
		//	 max += 1
		//}
		for (count; count < max; count++ ) {
			let partner = partners[count]
			if ( partner ) {
				let card = <div key={count} style={{marginLeft: "2%"}}
					className="media-card bg-dark shadow col-xs-12 col-sm-6 col-md-4 col-lg-3">
					<h5 className="card-header">
						<small>{partner.name}</small>
					</h5>
						<div className="card-body">
							<img alt={partner.title}
								src={partner.image} width="80%" className="card-image-top rounded" /> 
						</div>
						<div className="card-footer text-center">
							{partner.website&&<a className="btn btn-primary btn-sm" target="_blank"
								href={`${ partner.website }`} rel="noopener noreferrer">
								<span className="fas fa-globe"></span>
							</a>}
							{partner.email&&<a className="btn btn-danger btn-sm" target="_blank"
								href={`mailto:${ partner.email }`} rel="noopener noreferrer">
								<span className="fas fa-envelope-open-text"></span>
							</a>}
							{partner.phone&&<a className="btn btn-success btn-sm" target="_blank"
								href={`tel:${ partner.phone }`} rel="noopener noreferrer">
								<span className="fas fa-phone"></span>
							</a>}
						</div>
					</div>
				htmlCards.push(card)	
			} else {
				break
			}
		}
		return {
			cards: htmlCards,
			index: count
		}
	}
	

	const getCarouselItems = () => {
		let items = []
		
		let allCards = null
		for ( let index = 0; index < partners.length; index++ ) {
			allCards = getCards(index)
			let item = <div key={index} className={`carousel-item ${ index === 0 && 'active' }`}>
				<div className="row">
					{allCards.cards}
				</div>
			</div>
			index = allCards.index - 1
			items.push( item )
		}
		return items
	}

	return (
		<div className="text-center">
			
			{partners.length > 0 && <div className="">
				<h5 className=""><i>Our Partners</i></h5>
				<div className="carousel slide multi-carousel" data-ride="carousel"
					data-interval="3000" id="partners-slider">
					<div className="carousel-inner row">
						
						{getCarouselItems()}
						
					</div>
					<a className="carousel-control-prev" style={{left: "-5%"}} href="#partners-slider"
						role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" style={{right: "-5%"}} href="#partners-slider"
						role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>}
		</div>
	)
}
