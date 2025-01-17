import {ClassRoom} from '../models/ClassRoom.model.js';

// Create a new classroom

const createClassRoom = async (req, res) => {
    console.log('Creating a new classroom');
    try {
        const {data} = req.body;
        // console.log(data);
        const {owner, name, joinCode, subowners} = data;
        
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
        const CreatedClassRoom = await ClassRoom.findById(newClassRoom._id);

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
        const classrooms = await ClassRoom.find({owner: req?.user?._id});
        console.log("all classrooms:- ", classrooms);
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

export {
    createClassRoom,
    getAllClassRooms
}