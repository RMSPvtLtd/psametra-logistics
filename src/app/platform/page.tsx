import type { Metadata } from "next";
import { ControlTower } from "@/features/platform/ControlTower";
import { Conversion } from "@/components/footer";

export const metadata: Metadata = { title: "Connected freight platform", description: "Explore a sample logistics control tower that puts exceptions and next actions first. A software concept by psametra." };

export default function PlatformPage() {
  return <><section className="container page-intro page-intro-split"><div><p className="eyebrow">THE CONNECTED FREIGHT PLATFORM</p><h1>From movement<br />to understanding.</h1></div><p>The important question isn’t how many shipments there are. It’s which one needs your attention next.</p></section><div className="container page-body"><ControlTower /><div className="platform-principles"><div><p className="eyebrow">01 / PRIORITIZE</p><h3>Attention before analytics.</h3><p>Surface the held shipment, revised arrival and missing document. Put a useful next action alongside each one.</p></div><div><p className="eyebrow">02 / CONNECT</p><h3>The context stays together.</h3><p>Routes, milestones and documents belong to the shipment. Keep the handover clear from one step to the next.</p></div><div><p className="eyebrow">03 / COMMUNICATE</p><h3>The right view for the customer.</h3><p>Share meaningful updates without exposing internal operational notes. Give customers clarity in their own workspace.</p></div></div></div><Conversion /></>;
}
