import bcrypt from "bcrypt";
import mongoose from "mongoose";
import adminModel from "../Model/AdminModel.js";
import artModel from "../Model/ArtModel.js";
import categoryModel from "../Model/CategoryModel.js";
const ObjectId = mongoose.Types.ObjectId;
export const AdminLogin = async (req, res) => {
  try {
    // console.log(req.query);
    let { email, password } = req.query;
    email = email.toLowerCase();
    const admin = await adminModel.findOne({ email });
    console.log(admin);
    if (admin) {
      let correct = await bcrypt.compare(password, admin.password);

      if (correct) {
        res.json({ success: true, message: "Login Successfull." });
      } else {
        res.json({ success: false, message: "Password Incorrrect" });
      }
    } else {
      res.json({ success: false, message: "Email Incorrrect" });
    }
    // password = await bcrypt.hash(password, 12);
    // console.log(password);

    // await adminModel.create({
    //   email,
    //   password
    // });
  } catch (error) {
    console.log(error);
  }
};
export const addArt = async (req, res) => {
  try {
    let { name, cost, size, category } = req.query;
    console.log(req.file.filename);

    await artModel.create({
      name,
      cost,
      size,
      category,
      image: req.file.filename,
    });

    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {}
};
export const addCategory = async (req, res) => {
  try {
    let { category } = req.query;
    category = category.toLowerCase();
    const ifCategory = await categoryModel.findOne({ category: category });
    if (ifCategory) {
      console.log("DM");
      return res.json({ success: false, message: "Category already added" });
    } else {
      await categoryModel.create({
        category,
      });
      console.log("DONE");
      return res.json({
        success: true,
        message: "Category added successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = async (req, res) => {
  try {
    console.log("HI");
    const categories = await categoryModel.find({});
    res.json({ success: true, categories });
  } catch (error) {
    console.log(error);
  }
};
export const getAllArtWorks = async (req, res) => {
  try {
    const allArtWorks = await artModel.find({});
    res.json({ success: true, allArtWorks });
  } catch (error) {
    console.log(error);
  }
};
export const deleteArtWork=async(req,res)=>{
  try {
    const {id}=req.query
    await artModel.deleteOne({
      _id: new ObjectId(id),
    });
    res.json({success:true,message:"ART DELETED SUCCESSFULLY"})
  } catch (error) {
    console.log(error);
    
  }
}