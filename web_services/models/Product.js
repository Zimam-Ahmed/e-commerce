const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const productTypes = ['Hoodies', 'SweatShirts', 'PrintedTies', 'POD', 'Formal']
const categoriesTypes = ['Men', 'Woman']
const ProductSchema = new mongoose.Schema({
	title:{type:String, required:true},
	description:{type:String, required:true},
	images:{type:[String], required:true},
	categories:{type:String, enum: categoriesTypes},
	size:{type:String},
	color:{type:String},
	price:{type:SchemaTypes.Double},
	stock:{type:Number},
	productType:{
		type: String,
		required: true,
		enum: productTypes
	},
	is_featured:{
		type: Boolean,
		required: true,
		default: false
	}
	},
{timestamps:true});
module.exports = mongoose.model("Product",ProductSchema);