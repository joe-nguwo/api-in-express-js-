
import { Customers } from "../models/customers.js";

const deleteUsers =  async (req, res) => {
  const id = req.query.id;
  try {
    const userid = Customers.findByPk(id);
    res.status(200).json({ users: userid });
  } catch (error) {
    res.status(500).json({ message: "user not found" });
  }
}

export default deleteUsers