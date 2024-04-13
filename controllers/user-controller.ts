import { Request, Response } from "express";
import userService from "../services/user-service";

const registerUser = async (req: Request, res: Response) => {
  res.send(await userService.registerUser(req.body));
};

const loginUser = async (req: Request, res: Response) => {
  res.send(await userService.loginUser(req.body));
};

const userLikes = async (req: Request, res: Response) => {
  res.send(await userService.userLikes(parseInt(req.params["id"])));
};
const userLikedEstate = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.body.userId);
  const estateId: number = parseInt(req.body.estateId);
  res.send(await userService.userLikedEstate(userId, estateId));
};
const getUserById = async (req: Request, res: Response) => {
  res.send(await userService.getUserById(parseInt(req.params["id"])));
};

const checkLoggedUserLike = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.query.userId as string);
  const estateId: number = parseInt(req.query.estateId as string);
  res.send(await userService.checkLoggedUserLike(userId, estateId));
};
const dislikeEstate = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.query.userId as string);
  const estateId: number = parseInt(req.query.estateId as string);
  res.send(await userService.dislikeEstate(userId, estateId));
};

const sendFriendRequest = async (req: Request, res: Response) => {
  res.send(await userService.sendFriendRequest(req.body));
};

const getStatusOfFriendship = async (req: Request, res: Response) => {
  const senderId: number = parseInt(req.query.senderId as string);
  const receiverId: number = parseInt(req.query.receiverId as string);
  res.send(await userService.getStatusOfFriendship(senderId, receiverId));
};
const getFriendRequsts = async (req: Request, res: Response) => {
  const idSender: number = parseInt(req.query.idReciever as string);
  res.send(await userService.getFriendRequsts(idSender));
};

const acceptFriendRequest = async (req: Request, res: Response) => {
  const idTable: number = parseInt(req.body.idTable as string);
  res.send(await userService.acceptFriendRequest(idTable));
};

const deleteFriend = async (req: Request, res: Response) => {
  const friendId: number = parseInt(req.body.friendId);
  const loggedUserId: number = parseInt(req.body.loggedUserId);
  res.send(await userService.deleteFriend(friendId, loggedUserId));
};

const loggedUserFriends = async (req: Request, res: Response) => {
  const loggedUserId = parseInt(req.query.loggedUserId as string);
  res.send(await userService.loggedUserFriends(loggedUserId));
};

const roomateRequest = async (req: Request, res: Response) => {
  res.send(await userService.roomateRequest(req.body));
};
const currentRoomate = async (req: Request, res: Response) => {
  res.send(await userService.currentRoomate(req.body.loggedUserId));
};
const getRoommateRequests = async (req: Request, res: Response) => {
  const loggedUserID: number = parseInt(req.query.loggedUserID as string);
  res.send(await userService.getRoommateRequests(loggedUserID));
};

const acceptRoommateRequest = async (req: Request, res: Response) => {
  const idTable: number = parseInt(req.body.idTable as string);
  res.send(await userService.acceptRoommateRequest(idTable));
};

const declineRoommateRequest = async (req: Request, res: Response) => {
  const idTable: number = parseInt(req.body.idTable as string);
  res.send(await userService.declineRoommateRequest(idTable));
};

const changePassword = async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const id = parseInt(req.body.id);
  res.send(await userService.changePassword(newPassword, id));
};

const editUser = async (req: Request, res: Response) => {
  res.send(await userService.editUser(req.body));
};

const getAllUsers = async (req: Request, res: Response) => {
  const adminId = parseInt(req.query.id as string);
  res.send(await userService.getAllUsers(adminId));
};

const deleteUser = async (req: Request, res: Response) => {
  res.send(await userService.deleteUser(parseInt(req.params["id"])));
};

export default {
  registerUser,
  loginUser,
  userLikes,
  userLikedEstate,
  getUserById,
  checkLoggedUserLike,
  dislikeEstate,
  sendFriendRequest,
  getStatusOfFriendship,
  getFriendRequsts,
  acceptFriendRequest,
  deleteFriend,
  loggedUserFriends,
  roomateRequest,
  currentRoomate,
  getRoommateRequests,
  acceptRoommateRequest,
  declineRoommateRequest,
  changePassword,
  editUser,
  getAllUsers,
  deleteUser,
};
