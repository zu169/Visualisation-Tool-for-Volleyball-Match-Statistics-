CREATE TYPE "public"."divisions" AS ENUM('Premier', '1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."leagues" AS ENUM('BUCS', 'BDVA', 'NVL', 'Regional');--> statement-breakpoint
CREATE TYPE "public"."positions" AS ENUM('Setter', 'Outside Hitter', 'Middle Blocker', 'Opposite Hitter', 'Libero', 'Defensive Specialist', 'Service Specialist', 'Bench');--> statement-breakpoint
CREATE TABLE "opponent" (
	"teamId" integer PRIMARY KEY NOT NULL,
	"team_name" varchar(100) NOT NULL,
	"league" "leagues" NOT NULL,
	"division" "divisions" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player" (
	"player_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "player_player_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"player_name" varchar NOT NULL,
	"position" "positions" NOT NULL,
	"shirt_number" integer,
	"birthday" date,
	"player_height" numeric,
	"player_weight" numeric,
	"jump_height" numeric(5, 2),
	"serve_speed" numeric(5, 2),
	"hitting_speed" numeric(5, 2)
);
--> statement-breakpoint
CREATE TABLE "team" (
	"teamId" integer PRIMARY KEY NOT NULL,
	"team_name" varchar(100) NOT NULL,
	"league" "leagues" NOT NULL,
	"division" "divisions" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "potentials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "potentials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	CONSTRAINT "potentials_email_unique" UNIQUE("email")
);
