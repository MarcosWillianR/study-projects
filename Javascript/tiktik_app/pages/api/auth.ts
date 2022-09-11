import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../services/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method)
  if (req.method === 'POST') {
    const user = req.body;
    client
      .createIfNotExists(user)
      .then(() => res.status(200).json('Login success'))
  }
}