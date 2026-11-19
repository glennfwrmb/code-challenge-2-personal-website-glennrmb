
import type { VercelRequest, VercelResponse } from '@vercel/node';

type VerificationRecord = {
  objectId: string;
  name: string;
  email: string;
  brief: string;
  token: string;
  expiresAt: string | number;
  verified: boolean;
  verifiedAt?: string;
  messageSaved?: boolean;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const token =
    typeof req.query.token === 'string' ? req.query.token : '';

  const appId = process.env.BACKENDLESS_APP_ID;
  const restKey = process.env.BACKENDLESS_REST_KEY;

  if (!/^[a-f0-9]{64}$/.test(token) || !appId || !restKey) {
    return res.status(400).send('Invalid verification link.');
  }

  const baseUrl =
    `https://api.backendless.com/${appId}/${restKey}/data`;

  try {
    const searchResponse = await fetch(
      `${baseUrl}/contact-verifications?where=${encodeURIComponent(
        `token='${token}'`,
      )}&pageSize=2`,
    );

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();

      console.error('Backendless lookup failed:', {
        status: searchResponse.status,
        response: errorBody,
      });

      return res.status(502).send(
        'Could not verify your email right now.',
      );
    }

    const records =
      (await searchResponse.json()) as VerificationRecord[];

    const matches = records.filter(
      (record) => record.token === token,
    );

    if (matches.length !== 1) {
      return res.status(400).send('Invalid verification link.');
    }

    const record = matches[0];

    if (
      !record.objectId ||
      !record.name ||
      !record.email ||
      !record.brief
    ) {
      return res.status(400).send(
        'Verification data is incomplete.',
      );
    }

    // Baca waktu kedaluwarsa dari Backendless.
    const rawExpiry = record.expiresAt;
    let expiry = Number.NaN;

    if (typeof rawExpiry === 'number') {
      expiry =
        rawExpiry < 1_000_000_000_000
          ? rawExpiry * 1000
          : rawExpiry;
    } else if (typeof rawExpiry === 'string') {
      const value = rawExpiry.trim();

      if (/^\d+$/.test(value)) {
        const numericValue = Number(value);

        expiry =
          numericValue < 1_000_000_000_000
            ? numericValue * 1000
            : numericValue;
      } else {
        expiry = Date.parse(value);
      }
    }

    const now = Date.now();

    console.log('Verification expiry debug:', {
      expiryType: typeof rawExpiry,
      expiresAtFromBackendless: rawExpiry,
      parsedExpiryISO: Number.isFinite(expiry)
        ? new Date(expiry).toISOString()
        : 'Invalid date',
      serverNowISO: new Date(now).toISOString(),
      expired: !Number.isFinite(expiry) || expiry <= now,
    });

    if (!Number.isFinite(expiry) || expiry <= now) {
      return res.status(410).send(
        'This verification link has expired.',
      );
    }

    // Cegah pengiriman ulang untuk pesan yang sudah tercatat tersimpan.
    if (record.messageSaved === true) {
      return res.status(200).send(
        'Email verified and message already saved.',
      );
    }

    // Tandai email terverifikasi.
    if (!record.verified) {
      const verifyResponse = await fetch(
        `${baseUrl}/contact-verifications/${encodeURIComponent(
          record.objectId,
        )}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            verified: true,
            verifiedAt: new Date().toISOString(),
          }),
        },
      );

      if (!verifyResponse.ok) {
        const errorBody = await verifyResponse.text();

        console.error('Verification update failed:', {
          status: verifyResponse.status,
          response: errorBody,
        });

        return res.status(502).send(
          'Could not update verification status.',
        );
      }
    }

    // Simpan pesan yang sudah diverifikasi ke contact-me.
    const saveResponse = await fetch(`${baseUrl}/contact-me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: record.name,
        email: record.email,
        brief: record.brief,
      }),
    });

    if (!saveResponse.ok) {
      const errorBody = await saveResponse.text();

      console.error('Contact save failed:', {
        status: saveResponse.status,
        response: errorBody,
      });

      return res.status(502).send(
        'Email verified, but the message could not be saved.',
      );
    }

    // Tandai pesan tersimpan setelah Backendless berhasil menyimpannya.
    const markResponse = await fetch(
      `${baseUrl}/contact-verifications/${encodeURIComponent(
        record.objectId,
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageSaved: true }),
      },
    );

    if (!markResponse.ok) {
      const errorBody = await markResponse.text();

      console.error('Message status update failed:', {
        status: markResponse.status,
        response: errorBody,
      });

      return res.status(502).send(
        'Message was saved, but its status could not be updated.',
      );
    }

    return res.status(200).send(
      'Email verified successfully. Your message has been sent.',
    );
  } catch (error) {
    console.error('Verification error:', error);

    return res.status(500).send(
      'An unexpected error occurred.',
    );
  }
}
