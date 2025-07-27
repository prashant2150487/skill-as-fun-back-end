import Business from "../models/business.js";
import Demo from "../models/demo.js";

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
      // data: business,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const registerForDemo = async (req, res) => {
  try {
    const { childName, guardianName, whatsAppNumber, email } = req.body;
    if (!childName || !guardianName || !whatsAppNumber || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if a demo registration with the same email already exists (optional)
    const existingDemo = await Demo.findOne({ email });
    if (existingDemo) {
      return res.status(409).json({
        message: "Demo registration with this email already exists",
      });
    }

    const demo = new Demo({
      childName,
      guardianName,
      whatsAppNumber,
      email,
    });

    await demo.save();

    return res.status(201).json({
      message: "Demo registration successful",
      data: demo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
