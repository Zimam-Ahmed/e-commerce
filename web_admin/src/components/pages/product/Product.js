import {Link} from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/ProductActions";
import getProductImageUrl from '../../../utils/imageURL';


const Product = (props) => {
	let {_id, title,images,price,stock} = props.product;
	console.log(getProductImageUrl(images[0]))
	const dispatch = useDispatch();

	  const deletehandler = (id) => {
	    if (window.confirm("Are you sure want to delete product?")) {
	      dispatch(deleteProduct(id));
	    }
	  };
	return(
		<>
		    <tr>
              <td>{title}</td>
              <td><img src={getProductImageUrl(images[0])} alt={title}/></td>
              <td>{price}</td>
              <td>{stock}</td>
              <td><Link
	                to={`/product/edit/${_id}`}	                
	              >
	              	<i className="fa fa-edit"></i>
	              </Link>
	              <Link
	                to="#"
	                onClick={() => deletehandler(_id)}	                
	              >
	              	<i className="fa fa-trash"></i>
	              </Link>
	           </td>
            </tr>
		</>
		)
}

export default Product;