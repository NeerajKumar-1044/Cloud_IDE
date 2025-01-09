import mongoose, {model, Schema} from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const QuestionSchema = new Schema({
    codeTemplate: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    language : {
        type: String,
        required: true,
    },
    testCases: [
        {type: String}
    ],
    solvedBy: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
    ],
    points: {
        type: Number
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        default: 'Medium',
        enum: ['Medium', 'Easy', 'Hard']
    },
    Hint :{
        type: String
    },
    discription: {
        type: Schema.Types.ObjectId,
        ref: 'Discription',
        required: true
    },
    discussion : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],

}, {timestamps: true});

QuestionSchema.plugin(aggregatePaginate);

export const Question = model('Question', QuestionSchema);