-- CreateTable
CREATE TABLE "AssessmentReport" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "inviter" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentReport_pkey" PRIMARY KEY ("id")
);
