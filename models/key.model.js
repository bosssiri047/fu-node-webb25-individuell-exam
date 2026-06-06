import mongoose from "mongoose";

const Schema = mongoose.Schema;

const keySchema = new Schema({
    key : String
});

const Key = mongoose.model('Key', keySchema);

export default Key;