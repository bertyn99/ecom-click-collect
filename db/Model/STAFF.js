const mongoose = require('mongoose');
const config = require("../../config")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const validator = require('validator');



let staffSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email.')
            }

        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        set: function (val) {
            return val.replace(' ', '');
        },
        minlength: 5,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password.')
            }
            /* add number in password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            add one Maj a t least in the password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            
            */
        }
    },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createIp: { type: String, required: false },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    resetPassword: { type: Object, required: false },
    mobile: { type: String, minlength: 10 }
}, {
    timestamps: true
});

staffSchema.methods.generateAuthToken = async function () {
    const staff = this
    const token = jwt.sign({ _id: staff._id.toString(), role: staff.role }, config.JWT_SECRET)
    staff.tokens = staff.tokens.concat({ token })
    await staff.save()

    return token
}
staffSchema.statics.findByCredentials = async (email, password) => {
    const staff = await Staff.findOne({ email })
    console.log(staff)
    if (!staff) {
        throw new Error('Unable to login.')
    }

    const isMatch = await bcrypt.compare(password, staff.password)

    if (!isMatch) {
        throw new Error('Unable to login.')
    }
    return staff
}

staffSchema.pre('save', async function (next) {
    const staff = this
    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8)
    }

    next()
})
function modelAlreadyDeclared() {
    try {
        mongoose.model('Staff')  // it throws an error if the model is still not defined
        return true
    } catch (e) {
        return false
    }
}
console.log(process.env.NODE_ENV)
/*const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema)   !modelAlreadyDeclared() ? mongoose.model("Staff", staffSchema) : mongoose.model('Staff') */
if (process.env.NODE_ENV === 'production') {
    module.exports = mongoose.model("Staff", staffSchema);
} else {
    module.exports = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
}
