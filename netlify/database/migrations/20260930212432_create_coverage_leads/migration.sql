CREATE TABLE "coverage_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"submission_id" uuid NOT NULL UNIQUE,
	"name" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"city" varchar(50) NOT NULL,
	"district" varchar(150) NOT NULL,
	"operator" varchar(30) NOT NULL,
	"building_type" varchar(40) NOT NULL,
	"service" varchar(20) NOT NULL,
	"source_path" varchar(250) NOT NULL,
	"consent" boolean NOT NULL,
	"consent_version" varchar(30) NOT NULL,
	"status" varchar(30) DEFAULT 'pending_verification' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "coverage_leads_created_at_idx" ON "coverage_leads" ("created_at");