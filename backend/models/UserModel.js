const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    hospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    ]
})

//static methods
//signup
userSchema.statics.signup = async function (name, username, password, hospitals) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    const usernameExists = await this.findOne({ username });

    if (usernameExists) {
        throw Error('Username is taken, please choose another one');
    }

    //validation
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is too weak')
    }

    //password hashing
    const hash = await bcrypt.hash(password, 10);

    //storing data
    const user = await this.create({ name, username, password: hash, hospitals })

    //sending email to admin
    /*     sendEmail(email, username, confirmation.code); */

    return user;
}

//signup
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('Missing data');
    }
    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Invalid Username');
    }

    //password checking
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error('Incorrect Password');
    }

    /*     if (!user.verified) {
            throw Error('Please verify your e-mail before logging in.')
        } */

    //sending email to admin
    /*     sendEmail(email, username, confirmation.code); */

    return user;
}

userSchema.statics.findAndUpdate = async function ({ id, name, username, password, hospitals }) {
    if (password) {
        //validation
        if (!validator.isStrongPassword(password)) {
            throw Error('Password is too weak')
        }
        //password hashing
        const hash = await bcrypt.hash(password, 10);
        const user = await this.findByIdAndUpdate(id, { name, username, password: hash, hospitals });
        return user;
    }
    const user = await this.findByIdAndUpdate(id, { name, username, hospitals });
    return user;
}

module.exports = mongoose.model('User', userSchema);