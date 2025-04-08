import User from "../models/user.model.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Please provide all the required fields");
  }
  const user = await User.find({ email });
  if (user.length) {
    return res.status(409).send("User already exists");
  }
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
  return res.status(201).send("User created successfully");
};

export { signup };
