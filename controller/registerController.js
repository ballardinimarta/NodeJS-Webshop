const UserSchema = require('../model/User')
const bcrypt = require('bcrypt') 


const registerRender = (req, res) => {
    res.render('register_form.ejs', {err: ''}) 
}

const registerSubmit = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        await new UserSchema({
            username: username,
            email: email,
            password: hashedPassword
        }).save()
        
        return res.redirect('/login') 
    }
    catch(err) {
        if(err) 
        return res.render('register_form.ejs', {err: err})
    }
}

module.exports = {
    registerRender,
    registerSubmit
} 

