const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Ticket = require('../models/ticket');
const { isTicketAuthor, validateTicket, isLoggedIn } = require('../middleware');
const Project = require('../models/project');

router.post('/', isLoggedIn, validateTicket, async (req, res) => {
    const { projectId } = req.params;
    const { ticket } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project Not Found" });

    const newTicket = new Ticket(ticket);
    newTicket.project = projectId;
    newTicket.author = req.user._id;

    project.tickets.push(newTicket);

    await project.save();
    await newTicket.save();

    res.status(201).json({ message: "Ticket successfully created", ticket: newTicket });
})

router.delete('/:id', isLoggedIn, isTicketAuthor, async (req, res) => {
    const { projectId, id } = req.params;
    await Project.findByIdAndUpdate(projectId, { $pull: { tickets: id } });
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket Successfully Deleted" });
})

module.exports = router;