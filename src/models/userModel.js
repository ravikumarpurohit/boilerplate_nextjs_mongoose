const mongoose = require("mongoose");

const Gender = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

const RoleName = {
  ADMIN: "Admin",
  USER: "User",
};

const options = {
  collection: "users",
  versionKey: false,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  },
};

const address = new mongoose.Schema({
  address1: { type: String },
  address2: { type: String },
  address3: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postcode: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile: { type: Number },
    gender: {
      type: String,
      enum: Gender,
    },
    address: address,
    fcmToken: {
      type: String,
    },
    roleName: { type: String, enum: RoleName, default: RoleName.USER },

    isActive: {
      type: Boolean,
      default: true,
    },
    profileImage: { type: String },
  },
  options
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
module.exports = {
  userModel,
  RoleName,
};
