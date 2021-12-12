import pick from 'lodash/pick'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as models from '../../db/models'

const handler = nextConnect()

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req
    const { email } = body

    try {
      const subscription = await models.Subscription.create({
        email,
      })
      return res.status(200).json({
        status: 'success',
        data: subscription,
      })
    } catch (err: any) {
      return res.status(422).json({
        status: 'error',
        errors: err.errors?.map((v: any) =>
          pick(v, ['message', 'type', 'path'])
        ),
      })
    }
  }
)
