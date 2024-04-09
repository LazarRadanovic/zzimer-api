import userRepository from "../repositories/user-repository";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Any } from "typeorm";
import { FriendshipCreate } from "../model/Friendship-create-model";
import { UsersFriends } from "../model/Friends-List";
import { RoomateRequest } from "../model/Roommate-request";
import { EditUser } from "../model/Edit-user";

const registerUser = async (user: any) => {
  user.password = crypto.createHash("md5").update(user.password).digest("hex");
  const result = await userRepository.registerUser(user);
  if (result.affectedRows > 0) {
    //user je kreiran, kreiraj token za njega i posalji ga u odgovoru
    const token = jwt.sign(
      {
        id: user.id,
        ime: user.ime,
        prezime: user.prezime,
        gmail: user.gmail,
        lokacija_cimera: user.lokacija_cimera,
        isAdmin: user.role_id == 1 ? true : false,
      },
      "SECRET"
    );
    return { success: true, token };
  } else {
    //znaci da nije kreiran
    return { success: false, result };
  }
};

const loginUser = async (user: any) => {
  user.password = crypto.createHash("md5").update(user.password).digest("hex");
  const result = await userRepository.loginUser(user);
  if (result && result.length > 0) {
    //ovo znaci da je ulogovan
    const userData = result[0];
    const token = jwt.sign(
      {
        id: userData.id,
        ime: userData.ime,
        prezime: userData.prezime,
        gmail: userData.gmail,
        lokacija_cimera: userData.lokacija_cimera,
        isAdmin: userData.role_id == 1 ? true : false,
      },
      "SECRET"
    );
    return { success: true, token };
  } else {
    return { success: false, msg: "Not able to login" };
  }
};
const changePassword = async (newPassword: string, id: number) => {
  newPassword = crypto.createHash("md5").update(newPassword).digest("hex");
  const result = await userRepository.changePassword(newPassword, id);
  return result;
};
const userLikes = async (idEstate: number) => {
  const data = await userRepository.userLikes(idEstate);

  // Mapiranje podataka na željeni oblik
  const formattedData = data.map((row: any) => {
    return {
      id: row.id,
      ime: row.ime,
      prezime: row.prezime,
      gmail: row.gmail,
    };
  });
  // console.log(formattedData);

  return formattedData;
};

const userLikedEstate = async (userId: number, estateId: number) => {
  const data = await userRepository.userLikedEstate(userId, estateId);
  return { success: true };
};
const getUserById = async (userId: number) => {
  const data = await userRepository.getUserById(userId);
  const formattedData = data.map((row: any) => {
    return {
      ime: row.ime,
      prezime: row.prezime,
      gmail: row.gmail,
      lokacija: row.lokacija_cimera,
    };
  });
  console.log(formattedData[0]);

  return formattedData[0];
};

const checkLoggedUserLike = async (userId: number, estateId: number) => {
  const data = await userRepository.checkLoggedUserLike(userId, estateId);

  return !!data.liked;
};
const dislikeEstate = async (userId: number, estateId: number) => {
  const data = await userRepository.dislikeEstate(userId, estateId);

  return !!data.success;
};

const sendFriendRequest = async (friendRequest: FriendshipCreate) => {
  const data = await userRepository.sendFriendRequest(friendRequest);
  return !!data.success;
};

const getStatusOfFriendship = async (senderId: number, receiverId: number) => {
  const data = await userRepository.getStatusOfFriendship(senderId, receiverId);
  return data;
};

const getFriendRequsts = async (idReciever: number) => {
  const data = await userRepository.getFriendRequsts(idReciever);
  return data;
};

const acceptFriendRequest = async (idTable: number) => {
  const data = await userRepository.acceptFriendRequest(idTable);
  return data;
};

const deleteFriend = async (friendId: number, loggedUserId: number) => {
  const data = await userRepository.deleteFriend(friendId, loggedUserId);
  return data;
};

const loggedUserFriends = async (loggedUserId: number) => {
  const data = await userRepository.loggedUserFriends(loggedUserId);

  return data;
};

const roomateRequest = async (roomateRequest: RoomateRequest) => {
  const data = await userRepository.roomateRequest(roomateRequest);
  return !!data.success;
};

const currentRoomate = async (loggedUserId: number) => {
  const data = await userRepository.currentRoomate(loggedUserId);
  return data;
};

const getRoommateRequests = async (loggedUserId: number) => {
  const data = await userRepository.getRoommateRequests(loggedUserId);
  return data;
};

const acceptRoommateRequest = async (idTable: number) => {
  const data = await userRepository.acceptRoommateRequest(idTable);

  return data;
};

const declineRoommateRequest = async (idTable: number) => {
  const data = await userRepository.declineRoommateRequest(idTable);
  return data;
};
const editUser = async (user: EditUser) => {
  const data = await userRepository.editUser(user);
  return data;
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
};
