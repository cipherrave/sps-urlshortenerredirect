import jwt from "jsonwebtoken";
import pool from "../database/connection.mjs";
import bcrypt, { genSalt } from "bcrypt";

import { decrypt, encrypt } from "./encryption.mjs";

export async function register(req, res) {
  try {
    const reqBody = req.body;

    if (!reqBody.email || !reqBody.username || !reqBody.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // create hash of password
    // 10 means 2 power of 10 rounds of hashing
    // 2^10 = 1024 rounds of hashing 150ms
    // 2^11 = 2048 rounds of hashing 300ms
    // 2^12 = 4096 rounds of hashing, quadruples the time taken to hash 10 times 600ms
    // the best practice is to use 10 rounds of hashing
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt
    const salt = genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);

    // encrypt enamil using node.js core module crypto
    const encryptedUsername = encrypt(reqBody.username);
    const encryptedEmail = encrypt(reqBody.email);

    // create new user in database
    const query =
      ' INSERT INTO "Users" (username, email, "password") VALUES($1, $2, $3)';

    const values = [encryptedUsername, encryptedEmail, hashedPassword];
    await pool.query(query, values);
    const apiResponse = { message: "User created successfully" };

    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function login(req, res) {
  try {
    const reqBody = req.body;
    const encryptedEmail = encrypt(reqBody.email);

    // check if email exist in database
    const query = 'SELECT * FROM "Users" WHERE email=$1';
    const response = await pool.query(query, values);

    // if email not found, return 404
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      response.rows[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // decrypt username and email
    const decryptedUsername = decrypt(response.rows[0].username);
    const decrptedEmail = decrypt(response.rows[0].username);

    //  if password matches, create token using jsonwebtoken
    const userData = {
      id: response.rows[0].id,
      username: decryptedUsername,
      email: decrptedEmail,
    };
    const token = jwt.sign(userData, "");

    // if password matches, return user object
    const apiResponse = {
      message: "Login successful",
      user: {
        id: response.rows[0].id,
        username: decryptedUsername,
        email: decrptedEmail,
      },
      token: token,
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json(error);
  }
}

// list all users
// secured routes
// route : GET /users

// get user by id
// secured routes
// route : GET /users/:id

// update user by id
// secured routes and only the user can update their own data
// route : PUT /users/:id

// delete user by id
// secured routes and only the user can delete their own data
// route : DELETE /users/:id
