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


UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };

export const User = model('User', UserSchema);