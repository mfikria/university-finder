import pick from 'lodash/pick'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as models from '../../../db/models'

const handler = nextConnect()

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req
    const { email, password } = body

    try {
      const user: any = await models.User.create({
        email,
        password,
      })

      return res.status(200).json({
        status: 'success',
        data: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
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
