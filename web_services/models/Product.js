const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const productTypes = ['Hoodies', 'SweatShirts', 'PrintedTies', 'POD', 'Formal']

const ProductSchema = new mongoose.Schema({
	title:{type:String, required:true},
	description:{type:String, required:true},
	images:{type:[String], required:true},
	size:{type:[String], required: true},
    color:{type:[String], required: true},
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