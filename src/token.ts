import jwt from 'jsonwebtoken'

export function generateAccessToken(user:any) {
  // Replace 'your-secret-key' with your actual secret key
  const secret = process.env.JWT_SECRET || 'your-secret-key'
  const payload = { sub: user.id, email: user.email, name: user.name, role: user.role }
  
  // Generate a token with a specific expiration time
  const token = jwt.sign(payload, secret, { expiresIn: '1h' }) // Token valid for 1 hour

  return token
}
