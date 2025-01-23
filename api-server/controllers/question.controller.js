import {Question} from '../models/Question.model.js';


const CreateQuestion = async (req, res) => {
    console.log("CreateQuestion");
    const {
        codeTemplate = '', 
        language = 'CPP', 
        title,//
        label = 'Public',//
        description = '',
        testCases = [], 
        points = 10, //
        deadline = null, 
        sampleInput = null,
        sampleOutput = null,
        status = 'Medium', //
        MemoryLimit = 1024,
        TimeLimit = 50000
    } = req.body;
    const owner = req?.user?._id;
    
    if(!title || !description || !owner){
        return res
        .status(400)
        .json({message: 'Please provide all the required fields'});
    }

    try {
        const question = await Question.create({
            title : title,
            label : label,
            codeTemplate : codeTemplate, 
            owner : owner, 
            language : language, 
            testCases : testCases, 
            sampleInput : sampleInput,
            sampleOutput : sampleOutput,
            points : points, 
            deadline : deadline , 
            status : status, 
            description : description,
            MemoryLimit : MemoryLimit,
            TimeLimit : TimeLimit
        });

        if(question){
            const CreateQuestion = await Question.findById(question._id)
            .select('-testCases -MemoryLimit -TimeLimit -sampleInput -solvedBy -__v -sampleOutput -description -discussion -deadline -language -owner -codeTemplate');
            res
            .status(201)
            .json({CreateQuestion});
        }

    
    } catch (error) {
        console.log(error);
        
        res
        .status(400)
        .json({message: 'Error while creating question', error: error});
    }
}

const GetAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({label:'Public'})
        .select('-testCases -MemoryLimit -TimeLimit -sampleInput -label -__v -sampleOutput -description -discussion -solvedBy -deadline -language -owner -codeTemplate');
  
        res
        .status(200)
        .json({Questions:questions});
    } catch (error) {
        res
        .status(400)
        .json({message: 'Error while fetching questions', error: error});
    }
}

const GetQuestionById = async (req, res) => {
    console.log("GetQuestionById");
    const id = req?.query?.id;
    if(!id){
        return res
        .status(400)
        .json({message: 'Please provide question id'});
    }
    console.log(id);
    try {
        const question = await Question.findById(id)
        .select('-testCases -discussion -MemoryLimit -TimeLimit -__v -label -solvedBy -deadline -language -owner');
        if(question){
            res
            .status(200)
            .json({Question:question});
        }
        else{
            res
            .status(404)
            .json({message: 'Question not found'});
        }
    }
    catch (error) {
        res
        .status(400)
        .json({message: 'Error while fetching question', error: error});
    }
}


export {
    CreateQuestion,
    GetAllQuestions,
    GetQuestionById
}
