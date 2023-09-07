const Product = require('../models/Product')
const User = require('../models/User')
class productController{
    // Get all products
    get(req, res) {
        Product.find()
        .sort({'_id': -1})
        .then(products => {
            res.status(200).json(products);
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
    }

    // Create product
    create(req, res) {
        const { name, description, price, category, images: pictures } = req.body;
        Product.create({ name, description, price, category, pictures })
        .then(product => {
            Product.find()
            .then(products => {
                res.status(201).json(products);
            })
            .catch(error => {
                res.status(400).send(error.message);
            });
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
    }

    // Update product
    update(req, res) {
        const { id } = req.params;
        const { name, description, price, category, images: pictures } = req.body;
        Product.findByIdAndUpdate(id, { name, description, price, category, pictures })
        .then(product => {
            Product.find()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(error => {
                res.status(400).send(error.message);
            });
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
    }

    // Delete product
    deleteProduct(req, res) {
        console.log("CHU HIEU")
        const { id } = req.params;
        const { user_id } = req.body;
        User.findById(user_id)
        .then(user => {
            if (!user.isAdmin) {
            return res.status(401).json("You don't have permission");
            }
            Product.findByIdAndDelete(id)
            .then(() => {
                Product.find()
                .then(products => {
                    res.status(200).json(products);
                })
                .catch(error => {
                    res.status(400).send(error.message);
                });
            })
            .catch(error => {
                res.status(400).send(error.message);
            });
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
    }

    // Get product by ID
    getById(req, res) {
        const { id } = req.params;
        Product.findById(id)
        .then(product => {
            Product.find({ category: product.category })
            .limit(5)
            .then(similar => {
                res.status(200).json({ product, similar });
            })
            .catch(error => {
                res.status(400).send(error.message);
            });
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
    }

    getCategory(req, res) {
        const { category } = req.params;
        const sort = { '_id': -1 }; 
        let query = {}; 
        if (category !== 'all') {
            query.category = category; 
        }
        Product.find(query)
            .sort(sort)
            .then((products) => {
                res.status(200).send(products);
            })
            .catch((e) => {
                res.status(400).send(e.message);
            });
    }

    addToCart(req,res){   
        const {userId, productId, price} = req.body; 
        User.findById(userId)
        .then( (user) => {
            const userCart = user.cart;
            if(user.cart[productId]){
            userCart[productId] += 1;
            } else {
            userCart[productId] = 1;
            }
            userCart.count += 1;
            userCart.total = Number(userCart.total) + Number(price);
            user.cart = userCart;
            user.markModified('cart');
            return user.save()
            })
            .then((user) => {
                res.status(200).json(user);
            })   
            .catch((e) => {
            res.status(400).send(e.message);
            })
    }

    increaseCart(req,res){
        const { userId, productId, price } = req.body;
        User.findById(userId)
            .then((user) => {
            const userCart = user.cart;
            userCart.total += Number(price);
            userCart.count += 1;
            userCart[productId] += 1;
            user.cart = userCart;
            user.markModified('cart');
            return user.save();
            })
            .then((user) => {
            res.status(200).json(user);
            })
            .catch((e) => {
            res.status(400).send(e.message);
            });
    }
    decreaseCart(req,res){
        const { userId, productId, price } = req.body;
        User.findById(userId)
            .then((user) => {
            const userCart = user.cart;
            userCart.total -= Number(price);
            userCart.count -= 1;
            userCart[productId] -= 1;
            user.cart = userCart;
            user.markModified('cart');
            return user.save();
            })
            .then((user) => {
            res.status(200).json(user);
            })
            .catch((e) => {
            res.status(400).send(e.message);
            });
    }
    removeFromCart(req, res){
        const { userId, productId, price } = req.body;
        User.findById(userId)
          .then((user) => {
            const userCart = user.cart;
            userCart.total -= Number(userCart[productId]) * Number(price);
            userCart.count -= userCart[productId];
            delete userCart[productId];
            user.cart = userCart;
            user.markModified('cart');
            return user.save();
          })
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((e) => {
            res.status(400).send(e.message);
          });
    }
}

module.exports = new productController();