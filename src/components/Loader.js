import React from 'react'
import { useState } from 'react'
// import { css } from '@emotion/react'
import HashLoader from 'react-spinners/HashLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
// 	display: block;
// 	margin: 0 auto;
// 	border-color: red;
// `

const Loader = () => {
	let [loading, setLoading] = useState(true)
	// let [color, setColor] = useState('#ffffff')

	return (
		<div className='sweet-loading text-center mt-4'>
			<HashLoader color='#000' loading={loading} size={50} />
		</div>
	)
}

export default Loader
