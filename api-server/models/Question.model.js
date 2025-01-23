import mongoose, { model, Schema } from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const QuestionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    label:{
        type: String,
        required: true,
        default: 'Public',
        enum: ['Private', 'Public']
    },
    codeTemplate: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Medium',
        enum: ['Medium', 'Easy', 'Hard']
    },
    discussion: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    language: {
        type: String,
        required: true,
    },
    testCases: [
        { type: String }
    ],
    MemoryLimit: {
        type: Number,
        default: 1024 // 1024 KB
    },
    TimeLimit: {
        type: Number,
        default: 50000 // 5 seconds
    },
    sampleInput: [{
        type: String,
        required: true
    }],
    sampleOutput: [{
        type: String,
        required: true
    }],
    points: {
        type: Number
    },
    deadline: {
        type: Date
    },
    solvedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

}, { timestamps: true });

QuestionSchema.plugin(aggregatePaginate);

export const Question = model('Question', QuestionSchema);