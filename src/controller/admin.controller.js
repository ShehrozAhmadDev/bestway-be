import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { firstName, lastName, username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);
    // Create admin
    const admin = new Admin({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Log in a admin
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      admin.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET);
    res.json({ status: 200, token });
  } catch (error) {
    next(error);
  }
};

// Get the admin profile
export const getAdminProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

//  Edit Admin
export const editAdmin = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await Admin.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Admin not found");
    }
    res.status(200).json({
      status: true,
      message: "Admin Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
