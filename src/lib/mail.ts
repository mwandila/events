import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

export async function sendVerificationEmail(
  email: string,
  token: string,
) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  })
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
) {

  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  })
}

export async function sendTwoFactorTokenEmail(
  email: string,
  token: string,
) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA Code: ${token}</p>`
  })
}




export async function sendTicketEmail(user: { email?: string }, ticket: { type: string; price: number }): Promise<{ success: boolean; message?: string }> {
  const emailSubject = 'Your ticket purchase';
  const emailBody = `
  <p>Thank you for purchasing a ${ticket.type} ticket for our event. The price paid was $${ticket.price}.</p>
  <p>We look forward to seeing you at the event!</p>
  <p>If you need to manage your ticket, you can do so at <a href="${domain}/tickets">our tickets page</a>.</p>
`;


  if (user.email) {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: emailSubject,
        html: emailBody,
      });
      return { success: true, message: 'Ticket email sent successfully' };
    } catch (error) {
      console.error('Error sending ticket email:', error);
      return { success: false, message: 'Error sending ticket email' };
    }
  } else {
    console.error('User email not found, unable to send ticket email');
    return { success: false, message: 'User email not found, unable to send ticket email' };
  }
}

