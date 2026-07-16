require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/project');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const seedData = require('./data');

mongoose.connect('mongodb://127.0.0.1:27017/nexus')
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

const initDB = async () => {
    try {
        await Project.deleteMany({});
        await Ticket.deleteMany({});
        await User.deleteMany({});

        const ownerPassword = process.env.OWNER_PASSWORD;
        const membersPassword = process.env.MEMBERS_PASSWORD;
        if (!ownerPassword || !membersPassword) throw new Error("PASSWORD environment varaibles is missing");

        const user = new User({ username: 'Ashish' });
        const seedUser = await User.register(user, ownerPassword);

        const teamMember = [];
        const dummyNames = [
            'Alex_Dev', 'Sarah_QA', 'Jordan_Ops', 'Priya_Design',
            'Mike_Backend', 'Elena_Frontend', 'David_Sec', 'Nina_Data',
            'Omar_DevOps', 'Chloe_UI', 'Sam_QA', 'Rita_Product',
            'Leo_Mobile', 'Maya_Cloud', 'Zane_SysAdmin'
        ];

        for (let name of dummyNames) {
            const user = new User({ username: name });
            const member = await User.register(user, membersPassword);
            teamMember.push(member);
        }

        for (let projectData of seedData) {
            const ticket = projectData.tickets;

            const newProject = new Project({
                title: projectData.title,
                description: projectData.description,
                owner: seedUser._id
            })

            for (let ticketData of ticket) {
                const index = Math.floor(Math.random() * teamMember.length);

                const newTicket = new Ticket({
                    title: ticketData.title,
                    description: ticketData.description,
                    status: ticketData.status,
                    priority: ticketData.priority,
                    project: newProject._id,
                    author: teamMember[index]._id
                })

                newProject.tickets.push(newTicket._id);
                await newTicket.save();
            }

            await newProject.save();
        }

        console.log("Database Initialization Successfull");
    }
    catch (err) {
        console.log(`Database Initialization Failed: ` , err);
    }
    finally {
        mongoose.connection.close();
    }
}

initDB();