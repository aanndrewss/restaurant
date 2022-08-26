import React from 'react'
import preloader from '../assets/Spinner-1s-200px.svg'

const Preloader = () => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '150px' }}>
			<img src={preloader} alt='preloader' />
		</div>
	)
}

export default Preloader