import mongoose, {model, Schema} from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


const DiscriptionSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    refrences:[{
        type: URL,
    }],
    sampleInput: [{
        type: String,
        required: true
    }]
}, {timestamps: true});

DiscriptionSchema.plugin(aggregatePaginate);

export const Discription = model('Discription', DiscriptionSchema);