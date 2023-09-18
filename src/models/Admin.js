import mongoose from "mongoose";
var Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },

  registeredDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
