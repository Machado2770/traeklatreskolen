"use client";

import { useEffect } from "react";
import { captureSource } from "@/lib/attribution";

// Registrerer hvor besøget kom fra, første gang en side loades.
// Ingen visning — ligger i root-layoutet så alle indgange fanges.
export default function SourceTracker() {
  useEffect(() => {
    captureSource();
  }, []);

  return null;
}
