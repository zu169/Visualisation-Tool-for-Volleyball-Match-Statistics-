CREATE TYPE "public"."attack_success" AS ENUM('Normal', 'Kill', 'Error', 'Blocked');--> statement-breakpoint
CREATE TYPE "public"."attack_type" AS ENUM('Hit', 'Tip');--> statement-breakpoint
CREATE TYPE "public"."block_type" AS ENUM('Kill', 'Touch', 'Error');--> statement-breakpoint
CREATE TYPE "public"."receive_success" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."receive_type" AS ENUM('Normal', 'Serve', 'Dig', 'Error');--> statement-breakpoint
CREATE TYPE "public"."serve_success" AS ENUM('Normal', 'Ace', 'Error');--> statement-breakpoint
CREATE TYPE "public"."serve_type" AS ENUM('Underhand', 'Overhand', 'Float', 'Jump');--> statement-breakpoint
CREATE TYPE "public"."set_action_type" AS ENUM('Assist', 'Error', 'Negative');--> statement-breakpoint
ALTER TABLE "point" DROP CONSTRAINT "point_point_id_set_id_pk";--> statement-breakpoint
ALTER TABLE "point" ADD PRIMARY KEY ("point_id");