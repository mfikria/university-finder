import pick from 'lodash/pick'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as models from '../../db/models'
import { getSession } from 'next-auth/react'

const handler = nextConnect()

export default handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) {
      return res.status(401).json({
        status: 'error',
        errors: [
          {
            message: 'You cannot perform this action',
            type: 'unauthorized',
          },
        ],
      })
    }

    try {
      const user: any = await models.User.findOne({
        where: { email: session.user?.email },
        raw: true,
      })

      const favoriteUniversities = await models.FavoriteUniversity.findAll({
        where: { userId: user?.id },
        raw: true,
      })
      return res.status(200).json({
        status: 'success',
        data: favoriteUniversities.map((data: any) => ({
          ...data,
          university: JSON.parse(data.university),
        })),
      })
    } catch (err: any) {
      return res.status(422).json({
        status: 'error',
        errors: err.errors?.map((v: any) =>
          pick(v, ['message', 'type', 'path'])
        ),
      })
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) {
      return res.status(401).json({
        status: 'error',
        errors: [
          {
            message: 'You cannot perform this action',
            type: 'unauthorized',
          },
        ],
      })
    }

    const { body } = req
    const { university } = body

    try {
      const user: any = await models.User.findOne({
        where: { email: session.user?.email },
        raw: true,
      })

      const favoritePost = await models.FavoriteUniversity.create({
        university,
        userId: user.id,
      })
      return res.status(200).json({
        status: 'success',
        data: favoritePost,
      })
    } catch (err: any) {
      return res.status(422).json({
        status: 'error',
        errors: err.errors?.map((v: any) =>
          pick(v, ['message', 'type', 'path'])
        ),
      })
    }
  })
