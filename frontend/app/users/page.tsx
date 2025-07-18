'use client';

import FaqAccordion from "./FaqAccordion";
import NotificationPanel from "./NotificationPanel";
import ServiceCards from "./ServiceCards";

export default function Rightpage() {

  return (
    <>
      <h1 className="text-3xl">マイページ</h1>
      <h2 className="text-xl mt-4 mb-5">山田太郎さん</h2>
      <NotificationPanel />
      <ServiceCards />
      <FaqAccordion />
    </>
  );
}
