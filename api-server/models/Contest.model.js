import mongoose, {model, Schema} from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const ContestSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    label: {
        type: String,
        required: true,
        default: 'Public',
        enum: ['Public', 'Private'],
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    StartTime: {
        type: Date,
        required: true
    },
    EndTime: {
        type: Date,
        required: true
    },
    Questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],

}, {timestamps: true});

ContestSchema.plugin(aggregatePaginate);

export const Contest = model('Contest', ContestSchema);