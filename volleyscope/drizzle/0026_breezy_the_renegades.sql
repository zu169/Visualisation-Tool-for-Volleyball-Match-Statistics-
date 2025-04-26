CREATE TYPE "public"."sides" AS ENUM('home', 'away');--> statement-breakpoint
ALTER TABLE "point" ADD COLUMN "side" "sides" NOT NULL;