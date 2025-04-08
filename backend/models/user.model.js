import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default:
      "https://tr.rbxcdn.com/180DAY-b609738f017db1c440b67ce7ef888406/420/420/Hat/Webp/noFilter",
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
