import dbConnection from "../common/db-connection";
import { CurrentRoommate } from "../model/Current-roommate";
import { EditUser } from "../model/Edit-user";
import { FriendshipCreate } from "../model/Friendship-create-model";
import { RoomateRequest } from "../model/Roommate-request";

const registerUser = async (user: any) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `INSERT INTO users(id,ime,prezime,gmail,lokacija_cimera,password,role_id) VALUES(DEFAULT,?,?,?,?,?,2)`,
      [user.ime, user.prezime, user.gmail, user.lokacija_cimera, user.password]
    );
    return result;
  } catch (erorr) {
    return { success: false };
  }
};

const loginUser = async (user: any) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT * FROM users WHERE gmail = ? AND password = ?`,
      [user.gmail, user.password]
    );
    return result;
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

const changePassword = async (newPassword: string, id: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `UPDATE users SET password = ? WHERE id = ?;`,
      [newPassword, id]
    );
    if (result.affectedRows) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return { succes: false };
  }
};

const editUser = async (user: EditUser) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `UPDATE users SET ime = ?,prezime=?,lokacija_cimera=? WHERE id = ?;`,
      [user.ime, user.prezime, user.lokacija_cimera, user.id]
    );
    if (result.affectedRows) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return { succes: false };
  }
};

const userLikes = async (idEstate: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT users.*
    FROM users
    INNER JOIN user_likes ON users.id = user_likes.idKorisnika
    WHERE user_likes.idestate = ?;`,
      [idEstate]
    );
    return result;
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};
const userLikedEstate = async (estateId: number, userId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `INSERT INTO user_likes(idKorisnika,idEstate) VALUES(?,?)`,
      [userId, estateId]
    );
    return { success: true, result };
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

const getUserById = async (userId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT * FROM users WHERE id=?`,
      [userId]
    );
    return result;
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

const checkLoggedUserLike = async (userId: number, estateId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT * FROM user_likes WHERE idKorisnika = ? AND idEstate = ?`,
      [userId, estateId]
    );
    if (result.length > 0) {
      return { success: true, liked: true };
    } else {
      return { success: true, liked: false };
    }
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

const dislikeEstate = async (userId: number, estateId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `DELETE FROM user_likes WHERE idKorisnika = ? AND idEstate = ?`,
      [userId, estateId]
    );

    if (result.affectedRows > 0) {
      return { success: true };
    }
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

const sendFriendRequest = async (friendRequst: FriendshipCreate) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `INSERT INTO friendships(id, user1_id, user2_id, status, created_at, updated_at) VALUES(DEFAULT,?,?,?,NOW(),NOW())`,
      [friendRequst.senderId, friendRequst.receiverId, friendRequst.status]
    );

    if (result.affectedRows > 0) {
      return { success: true };
    }
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};

const getStatusOfFriendship = async (senderId: number, receiverId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT friendships.status FROM friendships WHERE user1_id = ? AND user2_id = ? OR user1_id = ? AND user2_id = ?`,
      [senderId, receiverId, receiverId, senderId]
    );

    if (result.length > 0) {
      return { status: result[0].status };
    } else {
      return { status: "notFriends" };
    }
  } catch (e: any) {
    return { error: e.message };
  }
};

const getFriendRequsts = async (idReciever: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT friendships.status, friendships.id AS idTable, users.ime, users.prezime,users.id
      FROM friendships
      INNER JOIN users ON user1_id = users.id
      WHERE user2_id = ? AND status = 'pending';
    `,
      [idReciever]
    );

    if (result && result.length > 0) {
      return result.map((row: any) => ({
        idTable: row.idTable,
        status: row.status,
        senderIme: row.ime,
        senderPrezime: row.prezime,
        userId: row.id,
      }));
    } else {
      return [];
    }
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

const roomateRequest = async (roomateRequest: RoomateRequest) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `
    INSERT INTO roommaterequests(RequestID,
      SenderID,
      idEstate,
      ReceiverID, 
      Message,
      Status,
      CreatedAt) VALUES(DEFAULT,?,?,?,'roomate request',?,NOW())`,
      [
        roomateRequest.senderId,
        roomateRequest.idEstate,
        roomateRequest.receiverId,
        roomateRequest.status,
      ]
    );
    if (result.affectedRows > 0) {
      return { success: true };
    }
  } catch (e: any) {
    return { success: false };
  }
};

const acceptFriendRequest = async (idTable: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `UPDATE friendships SET status =? WHERE id = ?`,
      ["accepted", idTable]
    );
    return { success: true };
  } catch (e: any) {
    return { success: false, msg: e };
  }
};

