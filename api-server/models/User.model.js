import mongoose, {model, Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserSchema  =new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    },
    classRoomEnrolledIn: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom'
    },
    classRoomOwned: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom'
    },
    solvedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    contestsParticipated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ],
    streak: [{
        date: Date,
        submissions: Number
    }]
    
}, {timestamps: true});



UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({ 
        id: this._id, 
        name: this.name 
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    return token;
  };
UserSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ 
        id: this._id, 
        name: this.name 
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return token;
  };

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = model('User', UserSchema);