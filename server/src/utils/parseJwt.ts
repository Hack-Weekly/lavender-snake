import * as jwt from 'jsonwebtoken'

export function parseJwt(token: string) {
  return jwt.verify(token, 'lavender_snake_secret_key')
}
