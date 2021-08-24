module.exports = (mongoose) => {
  const Information = mongoose.model(
    "information",
    mongoose.Schema(
      {
        id: String,
        name: String,
        nationalId: String,
        phoneNumber: String,
        workPlace: String,
        username: String,
        email: String,
        password: String,
        role: String,
      },
      { timestamps: true }
    )
  );

  return Information;
};
