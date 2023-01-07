import express, { Router } from "express";
import uniqid from "uniqid"
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const authorsFilePath = path.join(__dirname, "authors.json"); 

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
router.post("/", async (req, res, next) => {
  try {
    const {name, surname, email, dateOfBirth} = req.body;

    const author = {
      name,
      surname,
      email,
      dateOfBirth,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uniqid()
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);

    fileAsJSONArray.push(author);

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray)); 
    res.send(author);

    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
router.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
router.delete("/", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
export default router;
