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
        role: String,
        username: String,
        email: String,
        password: String,
      },
      { timestamps: true }
    )
  );

  return Information;
};
