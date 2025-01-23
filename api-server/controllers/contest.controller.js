import {Contest} from '../models/Contest.model.js';


const createContest = async (req, res) => {
    const {
        title, 
        label='Public',
        Questions=[],
        StartTime, 
        EndTime,
    } = req.body;
    const owner = req?.user?._id;

    if(!title || !StartTime || !EndTime || !owner){
        return res.status(400).send({message: 'title, StartTime and EndTime are required'});
    }

    try {
        const contest = await Contest.create({
            title: title, 
            label: label,
            Questions : Questions,
            StartTime : StartTime, 
            EndTime : EndTime,
            owner: owner
        });

        if(!contest){
            return res.status(400).send({message: 'Contest could not be created'});
        }

        res
        .status(201)
        .json({contest});
    } catch (error) {
        res
        .status(400)
        .send(error);
    }
}

const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find({});
        if(!contests){
            return res.status(404).send({message: 'No contest found'});
        }

        const pContests = contests.filter(contest => contest.label === 'Public');
        const publicContests = pContests.map(contest => {
            return {
                _id: contest._id,
                title: contest.title,
                StartTime: contest.StartTime,
                EndTime: contest.EndTime,
            }
        }
        );

        res
        .status(200)
        .json({publicContests});
    } catch (error) {
        res
        .status(400)
        .send(error);
    }
}


export {
    createContest,
    getAllContests
}