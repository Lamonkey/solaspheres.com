"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AssessmentType,
  ParticipantInfo,
} from "@/lib/assessments";

export type Participant = ParticipantInfo;

export type SavedReport = {
  id: string;
  type: AssessmentType;
  title: string;
  summary: string;
  data: Record<string, unknown>;
  completedAt: string;
  participant: ParticipantInfo;
};

export type ParticipantContextValue = {
  participant: Participant | null;
  setParticipant: (participant: Participant) => void;
  clearParticipant: () => void;
  reports: SavedReport[];
  saveReport: (
    report: Omit<SavedReport, "id" | "completedAt" | "participant">
  ) => SavedReport;
};

const ParticipantContext = createContext<ParticipantContextValue | undefined>(
  undefined,
);

const PARTICIPANT_KEY = "sola.assessment.participant";
const REPORTS_KEY = "sola.assessment.reports";

function safeParse<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (err) {
    console.error("Failed to parse stored value", err);
    return null;
  }
}

export function useParticipant() {
  const context = useContext(ParticipantContext);

  if (!context) {
    throw new Error("useParticipant must be used within ParticipantProvider");
  }

  return context;
}

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `report-${Date.now()}`;
}

export default function ParticipantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [participant, setParticipantState] = useState<Participant | null>(null);
  const [reports, setReports] = useState<SavedReport[]>([]);
  const hasLoadedRef = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedParticipant = safeParse<Participant>(
      window.localStorage.getItem(PARTICIPANT_KEY),
    );
    const storedReports = safeParse<SavedReport[]>(
      window.localStorage.getItem(REPORTS_KEY),
    );

    if (storedParticipant) {
      setParticipantState(storedParticipant);
    }

    if (storedReports) {
      setReports(storedReports);
    }

    hasLoadedRef.current = true;
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hasLoadedRef.current || typeof window === "undefined") {
      return;
    }

    if (participant) {
      window.localStorage.setItem(
        PARTICIPANT_KEY,
        JSON.stringify(participant),
      );
    } else {
      window.localStorage.removeItem(PARTICIPANT_KEY);
    }
  }, [participant]);

  useEffect(() => {
    if (!hasLoadedRef.current || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  }, [reports]);

  const setParticipant = (info: Participant) => {
    setParticipantState({
      name: info.name.trim(),
      inviter: info.inviter.trim(),
    });
  };

  const clearParticipant = () => {
    setParticipantState(null);
  };

  const saveReport: ParticipantContextValue["saveReport"] = useCallback(
    (report) => {
      if (!participant) {
        throw new Error("Cannot save report without participant info");
      }

      const entry: SavedReport = {
        id: generateId(),
        completedAt: new Date().toISOString(),
        ...report,
        participant,
      };

      setReports((prev) => [...prev, entry]);
      return entry;
    },
    [participant],
  );

  const contextValue = useMemo(
    () => ({ participant, setParticipant, clearParticipant, reports, saveReport }),
    [participant, reports, saveReport],
  );

  return (
    <ParticipantContext.Provider value={contextValue}>
      {children}
    </ParticipantContext.Provider>
  );
}
