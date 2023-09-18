import Company from "../models/Company.js";

// Register a new user
export const registerCompany = async (req, res, next) => {
  try {
    const { name } = req.body;

    const company = new Company({
      name,
    });

    await company.save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};
