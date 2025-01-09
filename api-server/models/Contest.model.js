import mongoose, {model, Schema} from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const ContestSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
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
    Participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {timestamps: true});

ContestSchema.plugin(aggregatePaginate);

export const Contest = model('Contest', ContestSchema);