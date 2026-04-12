/**
 * Notifikationsmail til Træklatreskolen ved ny tilmelding
 */
export function bookingNotificationHtml({ name, email, phone, course, date, place, notes }) {
  const now = new Date().toLocaleString("da-DK", { timeZone: "Europe/Copenhagen" });
  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Ny tilmelding – ${course}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#f5f7f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;width:100%;background:white;border-radius:18px;
                      overflow:hidden;box-shadow:0 6px 32px rgba(0,0,0,0.09);">

          <!-- HEADER -->
          <tr>
            <td style="background:#1f3a2b;padding:28px 40px;">
              <div style="color:white;font-size:22px;font-weight:800;">Træklatreskolen</div>
              <div style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:4px;">Intern notifikation</div>
            </td>
          </tr>
          <tr>
            <td style="background:#d8782f;height:5px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px;">
              <h1 style="margin:0 0 6px;color:#1f3a2b;font-size:24px;font-weight:800;">
                Ny tilmelding modtaget!
              </h1>
              <p style="margin:0 0 28px;color:#4b6355;font-size:15px;">
                Modtaget: ${now}
              </p>

              <!-- Deltageroplysninger -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="background:#f5f7f6;border-radius:14px;border-left:5px solid #d8782f;
                            margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;
                                letter-spacing:1.5px;color:#d8782f;margin-bottom:14px;">
                      Deltageroplysninger
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#4b6355;font-size:14px;padding:5px 0;width:120px;">Navn</td>
                        <td style="color:#1f3a2b;font-size:14px;font-weight:700;padding:5px 0;">${name}</td>
                      </tr>
                      <tr>
                        <td style="color:#4b6355;font-size:14px;padding:5px 0;">E-mail</td>
                        <td style="padding:5px 0;">
                          <a href="mailto:${email}" style="color:#d8782f;font-weight:700;font-size:14px;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#4b6355;font-size:14px;padding:5px 0;">Telefon</td>
                        <td style="color:#1f3a2b;font-size:14px;font-weight:700;padding:5px 0;">${phone || "–"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Tilmelding -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="background:#f5f7f6;border-radius:14px;border-left:5px solid #1f3a2b;
                            margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;
                                letter-spacing:1.5px;color:#1f3a2b;margin-bottom:14px;">
                      Tilmeldt til
                    </div>
                    <div style="color:#1f3a2b;font-size:18px;font-weight:800;margin-bottom:10px;">
                      ${course}
                    </div>
                    ${date ? `<div style="color:#4b6355;font-size:14px;">📅 ${date}</div>` : ""}
                    ${place ? `<div style="color:#4b6355;font-size:14px;margin-top:4px;">📍 ${place}</div>` : ""}
                    ${notes ? `<div style="margin-top:12px;color:#4b6355;font-size:14px;"><strong style="color:#1f3a2b;">Bemærkninger:</strong> ${notes}</div>` : ""}
                  </td>
                </tr>
              </table>

              <!-- Påmindelse -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:#fff8e1;border-radius:12px;padding:20px 24px;
                             border-left:5px solid #f59e0b;">
                    <div style="font-weight:800;color:#92400e;font-size:15px;margin-bottom:6px;">
                      ⚡ Husk at sende faktura
                    </div>
                    <p style="margin:0;color:#78350f;font-size:14px;line-height:1.65;">
                      Send en faktura til <strong>${name}</strong> på
                      <a href="mailto:${email}" style="color:#d8782f;text-decoration:none;">${email}</a>
                      for at bekræfte pladsen på <strong>${course}</strong>.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1f3a2b;padding:22px 40px;">
              <p style="margin:0;color:rgba(255,255,255,0.45);font-size:12px;line-height:1.8;">
                Denne mail er automatisk genereret af traeklatreskolen.dk
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Bekræftelsesmail til deltager ved tilmelding
 */
export function bookingConfirmationHtml({ name, course, date, place }) {
  const datePlace = date || place
    ? `<div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap;">
        ${date  ? `<span style="display:inline-block;background:#e7f0e9;color:#1f3a2b;padding:5px 12px;border-radius:999px;font-size:13px;font-weight:600;">📅 ${date}</span>` : ""}
        ${place ? `<span style="display:inline-block;background:#e7f0e9;color:#1f3a2b;padding:5px 12px;border-radius:999px;font-size:13px;font-weight:600;">📍 ${place}</span>` : ""}
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Tilmelding modtaget – Træklatreskolen</title>
</head>
<body style="margin:0;padding:0;background:#f5f7f6;font-family:system-ui,-apple-system,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#f5f7f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;width:100%;background:white;border-radius:18px;
                      overflow:hidden;box-shadow:0 6px 32px rgba(0,0,0,0.09);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:#1f3a2b;padding:32px 40px;">
              <div style="color:white;font-size:24px;font-weight:800;letter-spacing:-0.3px;
                          line-height:1.2;">Træklatreskolen</div>
              <div style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:5px;
                          letter-spacing:0.5px;">Kurser · Naturdannelse · Oplevelser</div>
            </td>
          </tr>

          <!-- ── ORANGE ACCENT ── -->
          <tr>
            <td style="background:#d8782f;height:5px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <!-- Headline -->
              <h1 style="margin:0 0 6px;color:#1f3a2b;font-size:28px;font-weight:800;
                         line-height:1.2;">Din tilmelding er modtaget!</h1>
              <p style="margin:0 0 28px;color:#4b6355;font-size:16px;line-height:1.7;">
                Hej <strong style="color:#1f3a2b;">${name}</strong>, tak for din tilmelding til Træklatreskolen.
                Vi har modtaget din henvendelse og sender dig en faktura hurtigst muligt.
              </p>

              <!-- Booking-boks -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="background:#f5f7f6;border-radius:14px;border-left:5px solid #d8782f;
                            margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <div style="font-size:11px;font-weight:700;text-transform:uppercase;
                                letter-spacing:1.5px;color:#d8782f;margin-bottom:10px;">
                      Din tilmelding
                    </div>
                    <div style="color:#1f3a2b;font-size:18px;font-weight:800;line-height:1.3;">
                      ${course}
                    </div>
                    ${datePlace}
                  </td>
                </tr>
              </table>

              <!-- Hvad sker der nu -->
              <div style="margin-bottom:32px;">
                <div style="font-weight:800;color:#1f3a2b;font-size:16px;margin-bottom:16px;">
                  Hvad sker der nu?
                </div>

                <!-- Trin 1 -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                       style="margin-bottom:12px;">
                  <tr>
                    <td width="36" valign="top">
                      <div style="background:#d8782f;color:white;border-radius:50%;width:28px;
                                  height:28px;text-align:center;font-weight:800;font-size:14px;
                                  line-height:28px;">1</div>
                    </td>
                    <td style="padding-left:12px;color:#4b6355;font-size:15px;line-height:1.6;
                               vertical-align:top;padding-top:4px;">
                      Vi sender dig en <strong style="color:#1f3a2b;">faktura pr. e-mail</strong>
                      inden for kort tid — betal fakturaen for at sikre din plads.
                    </td>
                  </tr>
                </table>

                <!-- Trin 2 -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                       style="margin-bottom:12px;">
                  <tr>
                    <td width="36" valign="top">
                      <div style="background:#d8782f;color:white;border-radius:50%;width:28px;
                                  height:28px;text-align:center;font-weight:800;font-size:14px;
                                  line-height:28px;">2</div>
                    </td>
                    <td style="padding-left:12px;color:#4b6355;font-size:15px;line-height:1.6;
                               vertical-align:top;padding-top:4px;">
                      Når fakturaen er betalt, er din plads
                      <strong style="color:#1f3a2b;">bekræftet</strong>.
                    </td>
                  </tr>
                </table>

                <!-- Trin 3 -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td width="36" valign="top">
                      <div style="background:#d8782f;color:white;border-radius:50%;width:28px;
                                  height:28px;text-align:center;font-weight:800;font-size:14px;
                                  line-height:28px;">3</div>
                    </td>
                    <td style="padding-left:12px;color:#4b6355;font-size:15px;line-height:1.6;
                               vertical-align:top;padding-top:4px;">
                      Du modtager <strong style="color:#1f3a2b;">praktisk information</strong>
                      — mødested, hvad du skal medbringe m.m. — forud for kurset.
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Kontakt-boks -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:#eef3ef;border-radius:12px;padding:20px 24px;">
                    <div style="font-weight:700;color:#1f3a2b;font-size:14px;margin-bottom:6px;">
                      Spørgsmål?
                    </div>
                    <p style="margin:0;color:#4b6355;font-size:14px;line-height:1.65;">
                      Skriv til os på
                      <a href="mailto:info@traeklatreskolen.dk"
                         style="color:#d8782f;font-weight:700;text-decoration:none;">
                        info@traeklatreskolen.dk
                      </a>
                      — vi svarer hurtigst muligt.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#1f3a2b;padding:26px 40px;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.8;">
                <strong style="color:white;">Træklatreskolen v/Martin Machado</strong><br>
                Ingstrup Alle 17, 2770 Kastrup &nbsp;·&nbsp; CVR: 25579321<br>
                Mobil: 51 92 01 14 &nbsp;·&nbsp;
                <a href="mailto:info@traeklatreskolen.dk"
                   style="color:#d8782f;text-decoration:none;">info@traeklatreskolen.dk</a>
                &nbsp;·&nbsp;
                <a href="https://traeklatreskolen.dk"
                   style="color:rgba(255,255,255,0.45);text-decoration:none;">
                  traeklatreskolen.dk
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
