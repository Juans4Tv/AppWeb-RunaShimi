require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const translateRoutes = require("./routes/translate.routes");
const authRoutes = require("./routes/auth.routes");
const historyRoutes = require("./routes/history.routes");
const dictionaryRoutes = require("./routes/dictionary.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/api/translate", translateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dictionary", dictionaryRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend RunaShimi funcionando 🚀");
});

const startServer = async () => {
  await connectDB();
  
  try {
    // Admin original
    const adminExists = await User.findOne({ email: "admin@runashimi.com" });
    if (!adminExists) {
      const hashed = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        email: "admin@runashimi.com",
        password: hashed,
        role: "admin"
      });
      console.log("Admin creado: admin@runashimi.com / admin123");
    }

    // Usuario cliente (user)
    const userExists = await User.findOne({ email: "user@runashimi.com" });
    if (!userExists) {
      const hashed = await bcrypt.hash("1234", 10);
      await User.create({
        username: "user",
        email: "user@runashimi.com",
        password: hashed,
        role: "cliente"
      });
      console.log("Usuario creado: user@runashimi.com / 1234");
    }
  } catch (err) {
    console.log("Usuarios ya existen:", err.message);
  }

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
};

startServer();