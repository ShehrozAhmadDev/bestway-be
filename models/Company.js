import mongoose from "mongoose";
var Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
