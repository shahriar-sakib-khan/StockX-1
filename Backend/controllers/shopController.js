// import { Router } from "express";
// import Shop from "../models/Shop.js"; // Assuming you have a Shop model
// import verifyToken from "../middlewares/verifyToken.js";

// // Create a new shop
// export const createShop = async (req, res) => {
//     try {
//     const newShop = await Shop.create({ ...req.body, owner: req.user.id });
//     return res.status(201).json(newShop);
//     } catch (error) {
//     return res.status(500).json({ error: error.message });
//     }
// };

// // Get all shops
// export const getAllShops = async (req, res) => {
//     try {
//     const shops = await Shop.find().populate("owner", "-password");
//     return res.status(200).json(shops);
//     } catch (error) {
//     return res.status(500).json({ error: error.message });
//     }
// };

// // Get a single shop by ID
// export const getShopById = async (req, res) => {
//     try {
//     const shop = await Shop.findById(req.params.id).populate(
//         "owner",
//         "-password"
//     );
//     if (!shop) return res.status(404).json({ msg: "Shop not found" });
//     return res.status(200).json(shop);
//     } catch (error) {
//     return res.status(500).json({ error: error.message });
//     }
// };

// // Update shop by ID
// export const updateShop = async (req, res) => {
//     try {
//     const shop = await Shop.findById(req.params.id);
//     if (!shop) return res.status(404).json({ msg: "Shop not found" });

//     if (shop.owner.toString() === req.user.id) {
//         const updatedShop = await Shop.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true }
//         );
//         return res.status(200).json(updatedShop);
//     } else {
//         return res.status(403).json({ msg: "You can update only your own shop" });
//     }
//     } catch (error) {
//     return res.status(500).json({ error: error.message });
//     }
// };

// // Delete shop by ID
// export const deleteShop = async (req, res) => {
//     try {
//     const shop = await Shop.findById(req.params.id);
//     if (!shop) return res.status(404).json({ msg: "Shop not found" });

//     if (shop.owner.toString() === req.user.id) {
//         await Shop.findByIdAndDelete(req.params.id);
//         return res.status(200).json({ msg: "Shop deleted successfully" });
//     } else {
//         return res.status(403).json({ msg: "You can delete only your own shop" });
//     }
//     } catch (error) {
//     return res.status(500).json({ error: error.message });
//     }
// };

// // Optional: create the router
// export const shopRouter = Router();

// shopRouter.post("/", verifyToken, createShop);
// shopRouter.get("/", getAllShops);
// shopRouter.get("/:id", getShopById);
// shopRouter.put("/:id", verifyToken, updateShop);
// shopRouter.delete("/:id", verifyToken, deleteShop);
