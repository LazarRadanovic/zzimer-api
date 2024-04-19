import dbConnection from "../common/db-connection";
const getAllEstates = async () => {
  try {
    const data = await dbConnection.dbConnection.query(`SELECT e.*
    FROM (
        SELECT *, 
        (SELECT COUNT(*) FROM user_likes ul WHERE ul.idEstate = e.id) AS broj_pojavljivanja
        FROM Estates e
    ) AS e
    ORDER BY broj_pojavljivanja DESC, e.id ASC;`);
    return data;
  } catch (e) {
    return null;
  }
};

const getEstateById = async (id: number) => {
  try {
    const data = await dbConnection.dbConnection.query(
      `SELECT * FROM estates WHERE id=?`,
      [id]
    );

    return data;
  } catch (e) {
    return null;
  }
};

const getEstateByLocation = async (town: string) => {
  try {
    const data = await dbConnection.dbConnection.query(
      `SELECT e.*
      FROM (
          SELECT *, 
          (SELECT COUNT(*) FROM user_likes ul WHERE ul.idEstate = e.id) AS broj_pojavljivanja
          FROM Estates e
      ) AS e
      WHERE e.grad = ?
      ORDER BY broj_pojavljivanja DESC, e.id ASC;`,
      [town]
    );
    return data;
  } catch (e) {
    return e;
  }
};

const getAllTowns = async () => {
  try {
    const townsData = await dbConnection.dbConnection.query(
      "SELECT DISTINCT grad FROM estates"
    );
    return townsData;
  } catch (e) {
    return e;
  }
};

const deleteEstate = async (id: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `DELETE FROM estates WHERE id=?`,
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

const countLikesByEstateId = async (idEstate: number) => {
  try {
    let broj_lajkova = 0;
    const data = await dbConnection.dbConnection.query(
      `
    SELECT COUNT(*) AS broj_lajkova
    FROM user_likes
    WHERE idEstate = ?;`,
      [idEstate]
    );
    console.log(data);

    if (data) {
      broj_lajkova = data[0].broj_lajkova;
      return broj_lajkova;
    } else {
      return broj_lajkova;
    }
  } catch (e: any) {
    return { msg: e.msg };
  }
};

export default {
  getAllEstates,
  getEstateById,
  getEstateByLocation,
  getAllTowns,
  deleteEstate,
  countLikesByEstateId,
};
