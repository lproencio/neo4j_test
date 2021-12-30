const User = require("../database/models/User");

module.exports = {
  async create(req, res) {
    try {
      const user_body = req.body.user;

      const find_email = await User.first({
        email: user_body.email,
      });

      if (find_email) {
        return res.status(401).json({ message: "email already exists." });
      }

      const find_cpf = await User.first({
        cpf: user_body.cpf,
      });

      if (find_cpf) {
        return res.status(401).json({ message: "cpf already exists." });
      }

      user_body.created_at = new Date();
      user_body.updated_at = new Date();

      const new_user = await User.create(user_body);

      const user = await new_user.toJson();

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      const errors = err.details.map((e) => {
        return e.message;
      });

      return res.status(404).json({ message: errors });
    }
  },

  async findAll(req, res) {
    try {
      const order_by = req.query.order || "name";
      const sort = req.query.sort || "ASC";
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const skip = (page - 1) * limit;

      const params = {};
      const order = { [order_by]: sort };

      const user_find = await User.all(params, order, limit, skip);

      const all = await User.all();
      const count = await all.toJson();
      const total_pages = await (count.length < limit
        ? 1
        : Math.ceil(count.length / limit));

      const users = await user_find.toJson();

      return res.status(200).json({ users, size: count.length, total_pages });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  async findById(req, res) {
    try {
      const user_byId = await User.findById(req.params.id);
      const user = await user_byId.toJson();

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const user_byId = await User.findById(req.params.id);

      if (!user_byId) {
        return res.status(404).json({ message: "user not found." });
      }

      req.body.user.updated_at = new Date();
      const updated_user = await user_byId.update(req.body.user);
      const user = await updated_user.toJson();

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const user_byId = await User.findById(req.params.id);

      if (!user_byId) {
        return res.status(404).json({ message: "user not found." });
      }

      const user_delete = await user_byId.delete();

      const user = await user_delete.toJson();

      return res.status(200).json({
        message: `user with id: ${user._id}, is deleted successfully.`,
      });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  //   method search: implementation in future. search better solution.

  //   async search_user(req, res) {
  //     try {
  //       const search = req.params.search;

  //       const builder = User.query();

  //       const option = ["name", "cpf"];

  //       const options_search = option.map((op) => {
  //         return `u.${op} =~ '(?i)${search}.*'`;
  //       });

  //       const result = await builder
  //         .match("u", "User")
  //         .where(options_search.join(" or "))
  //         .return("u")
  //         .execute();

  //       const users = await result.records.toJson();

  //       return res.status(200).json({ users });
  //     } catch (err) {
  //       return res.status(404).json({ message: err.message });
  //     }
  //   },
};
