import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import {createProduct} from '../../../redux/actions/ProductActions'; 

const AddProduct = () => {

  const [submitted, setSubmitted] = useState(false);  
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, register_status } = userRegister;


  const [formState,setFormState] = useState({
        values:{},  
		images: []    
    });
 const productTypes = ['Hoodies', 'SweatShirts', 'PrintedTies', 'POD', 'Formal'];
 const categoriesTypes = ['Men', 'Woman'];
 const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White'];
 const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

	const handleFileChange = (event) => {
		setFormState((formState) => ({
		  ...formState,
		  images: Array.from(event.target.files) 
		}));
	  }


  const handleChange = (event) => {
        setFormState(formState =>({
          ...formState,
          values:{
            ...formState.values,
            [event.target.name]:
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
          
        }));
      }
	  const handleSizeChange = (event) => {
		const value = event.target.value;
		setFormState(formState => {
		  const size = formState.values.size || [];
		  
		  // Check if the selected size is already in the array
		  if (size.includes(value)) {
			// Remove the size if it's already selected
			return {
			  ...formState,
			  values: {
				...formState.values,
				size: size.filter(size => size !== value)
			  }
			};
		  } else {
			// Add the size if it's not selected
			return {
			  ...formState,
			  values: {
				...formState.values,
				size: [...size, value]
			  }
			};
		  }
		});
	  };
	  
	
	  const handleColorChange = (event) => {
		const value = event.target.value;
		const isChecked = event.target.checked;
		setFormState(formState => ({
		  ...formState,
		  values: {
			...formState.values,
			color: isChecked ?
			  [...(formState.values.color || []), value] :
			  (formState.values.color || []).filter(color => color !== value)
		  }
		}));
	  };

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  const { title, description, size=[], color=[], price, stock, productType } = formState.values;
  const { images } = formState;
  if (title && description && images.length > 0) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('size', size.join(',')); 
    formData.append('color', color.join(','));
    formData.append('price', price);
    formData.append('stock', stock);
	formData.append('productType', productType)
    
   // Append each selected file to FormData
   images.forEach((image) => {
	formData.append('images', image);
  });
  
    
    // Dispatch the action with FormData
    dispatch(createProduct(formData));
    
    // Clear form state after submission
    setFormState({
      values: {},
      images: []
    });
	document.querySelector('input[type="file"]').value = '';
    setSubmitted(false);
  }
}

	return(
		<>
		    <div className="container-scroller">
				<Header/>
				<div className="container-fluid page-body-wrapper">
				   <Sidebar/>
				   <div className="main-panel">
				        <div className="content-wrapper">
					        <div className="row">
				               <div className="col-12 grid-margin">
				                  <div className="card">
				                     <div className="card-body">
				                        <h4 className="card-title">Add Product</h4>
				                        <form className="form-sample" onSubmit={handleSubmit}>
				                           <p className="card-description">	
										   			                              
				                           </p>
										   {/* Product Type Dropdown */}
										   <div className="row">
				                              <div className="col-md-6">
				                                 <div className="form-group row">
				                                    <label className="col-sm-3 col-form-label">Product Type</label>
				                                    <div className="col-sm-9">
				                                       <select 
				                                        name="productType" 
				                                        className={'form-control form-control-lg' + (submitted && !formState.values.productType ? ' is-invalid' : '')}
				                                        onChange={handleChange}
				                                        value={formState.values.productType || ''}
				                                       >
				                                          <option value="">Select Product Type</option>
				                                          {productTypes.map((type, index) => (
				                                             <option key={index} value={type}>{type}</option>
				                                          ))}
				                                       </select>
				                                       {submitted && !formState.values.productType &&
				                                          <div className="inline-errormsg">Product type is required</div>
				                                       }
				                                    </div>
				                                 </div>
				                              </div>				                              
				                           </div>
				                           <div className="row">
				                              <div className="col-md-6">
				                                 <div className="form-group row">
				                                    <label className="col-sm-3 col-form-label">Title</label>
				                                    <div className="col-sm-9">
									                        <input type="text" className={'form-control form-control-lg' + (submitted && !formState.values.title ? ' is-invalid' : '')} 
					                                        name="title"                                
					                                        onChange={handleChange}
					                                        value={formState.values.title || ''}
					                                        />
					                                        {submitted && !formState.values.title &&
					                                            <div className="inline-errormsg">Title is required</div>
					                                        }
				                                    </div>
				                                 </div>
				                              </div>				                              
				                           </div>
				                           <div className="row">
				                              <div className="col-md-6">
				                                 <div className="form-group row">
				                                    <label className="col-sm-3 col-form-label">Description</label>
				                                    <div className="col-sm-9">
				                                       <textarea rows={5} cols={5} className={'form-control form-control-lg' + (submitted && !formState.values.title ? ' is-invalid' : '')} 
					                                        name="description"                          
					                                        onChange={handleChange}
					                                        value={formState.values.description || ''}
					                                        />
					                                        {submitted && !formState.values.description &&
					                                            <div className="inline-errormsg">Description is required</div>
					                                        }
				                                    </div>
				                                 </div>
				                              </div>				                              
				                           </div>
										   <div className="row">
												<div className="col-md-6">
													<div className="form-group row">
													<label className="col-sm-3 col-form-label">Images</label>
													<div className="col-sm-9">
														<input 
														type="file" 
														className={'form-control form-control-lg' + (submitted && !formState.values.images ? ' is-invalid' : '')} 
														name="images" 
														multiple
														onChange={handleFileChange}
														/>
														{submitted && !formState.values.images &&
														<div className="inline-errormsg">At least one image is required</div>
														}
													</div>
													</div>
												</div>
												</div>
				                           {/* Sizes Dropdown */}
										   <div className="form-group row">
											<label className="col-sm-2 col-form-label">Sizes</label>
											<div className="col-sm-9">
												{availableSizes.map((size, index) => (
													<div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
														<input 
															type="checkbox" 
															value={size} 
															onChange={handleSizeChange} 
															checked={formState.values.size?.includes(size) || false} 
														/>
														<label style={{ marginLeft: '10px' }}>{size}</label>
													</div>
												))}
											</div>
										</div>

				                           {/* Color Checkboxes with circles */}
											   <div className="col-md-6">
												   <div className="form-group row">
													   <label className="col-sm-3 col-form-label">Color</label>
													   <div className="col-sm-9">
														   {availableColors.map((color, index) => (
															   <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
																   <input 
																	   type="checkbox" 
																	   value={color} 
																	   onChange={handleColorChange} 
																	   checked={formState.values.color?.includes(color) || false} 
																   />
																   <span style={{
																	   width: '20px',
																	   height: '20px',
																	   backgroundColor: color.toLowerCase(),
																	   borderRadius: '50%',
																	   display: 'inline-block',
																	   marginLeft: '10px',
																	   border:'1px'
																   }}></span>
																   <label style={{ marginLeft: '5px' }}>{color}</label>
															   </div>
														   ))}
													   </div>
												   </div>
											   </div>
										   
				                           <div className="row">
				                              <div className="col-md-6">
				                                 <div className="form-group row">
				                                    <label className="col-sm-3 col-form-label">Price</label>
				                                    <div className="col-sm-9">
				                                       <input type="number" className="form-control form-control-lg"
					                                        name="price" 
					                                        onChange={handleChange}
					                                        value={formState.values.price || ''}
					                                        />	
				                                    </div>
				                                 </div>
				                              </div>				                              
				                           </div>
				                           <div className="row">
				                              <div className="col-md-6">
				                                 <div className="form-group row">
				                                    <label className="col-sm-3 col-form-label">Stock</label>
				                                    <div className="col-sm-9">
				                                       <input type="text" className={'form-control form-control-lg' + (submitted && !formState.values.stock ? ' is-invalid' : '')} 
					                                        name="stock" 
					                                        onChange={handleChange}
					                                        value={formState.values.stock || ''}
					                                        />	
					                                        {submitted && !formState.values.stock &&
					                                            <div className="inline-errormsg">Stock is required</div>
					                                        }		
				                                    </div>
				                                 </div>
				                              </div>				                              
				                           </div>
				                            <div className="text-center">
				                            	<button type="submit" className="btn btn-primary me-2">Submit</button>
                    							<Link to="/products"><button className="btn btn-light">Cancel</button></Link>
                    						</div>
				                        </form>
				                     </div>
				                  </div>
				               </div>
				            </div>
			            </div>
				       <Footer/>
				    </div>
				</div>
			</div>
		</>
		)
}

export default AddProduct;