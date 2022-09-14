import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';

import { client } from '../../services/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    console.log({ userId, postId, like })

    await like ? client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          ref: userId,
        }
      ])
      .commit()
      .then(data => res.status(200).json(data))
      : await client
        .patch(postId)
        .unset([`likes[ref=="${userId}"]`])
        .commit()
        .then(data => res.status(200).json(data))
  }
}
