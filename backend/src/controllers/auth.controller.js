// src/controllers/auth.controller.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashed,
      role: 'cliente'
    });

    // Enviar correo de bienvenida
    try {
      const emailData = emailService.welcomeEmail(username, email);
      await emailService.sendEmail(email, emailData.subject, emailData.html);
    } catch (emailErr) {
      console.error("Error enviando email:", emailErr);
    }

    res.json({ 
      success: true,
      message: "Usuario registrado exitosamente",
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "SECRET", {
      expiresIn: "7d"
    });

    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email requerido" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado con ese email" });
    }

    // Generar contraseña temporal
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(tempPassword, 10);

    user.password = hashed;
    await user.save();

    // Enviar correo con la contraseña
    try {
      const emailData = emailService.recoveryEmail(user.username, email, tempPassword);
      await emailService.sendEmail(email, emailData.subject, emailData.html);
      res.json({ 
        success: true,
        message: "Se ha enviado la contraseña a tu correo"
      });
    } catch (emailErr) {
      console.error("Error-enviando email:", emailErr);
      // Devolver la contraseña directamente (para desarrollo)
      res.json({ 
        success: true,
        message: "Error al enviar email, aquí tu contraseña temporal",
        temporalPassword: tempPassword
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al recuperar contraseña" });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashed,
      role: 'admin'
    });

    res.json({ 
      success: true,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear admin" });
  }
};