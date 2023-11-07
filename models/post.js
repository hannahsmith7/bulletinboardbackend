const mongoose = require('mongoose')

const departments = [
    "Human Resources",
    "Finance",
    "Marketing",
    "Sales",
    "Information Technology (IT)",
    "Research & Development (R&D)",
    "Operations",
    "Procurement",
    "Customer Service",
    "Logistics",
    "Engineering",
    "Legal",
    "Public Relations",
    "Administration",
    "Quality Assurance",
    "Production",
    "Design",
    "Strategy & Planning",
    "Health & Safety",
    "Environmental Affairs"
];

const postschema = mongoose.Schema({
    
    // Title
    title: {type: String, required:true},

    // Description
    description: {type: String, required:true},

    // Departments
    departments: [{type: String, required:true,enum: departments}],

    // Author
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},

    // Status
    status: {type: String, enum: ['open', 'closed'], default:'open'}
});
    
module.exports = mongoose.model('Post', postschema);