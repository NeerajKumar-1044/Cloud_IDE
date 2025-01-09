import mongoose, {model, Schema} from 'mongoose';

const ClassRoomSchema = new Schema({
    joinCode: {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    subOwner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    playGrounds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PlayGround'
        }
    ], // labs and assignments
    discussions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Discussion'
        }
    ],
    contestHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ],
    contest: {
        type: Schema.Types.ObjectId,
        ref: 'Contest'
    } // current contest, exam, quiz etc.


}, {timestamps: true});

export const ClassRoom = model('ClassRoom', ClassRoomSchema);