const mongoose = require('mongoose');
const foodPartnerModel = require("../models/foodpartner.model");

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
            return res.status(400).json({
                message: "Invalid food partner ID format."
            });
        }

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);

        if (!foodPartner) {
            return res.status(404).json({  // Fixed typo: josn -> json
                message: "Food Partner not found."
            });
        }

        res.status(200).json({
            message: "Food partner retrieved successfully.",
            foodPartner
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving food partner.",
            error: error.message
        });
    }
}

module.exports = {
    getFoodPartnerById
}   