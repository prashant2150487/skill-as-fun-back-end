import Business from "../models/business.js";

export const registerForBusiness= async (req, res) => {
  try {
    const { firstName, lastName, email, organization, message } = req.body;
    if (!firstName || !lastName || !email || !organization || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if a business with the same email already exists (optional)
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(409).json({
        message: "Business with this email already exists",
      });
    }

    const business = new Business({
      firstName,
      lastName,
      email,
      organization,
      message,
    });

    await business.save();

    return res.status(201).json({
      message: "Business info saved successfully",
      data: business,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
