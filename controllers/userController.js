import bcrypt from "bcrypt";
import User from "../models/users.js";

export default class UserController {
  static async store(req, res) {
    try {
      let {username, email, password} = req.body;
      password = bcrypt.hashSync(password, 10);
      const user = await User.create({username, email, password});
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async detail(req, res) {
    try {
      const user = await this.userService.detail(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async update(req, res) {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async delete(req, res) {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
}
