CREATE TYPE "public"."type" AS ENUM('BUCS', 'BDVA', 'Tournament', 'Other');--> statement-breakpoint
CREATE TYPE "public"."attack_success" AS ENUM('Normal', 'Kill', 'Error', 'Blocked');--> statement-breakpoint
CREATE TYPE "public"."attack_type" AS ENUM('Hit', 'Tip');--> statement-breakpoint
CREATE TYPE "public"."block_type" AS ENUM('Kill', 'Touch', 'Error');--> statement-breakpoint
CREATE TYPE "public"."receive_success" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."receive_type" AS ENUM('Normal', 'Serve', 'Dig', 'Error');--> statement-breakpoint
CREATE TYPE "public"."serve_success" AS ENUM('Normal', 'Ace', 'Error');--> statement-breakpoint
CREATE TYPE "public"."serve_type" AS ENUM('Underhand', 'Overhand', 'Float', 'Jump');--> statement-breakpoint
CREATE TYPE "public"."set_action_type" AS ENUM('Assist', 'Error', 'Negative');--> statement-breakpoint
CREATE TABLE "match" (
	"match_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "match_match_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"team_id" integer,
	"team2_id" integer,
	"date" date,
	"matchType" "type"
);
--> statement-breakpoint
CREATE TABLE "player_list" (
	"set_id" integer,
	"team_id" integer,
	"player_id" integer,
	"position_id" integer,
	"shirt_number" integer,
	CONSTRAINT "player_list_set_id_team_id_pk" PRIMARY KEY("set_id","team_id")
);
--> statement-breakpoint
CREATE TABLE "point" (
	"point_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "point_point_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"set_id" integer,
	"team_id" integer,
	CONSTRAINT "point_point_id_set_id_team_id_pk" PRIMARY KEY("point_id","set_id","team_id")
);
--> statement-breakpoint
CREATE TABLE "set" (
	"sets_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "set_sets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "set_action_type" DEFAULT 'Assist',
	CONSTRAINT "set_sets_id_point_id_pk" PRIMARY KEY("sets_id","point_id")
);
--> statement-breakpoint
CREATE TABLE "team" (
	"teamId" integer PRIMARY KEY NOT NULL,
	"team_name" varchar(100),
	"org_id" integer,
	"division" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "playerPosition" (
	"player_id" integer,
	"position_id" integer
);
--> statement-breakpoint
CREATE TABLE "player" (
	"player_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "player_player_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"player_name" varchar NOT NULL,
	"position_id" integer,
	"shirt_number" integer,
	"birthday" date,
	"player_height" numeric,
	"player_weight" numeric,
	"jump_height" numeric(5, 2),
	"serve_speed" numeric(5, 2),
	"hitting_speed" numeric(5, 2)
);
--> statement-breakpoint
CREATE TABLE "teamPlayer" (
	"team_id" integer,
	"player_id" integer,
	"joined_date" date NOT NULL,
	CONSTRAINT "teamPlayer_team_id_player_id_pk" PRIMARY KEY("team_id","player_id")
);
--> statement-breakpoint
CREATE TABLE "attack" (
	"attack_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attack_attack_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "attack_type" DEFAULT 'Hit',
	"success" "attack_success" DEFAULT 'Normal',
	CONSTRAINT "attack_attack_id_point_id_pk" PRIMARY KEY("attack_id","point_id")
);
--> statement-breakpoint
CREATE TABLE "block" (
	"block_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "block_block_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "block_type" DEFAULT 'Touch',
	CONSTRAINT "block_block_id_point_id_pk" PRIMARY KEY("block_id","point_id")
);
--> statement-breakpoint
CREATE TABLE "receive" (
	"receive_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "receive_receive_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "receive_type" DEFAULT 'Normal',
	"success" "receive_success" DEFAULT '2',
	CONSTRAINT "receive_receive_id_point_id_pk" PRIMARY KEY("receive_id","point_id")
);
--> statement-breakpoint
CREATE TABLE "serve" (
	"point_id" integer PRIMARY KEY NOT NULL,
	"player_id" integer,
	"type" "serve_type" DEFAULT 'Overhand',
	"success" "serve_success" DEFAULT 'Normal'
);
--> statement-breakpoint
CREATE TABLE "position" (
	"position_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "position_position_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"position_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_user" (
	"org_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "org_user_org_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "org_user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "potentials" (
	"p_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "potentials_p_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	CONSTRAINT "potentials_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"player_id" integer,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_player_id_unique" UNIQUE("player_id"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_team_id_team_teamId_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("teamId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_team2_id_team_teamId_fk" FOREIGN KEY ("team2_id") REFERENCES "public"."team"("teamId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_set_id_set_set_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."set"("set_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_team_id_team_teamId_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("teamId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_position_id_position_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("position_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "point" ADD CONSTRAINT "point_set_id_set_set_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."set"("set_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "point" ADD CONSTRAINT "point_team_id_team_teamId_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("teamId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set" ADD CONSTRAINT "set_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set" ADD CONSTRAINT "set_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_org_id_org_user_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."org_user"("org_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playerPosition" ADD CONSTRAINT "playerPosition_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playerPosition" ADD CONSTRAINT "playerPosition_position_id_position_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("position_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player" ADD CONSTRAINT "player_position_id_position_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("position_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teamPlayer" ADD CONSTRAINT "teamPlayer_team_id_team_teamId_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("teamId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teamPlayer" ADD CONSTRAINT "teamPlayer_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attack" ADD CONSTRAINT "attack_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attack" ADD CONSTRAINT "attack_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receive" ADD CONSTRAINT "receive_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receive" ADD CONSTRAINT "receive_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serve" ADD CONSTRAINT "serve_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serve" ADD CONSTRAINT "serve_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;