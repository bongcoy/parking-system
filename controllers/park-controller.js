import Park from "../models/park.js";
import User from "../models/users.js";

export default class ParkController {
  static async order(req, res) {
    try {
      let {plate_number, duration} = req.body;
      const user_id = req.user.id;
      // Calculate total parking fee based on duration (3,000 IDR per hour)
      const total_fee = duration * 3000;
      console.log(total_fee, user_id, plate_number, duration);
      const park = await Park.create({
        plate_number,
        duration,
        total_fee,
        user_id,
      });
      res.status(201).json(park);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }

  static async getAllOrder(req, res) {
    try {
      const park = await Park.findAll({
        where: {user_id: req.user.id},
        include: [User],
      });
      res.status(200).json(park);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
}
