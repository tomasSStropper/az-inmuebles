export async function SendEmail({ to, subject, body }) {
  // Mock: simula envío y mantiene UX. En producción puedes reemplazarlo por EmailJS/Resend/Nodemailer.
  console.log("[SendEmail MOCK]", { to, subject, body });
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}
