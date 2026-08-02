// Hjælpere til kilde-sporing på tilmeldinger (participants.source).
// Bruges server-side af booking-API'et og admin-statistikken.

// Vasker kilden fra browseren: kun små bogstaver, tal og få tegn. Værdien
// ender i databasen og på en admin-side, så den skal være forudsigelig.
export function renseKilde(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 40);
}

// Sand hvis fejlen skyldes at source-kolonnen ikke findes i databasen endnu
// (scripts/add_participant_source.sql ikke kørt). PGRST204 = ukendt kolonne i
// PostgREST-skemaet, 42703 = undefined_column i Postgres.
export function manglerSourceKolonne(err) {
  if (err?.code === "PGRST204" || err?.code === "42703") return true;
  const besked = err?.message ?? "";
  return /source/i.test(besked) && /(schema cache|does not exist)/i.test(besked);
}
