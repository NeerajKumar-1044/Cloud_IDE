import mongoose, {model, Schema} from 'mongoose';

// it is like a lab for the question, where the question will be tested and the result will be shown

const PlayGroundSchema = new Schema({
    classRoom: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom',
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }],
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

export const PlayGround = model('PlayGround', PlayGroundSchema);