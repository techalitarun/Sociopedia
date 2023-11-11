import Post from "../models/Post.js";
import User from "../models/User.js";
/* CREATE */

export const createPost = async (req, res) => {
  try {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(req.body);
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    //So, this code is likely fetching data from a database (possibly all records from the "Post" collection) and assigning the result to the post variable.
    res.status(201).json(posts);
    //201:created something
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
    //200:successfull request
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    //When you write { userId }, it is equivalent to { userId: userId }
    res.status(200).json(posts);
    //200:successfull request
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    //userId is the key to look up in the likes collection to determine if a user has liked the post.
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
      /*{ new: true }: This is an option that tells Mongoose (if you're using it) to return the updated document after the update operation. If { new: true } is set, updatedPost will contain the post document with the updated information. whether you include { new: true } or not depends on your specific use case and whether you need to work with the updated document immediately or if you're more interested in the state of the document before the update. */
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
