import pick from 'lodash/pick'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const bcrypt = require('bcryptjs')
import * as models from '../../../db/models'

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
    brandColor: '#04f',
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
  },
  providers: [
    // https://next-auth.js.org/configuration/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Input email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const user: any = await models.User.findOne({
            where: {
              email: credentials.email,
            },
          })
          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          )
          if (valid) {
            return pick(user, ['id', 'email']) as any
          }
        } catch (_err) {
          return null
        }
      },
    }),
  ],
}

export default NextAuth(authOptions)
