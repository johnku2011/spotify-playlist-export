"use client";

import { useEffect } from "react";
import * as gtag from "@/lib/gtag";

export default function TutorialTracker() {
  useEffect(() => {
    gtag.trackViewTutorial();
  }, []);

  return null;
}
