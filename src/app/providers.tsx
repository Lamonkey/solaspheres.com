"use client";

import ParticipantProvider from "./providers/ParticipantProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParticipantProvider>{children}</ParticipantProvider>;
}
