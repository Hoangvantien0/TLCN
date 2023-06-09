const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
  {
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  desc: {
    type: String,
    required: [true, "can't be blank"]
  },
  price: {
    type: String,
    required: [true, "can't be blank"]
  },
  category: {
    type: String,
    required: [true, "can't be blank"]
  },
  size: { 
    type: Array,
    required: [true, "can't be blank"]
  },
  color: { 
    type: Array ,
    required: [true, "can't be blank"]
  },
  pictures: {
    type: Array,
    required: true
  }
},
  {timestamps: true }
);


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;