import nodemailer from 'nodemailer'

const getTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const fromAddress = '"Mayank from Wealth Map" <no-reply-anomayank@gmail.com>'

export const sendVerificationEmail = async (email: string, code: string): Promise<void> => {
  const transporter = getTransporter()
  const mailOptions = {
    from: fromAddress,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  }

  await transporter.sendMail(mailOptions)
}

export const sendMagicLinkEmail = async (email: string, link: string): Promise<void> => {
  const transporter = getTransporter()
  const mailOptions = {
    from: fromAddress,
    to: email,
    subject: 'Your Magic Login Link for Wealth Map',
    text: `Click the following link to log into Wealth Map: ${link}`,
    html: `<p>Click the following link to log in: <a href="${link}">${link}</a></p>`,
  }

  await transporter.sendMail(mailOptions)
}

export const sendInvitationEmail = async (
  email: string,
  companyName: string,
  token: string
): Promise<void> => {
  const inviteLink = `${process.env.CLIENT_URL}/member-setup?token=${token}`
  const transporter = getTransporter()
  const mailOptions = {
    from: fromAddress,
    to: email,
    subject: `You're invited to join ${companyName}`,
    text: `You've been invited to join ${companyName}. Accept the invitation: ${inviteLink}`,
    html: `<p>You've been invited to join <strong>${companyName}</strong>. Click <a href="${inviteLink}">here</a> to accept the invitation.</p>`,
  }

  await transporter.sendMail(mailOptions)
}
