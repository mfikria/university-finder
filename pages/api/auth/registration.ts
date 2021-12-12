import pick from 'lodash/pick'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as models from '../../../db/models'
import request from 'request'
import cookie from 'cookie'

const handler = nextConnect()

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req
    const { email, password } = body

    try {
      await models.User.create({
        email,
        password,
      })

      const cookies = cookie.parse(req.headers.cookie || '')

      return request
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback/credentials`, {
          form: {
            email,
            password,
            csrfToken: cookies['next-auth.csrf-token'],
            callbackUrl: '/',
            json: true,
          },
        })
        .pipe(res)
    } catch (err: any) {
      console.log(err)
      return res.status(422).json({
        status: 'error',
        errors: err.errors?.map((v: any) =>
          pick(v, ['message', 'type', 'path'])
        ),
      })
    }
  }
)
