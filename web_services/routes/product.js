const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const {verifyTokenAndAdmin} = require("./verifyToken");
const upload = require('../utils/uploadFiles');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


//Create Product
router.post("/", verifyTokenAndAdmin, (req, res) => {
	upload(req, res, async function (err) {
	  if (err instanceof multer.MulterError) {
		// A multer error occurred when uploading
		return res.status(400).json({ status: 0, message: err.message });
	  } else if (err) {
		// An unknown error occurred when uploading
		return res.status(500).json({ status: 0, message: err.message });
	  }
	  
	  const { title, description, categories, size, color, price, stock, productType } = req.body;
	  
	  try {
		// Create a new product object
		const newProduct = new Product({
		  title,
		  description,
		  images: [], // Initially empty, will be updated after directory creation
		  categories: categories ? categories.split(',') : [],
		  size,
		  color,
		  price,
		  stock,
		  productType
		});
		
		// Save product to get its ID
		const savedProduct = await newProduct.save();
		
		// Create a new directory for the product
		const productDir = `public/uploads/${savedProduct._id}/files`;
		if (!fs.existsSync(productDir)) {
		  fs.mkdirSync(productDir, { recursive: true });
		}
		
		// Move files from temp directory to the new product directory
		const tempDir = 'public/uploads/temp';
		const files = fs.readdirSync(tempDir);
		const imagePaths = [];
  
		files.forEach(file => {
		  const oldPath = path.join(tempDir, file);
		  const newPath = path.join(productDir, file);
  
		  fs.renameSync(oldPath, newPath); // Move file
  
		  imagePaths.push(`/uploads/${savedProduct._id}/files/${file}`);
		});
  
		// Update product with image paths
		savedProduct.images = imagePaths;
		await savedProduct.save();
		
		res.status(200).json({
		  status: 1,
		  message: "Product added successfully",
		  data: [savedProduct]
		});
  
	  } catch (err) {
		res.status(500).json({ status: 0, message: err.message });
	  }
	});
  });
  

// Update Product
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
	
	try{
		const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
			$set:req.body
		},{new:true});
		
		if(updatedProduct == null){
			res.status(200).json({success:0,message:"No Data Found!"});
		}else{
			res.status(200).json({success:1,message:"Product updated successfully",data:[updatedProduct]})
		}
		
	}catch(err){
		res.status(500).json({status:0,message:err.message})
	}
});


//Get All Products
router.get("/", async (req,res)=>{
	try{
		
		const itemPerPage = parseInt(req.query.limit || "10"); //Products per page
  		const pageNum = parseInt(req.query.page || "0"); //Products page number
  		const sortByVal = (req.query.sortBy || "_id"); //Products sort by
		const searchText = (req.query.searchText || ""); //Products search text
		const priceFilter = (req.query.price || ""); //Products search text

  		
  		let sortObject = {};
  		let filterObj = {};
  		let searchTextObj = {};
  		let priceObject = {};
  		sortByField = sortByVal;
  		if(sortByVal == 'name'){
  			sortByField = 'title'; 
  		}

  		if(searchText !== ''){
  				searchTextObj = {
							       $or : [
							          { title: { $regex: searchText, $options:'i' } },
	  								  { description: { $regex: searchText, $options:'i' } }
							       ]
							    };

  		}

  		if(priceFilter !== ''){
  			priceObject = 	{price: {$lte: priceFilter}};
  		}


	    filterObj = {
					 $and : [							    
					    searchTextObj,
					    priceObject
					 ]
				   };


  		sortObject[sortByField] = 1;  		
  		
  		
  		const totalProducts = await Product.countDocuments(filterObj);
		const productData = await Product.find(filterObj).sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);
		

		let numOfPages = parseInt(totalProducts/itemPerPage);

		if(productData){
			res.status(200).json({success:1,message:"", numOfPages ,data:productData});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
		
	}catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})

//Get All Products
router.get("/all", async (req,res)=>{
	try{
  		const totalProducts = await Product.countDocuments({});
		const productData = await Product.find({}).sort({_id: 1});

		if(productData){
			res.status(200).json({success:1,message:"", data:productData});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
		
	}catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})

//get product by type
router.get("/type/:productType", async (req,res)=>{
	try{
		const { productType } = req.params;
		const productData = await Product.find({productType}).sort({_id: 1});

		if(productData){
			res.status(200).json({success:1,message:"", data:productData});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
		
	}catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})

//Get Single Product
router.get("/find/:id", async (req,res)=>{
	
	try{
		const productData = await Product.findById(req.params.id);
		
		if(productData){
			res.status(200).json({success:1,message:"",data:productData});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
		
	}catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})


// Delete Product
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{

	try{
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
	
		if(deletedProduct == null){
			res.status(200).json({success:0,message:"No Data Found!"});
		}else{
			res.status(200).json({success:1,message:"Product deleted successfully"});
		}		
		
	}catch(err){
		
		res.status(500).json({status:0,message:err.message})
	}
});

module.exports = router;