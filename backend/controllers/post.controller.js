const post = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send("Please provide all the required fields");
  }
  try {
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export { post };
