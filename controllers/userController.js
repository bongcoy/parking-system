import bcrypt from "bcrypt";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import {Op} from "sequelize";

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
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async update(req, res) {
    try {
      let {username, email, password} = req.body;
      password = bcrypt.hashSync(password, 10);
      const user = await User.update(
        {username, email, password},
        {where: {id: req.params.id}},
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async delete(req, res) {
    try {
      const user = await User.destroy({where: {id: req.params.id}});
      res.status(204).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({
        where: {[Op.or]: [{username}, {email: username}]},
      });
      if (!user) {
        return res.status(400).json({error: "User not found"});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({error: "Invalid password"});
      }
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
  static async me(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
}
