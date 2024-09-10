import {Link} from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../redux/actions/OrderActions";


const Order = (props) => {
	const { order } = props;
	
	const {
		_id,
		totalPrice,
		isPaid,
		createdAt,
		isDelivered,
		shippingAddress: { customer_name } = {},
		user_info = [{ email: 'N/A' }] 
	  } = order;

	const orderDate = new Date(createdAt);
	const localOrderDate = orderDate.toLocaleString('en-US');
	
	const dispatch = useDispatch();

	  const deletehandler = (id) => {
	    if (window.confirm("Are you sure want to delete order?")) {
	      dispatch(deleteOrder(id));
	    }
	  };
	return(
		<>
		    <tr>
			<td>{customer_name || 'N/A'}</td>
			<td>{user_info[0]?.email || 'N/A'}</td>
			<td>$ {totalPrice / 100}</td>
			<td>{isPaid ? "Yes" : "No"}</td>
			<td>{localOrderDate}</td>
			<td>{isDelivered ? "Delivered" : "Not Delivered"}</td>
			<td>
				<Link to={`/order/edit/${_id}`} className="text-success" title="View">
				<i className="fa fa-eye"></i>
				</Link>
				<Link to="#" title="Delete" onClick={() => deletehandler(_id)}>
				<i className="fa fa-trash"></i>
				</Link>
			</td>
			</tr>
		</>
		)
}

export default Order;