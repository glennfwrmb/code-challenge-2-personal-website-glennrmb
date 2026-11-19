
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const appId = process.env.BACKENDLESS_APP_ID;
  const restKey = process.env.BACKENDLESS_REST_KEY;

  if (!appId || !restKey) {
    return res.status(500).json({
      message: 'Backendless configuration is incomplete.',
    });
  }

  const baseUrl =
    `https://api.backendless.com/${appId}/${restKey}/data`;

  try {
    const where = encodeURIComponent(
      `verified = false AND expiresAt < '${new Date().toISOString()}'`
    );

    const response = await fetch(
      `${baseUrl}/contact-verifications?where=${where}&pageSize=100`,
      { method: 'GET' }
    );

    if (!response.ok) {
      console.error('Cleanup lookup failed:', response.status);
      return res.status(502).json({
        message: 'Could not retrieve expired records.',
      });
    }

    const records = (await response.json()) as Array<{
      objectId: string;
      verified: boolean;
      expiresAt: string;
    }>;

    let deleted = 0;

    for (const record of records) {
      if (
        !record.objectId ||
        record.verified !== false ||
        !record.expiresAt ||
        Date.parse(record.expiresAt) >= Date.now()
      ) {
        continue;
      }

      const deleteResponse = await fetch(
        `${baseUrl}/contact-verifications/${encodeURIComponent(record.objectId)}`,
        { method: 'DELETE' }
      );

      if (deleteResponse.ok) {
        deleted++;
      } else {
        console.error(
          'Could not delete expired verification:',
          deleteResponse.status
        );
      }
    }

    return res.status(200).json({
      message: 'Expired verification cleanup completed.',
      deleted,
      checked: records.length,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return res.status(500).json({
      message: 'Cleanup failed.',
    });
  }
}
