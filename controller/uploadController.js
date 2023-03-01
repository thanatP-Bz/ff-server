import cloudinary from "../utils/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;

    const updatedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });

    // TODO create db record
    // - url
    // - user
    // - filename
    // -
    console.log(updatedResponse);
    res.json({ msg: "image uploaded" });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};

export { uploadImage };
