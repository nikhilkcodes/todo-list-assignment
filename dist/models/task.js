"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require the library
const mongoose_1 = __importDefault(require("mongoose"));
// creating Schema for Tasks
const taskSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
const Task = mongoose_1.default.model('Task', taskSchema);
// exporting the Schema
module.exports = Task;
