import mongoose, {model, Schema} from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    content: {
        type: String,
    },
    votes: {
        type: Number,
    }
}, {timestamps: true});


CommentSchema.plugin(aggregatePaginate);

export const Comment = model('Comment', CommentSchema);