const deleteFriend = async (friendId: number, loggedUserId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `DELETE FROM friendships WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`,
      [friendId, loggedUserId, loggedUserId, friendId]
    );

    if (result.affectedRows > 0) {
      return { success: true };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
const loggedUserFriends = async (loggedUserId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `
    SELECT DISTINCT
    CASE
        WHEN f.user1_id = ? THEN u2.id
        ELSE u1.id
    END AS friendId,
    CASE
        WHEN f.user1_id = ? THEN u2.ime
        ELSE u1.ime
    END AS friendIme,
    CASE
        WHEN f.user1_id = ? THEN u2.prezime
        ELSE u1.prezime
    END AS friendPrezime
FROM 
    friendships f
    INNER JOIN users u1 ON f.user1_id = u1.id
    INNER JOIN users u2 ON f.user2_id = u2.id
WHERE 
    (f.user1_id = ? OR f.user2_id = ?) AND f.status = 'accepted';`,
      [loggedUserId, loggedUserId, loggedUserId, loggedUserId, loggedUserId]
    );
    const rows = JSON.parse(JSON.stringify(result));

    // Check if there are rows returned
    if (rows && rows.length > 0) {
      // Map the rows to extract friend information
      const friends = rows.map((row: any) => ({
        friendId: parseInt(row.friendId),
        friendIme: row.friendIme,
        friendPrezime: row.friendPrezime,
      }));

      return friends;
    } else {
      return [];
    }
  } catch (e: any) {
    return { succes: false, msg: e };
  }
};
const currentRoomate = async (loggedUserID: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `  SELECT
      r.RequestID,
      CASE
          WHEN r.SenderID = ? THEN u_receiver.ime
          ELSE u_sender.ime
      END AS imeRoommate,
      CASE
          WHEN r.SenderID = ? THEN u_receiver.prezime
          ELSE u_sender.prezime
      END AS prezimeRoommate,
      CASE
          WHEN r.SenderID = ? THEN u_receiver.gmail
          ELSE u_sender.gmail
      END AS gmail,
      CASE
          WHEN r.SenderID = ? THEN u_receiver.lokacija_cimera
          ELSE u_sender.lokacija_cimera
      END AS lokacija_cimera,
      e.grad AS estateTown,
      e.naziv AS title,
      e.description,
      e.img_no1,
      e.img_no2,
      r.Status
  FROM
      roommaterequests r
  INNER JOIN users u_sender ON r.SenderID = u_sender.id
  INNER JOIN users u_receiver ON r.ReceiverID = u_receiver.id
  INNER JOIN estates e ON r.idEstate = e.id
  WHERE
      (r.SenderID = ? OR r.ReceiverID = ?) AND r.Status = 'Accepted'; ;
  `,
      [
        loggedUserID,
        loggedUserID,
        loggedUserID,
        loggedUserID,
        loggedUserID,
        loggedUserID,
      ]
    );

    const rows = JSON.parse(JSON.stringify(result));

    if (rows && rows.length > 0) {
      return rows[0];
    }
  } catch (e) {
    return { success: false };
  }
};

const getRoommateRequests = async (loggedUserId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `
      SELECT
      r.RequestID,
      u_sender.ime AS imeSendera,
      u_sender.prezime AS prezimeSendera,
      r.Status,
      r.SenderID AS UserID
  FROM
      roommaterequests r
  INNER JOIN users u_sender ON r.SenderID = u_sender.id
  WHERE
      r.Status = 'Pending' AND
      r.ReceiverID = ?;
  
`,
      [loggedUserId]
    );
    if (result && result.length > 0) {
      return result.map((row: any) => ({
        idTable: row.RequestID,
        status: row.Status,
        senderIme: row.imeSendera,
        senderPrezime: row.prezimeSendera,
        userId: row.UserID,
      }));
    } else {
      return [];
    }
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

const acceptRoommateRequest = async (idTable: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `UPDATE roommaterequests SET status =? WHERE RequestID = ?`,
      ["Accepted", idTable]
    );

    return { success: true };
  } catch (e: any) {
    return { success: false, msg: e };
  }
};

const declineRoommateRequest = async (idTable: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `UPDATE roommaterequests SET status =? WHERE RequestID = ?`,
      ["Declined", idTable]
    );
    return { success: true };
  } catch (e: any) {
    return { success: false, msg: e };
  }
};
const getAllUsers = async (id: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `SELECT * FROM users WHERE id!=?`,
      [id]
    );
    if (result) {
      return result;
    }
  } catch (e) {
    return false;
  }
};

const deleteUser = async (id: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `DELETE FROM users WHERE id=?`,
      [id]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
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
