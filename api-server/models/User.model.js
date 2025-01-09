import mongoose, {model, Schema} from 'mongoose';


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
        type: String,
        required: true
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

export const User = model('User', UserSchema);