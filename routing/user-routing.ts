import express from "express";
import userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth-middleware";

const routingUser = express.Router();

routingUser.route("/registration").post(userController.registerUser);

routingUser.route("/login").post(userController.loginUser);
routingUser.route("/user-likes/:id").get(userController.userLikes);
routingUser.route("/user-liked-estate/").post(userController.userLikedEstate);
routingUser.route("/user/:id").get(userController.getUserById);
// check-user-like
routingUser.route("/check-user-like/").get(userController.checkLoggedUserLike);
// /dislike-estate/
routingUser.route("/dislike-estate/").delete(userController.dislikeEstate);

routingUser
  .route("/friendship/send-request")
  .post(userController.sendFriendRequest);

routingUser.route("/roomate/send-request").post(userController.roomateRequest);

routingUser.route("/accept-request").post(userController.acceptFriendRequest);

routingUser
  .route("/decline-roommate-request")
  .post(userController.declineRoommateRequest);

routingUser
  .route("/accept-roommate-request")
  .post(userController.acceptRoommateRequest);

routingUser.route("/delete-friend").post(userController.deleteFriend);

routingUser.route("/friends").get(userController.loggedUserFriends);
routingUser.route("/current/roommate").post(userController.currentRoomate);

routingUser
  .route("/roommate-request-list")
  .get(userController.getRoommateRequests);

routingUser.route("/edit-user").post(userController.editUser);
routingUser
  .route("/friendship/status")
  .get(userController.getStatusOfFriendship);
routingUser.route("/get-friend-requests").get(userController.getFriendRequsts);
routingUser.route("/update-password").post(userController.changePassword);
routingUser.route("/users").get(userController.getAllUsers);
routingUser.route("/delete-user/:id").delete(userController.deleteUser);
export default {
  routingUser,
};
