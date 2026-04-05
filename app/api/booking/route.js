await supabase.from("participants").insert([
  {
    name,
    email,
    phone,
    course,
    notes,
    payment_status: "pending",
  },
]);