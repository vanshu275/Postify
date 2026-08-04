import User from "../models/User.js"



export const getProfile = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json(
            {
                success: true,
                data: user,
            }
        );
    } catch (error) {
        console.log("error in finding the profile", error);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server error"
            }
        )
    }
}

export const updateProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const { name, bio } = req.body;

        user.name = name || user.name;
        user.bio = bio || user.bio;

        await user.save();

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        console.log("Error in updating the profile", error);
        res.status(500).json(
            {
                success: false,
                message: "Internal server error"
            }
        )
    }


}

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query?.trim()) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const users = await User.find({
      username: {
        $regex: query,
        $options: "i",
      },
    })
      .select("name username profilePic")
      .limit(10);

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Search Users:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};