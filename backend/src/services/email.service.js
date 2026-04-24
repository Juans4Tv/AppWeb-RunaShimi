// src/services/email.service.js
// Servicio de correo - por ahora muestra en consola
// future: configurar con nodemailer para producción

const sendEmail = async (to, subject, html) => {
  // Mostrar en consola para desarrollo
  console.log('========================================');
  console.log('📧 EMAIL ENVIADO');
  console.log('========================================');
  console.log(`Para: ${to}`);
  console.log(`Asunto: ${subject}`);
  console.log('----------------------------------------------');
  console.log(html.substring(0, 500) + '...');
  console.log('========================================');
  
  return { success: true, log: true };
};

// Plantilla de bienvenida
const welcomeEmail = (username, email) => {
  const subject = '¡Bienvenido a RunaShimi! 🌿';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #C4451C, #5D4037); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">🌿 RunaShimi</h1>
      </div>
      <div style="padding: 20px; background: #FFF4DC;">
        <h2 style="color: #5D4037;">¡Hola ${username}!</h2>
        <p style="color: #666;">Tu cuenta ha sido creada exitosamente en RunaShimi.</p>
        <p style="color: #666;">Ahora puedes empezar a traducir entre Español y Runa Shimi.</p>
        <div style="background: #F4E6D4; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 0; color: #5D4037;"><strong>Credenciales:</strong></p>
          <p style="margin: 5px 0; color: #333;">📧 Email: ${email}</p>
        </div>
      </div>
    </div>
  `;
  return { subject, html };
};

// Plantilla de recuperación de contraseña
const recoveryEmail = (username, email, password) => {
  const subject = '🔐 Recuperación de contraseña - RunaShimi';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #C4451C, #5D4037); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">🌿 RunaShimi</h1>
      </div>
      <div style="padding: 20px; background: #FFF4DC;">
        <h2 style="color: #5D4037;">¡Hola ${username}!</h2>
        <p style="color: #666;">Solicitaste recuperar tu contraseña.</p>
        <div style="background: #F4E6D4; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 0; color: #5D4037;"><strong>Tu contraseña:</strong></p>
          <p style="margin: 5px 0; font-size: 24px; color: #C4451C; font-weight: bold;">${password}</p>
        </div>
        <p style="color: #888; font-size: 12px;">Si no solicitaste esto, cambia tu contraseña inmediatamente.</p>
      </div>
    </div>
  `;
  return { subject, html };
};

module.exports = {
  sendEmail,
  welcomeEmail,
  recoveryEmail
};