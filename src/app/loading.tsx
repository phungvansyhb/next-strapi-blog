import React from 'react';

function loading() {
	return (
		<div className='w-[98vw] h-[90vh] bg-slate-100 bg-opacity-20 flex justify-center gap-4 items-center overflow-hidden'>
			<img
				src='/camera.jpeg'
				className='w-24 h-24 rounded-full'
				alt='Website Logo'></img>
			<h2 className='text-3xl mb-2 font-bold text-gray-900 dark:text-white text-center'>
				Chờ xíu
			</h2>
		</div>
	);
}

export default loading;
