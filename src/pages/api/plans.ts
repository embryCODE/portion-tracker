import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/container'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret })

  if (!token?.sub) {
    res.status(401).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const plans = await container.getAllPlansByUserId(token.sub)

      if (!plans.ok) {
        res.status(400).json(plans.error.message)
        return
      }

      res.json(plans.value)
      return
    }

    if (req.method === 'POST') {
      const plan = await container.createOrUpdatePlan(token.sub, req.body)

      if (!plan.ok) {
        res.status(400).json(plan.error.message)
        return
      }

      res.json(plan.value)
      return
    }

    if (req.method === 'DELETE') {
      const plans = await container.deletePlan(req.body.id)

      if (!plans.ok) {
        res.status(400).json(plans.error.message)
        return
      }

      res.status(204).end()
      return
    }

    res.status(405).end()
  } catch (e) {
    console.error(e)
    res.status(400).send('Unknown error')
    return
  }
}
