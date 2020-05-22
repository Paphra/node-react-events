const makeDate = ( date, time ) => {
	const today = new Date()
	const year = date.substr( 0, 4 )
	const month = date.substr( 5, 2 )
	const day = date.substr(8, 2)
	const hour = time.substr( 0, 2 )
	const minutes = time.substr( 3, 2 )
	
	const full = new Date(
			parseInt( year ),
			parseInt( month ) - 1,
			parseInt( day ),
			parseInt( hour ),
			parseInt( minutes )
	)
	const oneHour = 60 * 60 * 1000
	const oneDay = 24 * oneHour
	const oneWeek = 7 * oneDay

	const dif = full - today
	const hours = Math.floor(( dif ) / oneHour)
	const days = Math.floor(( dif ) / oneDay)
	const weeks = Math.floor(( dif ) / oneWeek)
	
	return {
		year: year,
		month: month,
		day: day,
		hour: hour,
		minutes: minutes,
		
		full: full,
		today: today,
		
		weeks: weeks,
		days: days,
		hours: hours
	}
}
	

module.exports = { makeDate }
