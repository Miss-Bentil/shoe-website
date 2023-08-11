const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('server is running');
});


// mongodb connection

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));


// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//Model

const userModel = mongoose.model('user', userSchema);

// Signup

app.post('/signup', async (req, res) => {
  const { email } = req.body;

  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      res.send({ message: 'Email id is already registered', alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: 'Sucessfully resgistered', alert: true });
    }
  });
});

// Login

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      // console.log(result);
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
        password:result.password
      };
      // console.log(dataSend);
      res.send({
        message: 'Login is successful',
        alert: true,
        data: dataSend,
      });
    }
     else {
      res.send({
        message: 'This email id is not registered, please signup',
        alert: false,
      });
    }
  });
});





// Product Section 

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  season: String,
  size: [String],
  gender: String,
  color:String,
  brand:String,
  availability:String
});

const productModel = mongoose.model('product', schemaProduct);

// app.get('/product',  async(req, res) => {
//   const data = await productModel.find({})
//   // console.log(data)
//   res.send(JSON.stringify(data));
// });

app.get('/product', async (req, res) => {
  try {
    const data = await productModel.find({});
    console.log(data); 
    res.send(data);
  } catch (error) {
     console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Error fetching products' });
  }
});



app.post('/uploadProduct', async(req,res) => {
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message: "uploaded successfully"})
})

app.post('/updateProduct', async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log(data);

    const updatedProduct = await productModel.findByIdAndUpdate(id, data);

    if (updatedProduct) {
      res.send({ message: 'Product updated successfully' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating product' });
  }
});






app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (deletedProduct) {
      res.send({ message: 'Product deleted successfull' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting product' });
  }
});












// // Secret key for JWT
// const secretKey = 'your-secret-key';

// // Middleware to verify the authentication token
// const verifyToken = (req, res, next) => {
//   const authToken = req.headers.authorization;

//   if (!authToken) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const token = authToken.split(' ')[1];
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// // Verify endpoint
// app.post('/verify', verifyToken, (req, res) => {
//   // If the middleware passes, the token is valid
//   res.json({ valid: true });
// });




// This was used to change the size from string to array 
// const Product = mongoose.model('product', schemaProduct);

// const migrateData = async () => {
//   try {
//     const products = await Product.find();

//     for (const product of products) {
//       const sizeArray = Array.isArray(product.size)
//         ? product.size
//         : [product.size.toString()];
//       product.size = sizeArray;
//       await product.save();
//       console.log(`Updated product ${product._id}`);
//     }

//     console.log('Data migration completed successfully.');
//   } catch (error) {
//     console.error('Error during data migration:', error);
//   } finally {
//     // Close the MongoDB connection after the migration
//     mongoose.connection.close();
//   }
// };

// migrateData();


// this was used to add more the fields brand, color and availability 
// async function updateDocuments() {
//   try {
//     const result = await productModel.updateMany(
//       {
//         $or: [
//           { brand: { $exists: false } },
//           { color: { $exists: false } },
//           { availability: { $exists: false } },
//         ],
//       },
//       {
//         $set: {
//           brand: 'defaultBrand',
//           color: 'defaultColor',
//           availability: 'defaultAvailability',
//         },
//       }
//     );
//     console.log('Documents updated successfully:', result);
//   } catch (err) {
//     console.log('Error updating documents:', err);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// updateDocuments();





app.listen(PORT, () => console.log(`this server is running on port ${PORT}`));
