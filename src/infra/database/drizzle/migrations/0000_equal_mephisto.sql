CREATE TYPE "public"."state" AS ENUM('CREATED', 'ANALYSIS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'DELETED');--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lab" varchar(255) NOT NULL,
	"patient" varchar(255) NOT NULL,
	"customer" varchar(255) NOT NULL,
	"state" "state" DEFAULT 'CREATED' NOT NULL,
	"status" "status" DEFAULT 'ACTIVE' NOT NULL,
	"services" jsonb NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;