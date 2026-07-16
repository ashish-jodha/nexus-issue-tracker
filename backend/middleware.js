const Project = require("./models/project");
const Ticket = require("./models/ticket");
const { projectValidation, ticketValidation } = require("./schema");

module.exports.isLoggedIn = (req , res , next) => {
    if (!req.isAuthenticated()) return res.status(401).json({error: "You are not allowed to access it"});
    next();
}

module.exports.validateProject = async(req , res , next) => {
    const {error , value} = projectValidation.validate(req.body);

    if (error) return res.status(400).json({err: error.details[0].message});

    req.body = value;
    next();
}

module.exports.validateTicket = async(req , res , next) => {
    const {error , value} = ticketValidation.validate(req.body);

    if (error) return res.status(400).json({err: error.details[0].message});

    req.body = value;
    next();
}

module.exports.isProjectOwner = async(req , res , next) => {
    const {id} = req.params;

    const foundProject = await Project.findById(id);

    if (!foundProject) return res.status(404).json({error: "Project Not Found"});

    if (!foundProject.owner.equals(req.user._id)) return res.status(403).json({error: "You do not have permission to modify this Project"});

    next();
}

module.exports.isTicketAuthor = async(req , res , next) => {
    const {id} = req.params;

    const foundTicket = await Ticket.findById(id).populate('project');

    if (!foundTicket) return res.status(404).json({error: "Ticket Not Found"});

    if (!foundTicket.author.equals(req.user._id) && !foundTicket.project.owner.equals(req.user._id)) return res.status(403).json({error: "You are not allowed to modify this ticket"});

    next();
}