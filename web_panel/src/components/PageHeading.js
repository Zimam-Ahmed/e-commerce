import React from 'react';
import ProductNaveBar from './ProductNaveBar';

const PageHeading = ({title}) => {
	return(
			<>
			    <section className="page-hero">
			        <div className='headerContainer'>
						<div className="section-center">
						<h4 className="page-hero-title">{title}</h4>
						</div>
						<ProductNaveBar/>
					</div>
			      </section>
			</>
		)
}

export default PageHeading;