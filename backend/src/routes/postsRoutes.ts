import express from "express";
import passport from "../config/passport.js";
import { postValidator } from "../validations/postsValidations.js";

import {
    deleteUserPost,
  getPosts,
  like,
  newPost,
  repost,
  translatePost,
  getFollowingPostsController,
} from "../controllers/postsController.js";
import { uploadMedia } from "../middlewares/uploadMedia.js";
import { validatePostMedia } from "../validations/mediaUploadValidation.js";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import { createPostLimiter } from "../middlewares/rateLimit.js";
export const postsRouter = express.Router();

postsRouter.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  createPostLimiter,
  uploadMedia("media"),
  validatePostMedia,
  postValidator,
  newPost,
);

postsRouter.put(
  "/delete/:post_id",
  passport.authenticate("jwt", { session: false }),
  deleteUserPost,
);

postsRouter.get("/post", optionalAuth, getPosts);

postsRouter.get("/post/:post_id", optionalAuth, getPosts);

postsRouter.get(
  "/posts-user-follows",
  passport.authenticate("jwt", { session: false }),
  getFollowingPostsController,
);

postsRouter.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  like,
);

postsRouter.post(
  "/repost/:post_id",
  passport.authenticate("jwt", { session: false }),
  repost,
);

postsRouter.post("/post/:post_id/translate", translatePost);
