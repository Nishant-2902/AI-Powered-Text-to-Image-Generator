import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes auth middleware sets req.user.id
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Missing prompt" });
        }

        // Atomically check and decrement credits
        const user = await userModel.findOneAndUpdate(
            { _id: userId, creditBalance: { $gt: 0 } },
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        if (!user) {
            return res.status(403).json({ success: false, message: "No credit" });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const apiHeaders = {
            ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API
        };

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            { headers: apiHeaders, responseType: 'arraybuffer' }
        );

        const base64Image = Buffer.from(data, 'binary').toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        res.status(200).json({
            success: true,
            message: "Image generated",
            creditBalance: user.creditBalance,
            resultImage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
