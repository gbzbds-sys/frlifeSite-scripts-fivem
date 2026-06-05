export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(200).json({
      ok: false,
      message: 'DISCORD_WEBHOOK_URL missing'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    const clean = (value, max = 500) => String(value || '').slice(0, max);

    const event = clean(body.event, 80);
    const page = clean(body.page, 300);
    const product = clean(body.product, 120);
    const action = clean(body.action, 120);
    const referrer = clean(body.referrer || 'direct', 300);
    const language = clean(body.language || 'unknown', 80);
    const timezone = clean(body.timezone || 'unknown', 80);
    const screen = clean(body.screen || 'unknown', 80);
    const userAgent = clean(body.userAgent || 'unknown', 900);
    const createdAt = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    const titles = {
      visit: '🌐 Nouvelle visite site',
      product_view: '📦 Produit consulté',
      buy_click: '🛒 Clique achat Tebex',
      discord_click: '💬 Clique Discord',
      video_click: '🎬 Clique vidéo preview'
    };

    const colorMap = {
      visit: 0x00eaff,
      product_view: 0x1578ff,
      buy_click: 0x31f4a8,
      discord_click: 0x5865f2,
      video_click: 0xffcc00
    };

    const fields = [
      { name: 'Événement', value: event || 'unknown', inline: true },
      { name: 'Heure', value: createdAt, inline: true }
    ];

    if (product) fields.push({ name: 'Produit', value: product, inline: true });
    if (action) fields.push({ name: 'Action', value: action, inline: true });

    fields.push(
      { name: 'Page', value: page || 'Non indiqué', inline: false },
      { name: 'Provenance', value: referrer || 'Direct', inline: false },
      { name: 'Langue', value: language || 'Inconnue', inline: true },
      { name: 'Fuseau', value: timezone || 'Inconnu', inline: true },
      { name: 'Écran', value: screen || 'Inconnu', inline: true },
      { name: 'Navigateur', value: userAgent || 'Inconnu', inline: false }
    );

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'FRLife Logs Site',
        avatar_url: 'https://frlifescriptsfivem.vercel.app/assets/logo.png',
        embeds: [
          {
            title: titles[event] || '📘 Log site FRLife',
            color: colorMap[event] || 0x00eaff,
            fields,
            footer: { text: 'FRLife Scripts • Logs site' }
          }
        ]
      })
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(200).json({ ok: false, message: 'Log failed' });
  }
}
