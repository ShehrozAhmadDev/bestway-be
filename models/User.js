import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: {
    type: String,
    default: "Buyer",
    enum: ["Buyer", "Seller"],
  },
  registeredDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
