import {ClassRoom} from '../models/ClassRoom.model.js';

// Create a new classroom

const createClassRoom = async (req, res) => {
    console.log('Creating a new classroom');
    try {
        const {data} = req.body;
        const owner = req?.user?._id;
        // console.log(data);
        const {name, joinCode, subowners} = data;
        
        if (owner === undefined || owner.toString() !== req?.user?._id.toString()) {
            console.log('Owner is not the same as the logged in user');
            console.log(req?.user?._id);
            console.log(owner);
            return res
                .status(400)
                .json({message: 'Invalid data'});
        }
        

        // Check if the classroom with the same name already exists
        const classRoom = await ClassRoom.findOne({joinCode:joinCode});
        
        
        if(classRoom) {
            return res
            .status(400)
            .json({message: 'Classroom with the same name and join code already exists'});
        }

        const newClassRoom = await ClassRoom.create({
            owner: owner ?? null,
            name: name,
            joinCode: joinCode,
            subOwner: subowners ?? [],
        });
        await newClassRoom.save();
        const CreatedClassRoom = await ClassRoom.findById(newClassRoom._id)
        .select('-__v -subOwner -owner -joinCode -students -playGrounds -discussions -contestHistory');

        if(!CreatedClassRoom) {
            return res
            .status(400)
            .json({message: 'Classroom could not be created'});
        }

        // console.log(CreatedClassRoom);

        res.status(201).json(CreatedClassRoom);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const getAllClassRooms = async (req, res) => {
    // console.log(req?.user?._id);
    // console.log('Getting all classrooms');
    try {
        const classrooms = await ClassRoom.find({owner: req?.user?._id})
        .select('-__v -subOwner -owner -joinCode -students -playGrounds -discussions -contestHistory');
        // console.log("all classrooms:- ", classrooms);
        if(!classrooms) {
            return res
            .status(200)
            .json([]);
        }

        res.status(200).json(classrooms);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const getEnrolledClassrooms = async (req, res) => {
    // use aggregation pipeline to find all the classrooms where the student is enrolled
    // and student is an array in model
    // console.log(req?.user?._id);
    // console.log('Getting all classrooms');
    try {
        const classrooms = await ClassRoom.find({students: req?.user?._id})
        .select('-__v -subOwner -owner -joinCode -students -playGrounds -discussions -contestHistory');;
        // console.log("all classrooms:- ", classrooms);
        if(!classrooms) {
            return res
            .status(200)
            .json([]);
        }

        res.status(200).json(classrooms);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const JoinClassRoom = async (req, res) => {
    console.log('Joining a classroom');
    try {
        const {joinCode} = req.body;
        const student = req?.user?._id;
        // console.log(joinCode);
        if(!joinCode || !student) {
            return res
            .status(400)
            .json({message: 'Invalid data or data not available ☠️'});
        }
        const classRoom = await ClassRoom.findOne({joinCode:joinCode});
        // console.log(classRoom);
        if(!classRoom) {
            return res
            .status(400)
            .json({message: 'Classroom with the given join code does not exist'});
        }

        if(classRoom.students.includes(student)) {
            return res
            .status(400)
            .json({message: 'You are already a student of this classroom'});
        }
        if(classRoom.owner.toString() === student.toString()) {
            return res
            .status(400)
            .json({message: 'You are the owner of this classroom 🥸'});
        }

        classRoom.students.push(student);
        await classRoom.save({validateBeforeSave: true});
        const JoinedClassRoom = await ClassRoom.findById(classRoom._id)
        .select('-__v -subOwner -owner -joinCode -students -playGrounds -discussions -contestHistory');

        if(!JoinedClassRoom) {
            return res
            .status(400)
            .json({message: 'Classroom could not be joined'});
        }

        // console.log(JoinedClassRoom);

        res
        .status(201)
        .json(JoinedClassRoom);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

export {
    createClassRoom,
    getAllClassRooms,
    JoinClassRoom,
    getEnrolledClassrooms
}