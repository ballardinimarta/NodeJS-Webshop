const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require("../model/User");

const checkoutClicked = async (req, res) => {
    let totalprice;
        const user = await User.findOne({_id: req.user.user._id}).populate("myShoppingCart");
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if(user.myShoppingCart.length === 0) {
            totalprice = 0;
        } else {
        const prices = [];
        user.myShoppingCart.map(product => {
            prices.push(product.price * product.quantity);
        })
        totalprice = prices.reduce(reducer)
        }
    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: user.username, 
        address: { 
            line1: req.body.street, 
            postal_code: req.body.zip, 
            city: req.body.city, 
            country: req.body.country
        } 
    }) 
    .then((customer) => { 
        return stripe.charges.create({ 
            amount: totalprice * 100,    // Charing Rs 25 
            currency: 'SEK', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        user.myShoppingCart = []
        user.save();
        res.render('success.ejs',{user}) // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}

module.exports = {
checkoutClicked,
}