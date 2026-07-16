const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Project = require('../models/project');
const { isLoggedIn, validateProject, isProjectOwner } = require('../middleware');
const Ticket = require('../models/ticket');

router.get('/', async (req, res) => {
    const allProjects = await Project.find();
    res.json(allProjects);
})

router.post('/', isLoggedIn, validateProject, async (req, res) => {
    const { project } = req.body;

    const newProject = new Project(project);
    newProject.owner = req.user._id;

    await newProject.save();

    res.status(201).json({ message: "Successfully created new Project", project: newProject });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id)
        .populate('owner')
        .populate({
            path: 'tickets',
            populate: ({
                path: 'author'
            })
        })

    if (!project) return res.status(404).json({ error: "Project Not Found" });

    res.status(200).json(project);
})

router.put('/:id', isLoggedIn, isProjectOwner, validateProject, async (req, res) => {
    const { id } = req.params;
    const { project } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, project, { new: true });
    res.status(200).json(updatedProject);
})

router.delete('/:id', isLoggedIn, isProjectOwner, async (req, res) => {
    const { id } = req.params;
    await Ticket.deleteMany({ project: id });
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project Successfully Deleted" });
})

module.exports = router;