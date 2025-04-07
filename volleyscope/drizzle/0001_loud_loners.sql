ALTER TYPE "public"."type" RENAME TO "match_type";--> statement-breakpoint
CREATE TABLE "set_action" (
	"sets_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "set_action_sets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "set_action_type" DEFAULT 'Assist',
	CONSTRAINT "set_action_sets_id_point_id_pk" PRIMARY KEY("sets_id","point_id")
);
--> statement-breakpoint
ALTER TABLE "set" DROP CONSTRAINT "set_point_id_point_point_id_fk";
--> statement-breakpoint
ALTER TABLE "set" DROP CONSTRAINT "set_player_id_player_player_id_fk";
--> statement-breakpoint
ALTER TABLE "set" DROP CONSTRAINT "set_sets_id_point_id_pk";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'attack'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "attack" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'block'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "block" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'receive'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "receive" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "set_id" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "set_set_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "match_id" integer;--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "score" varchar(50);--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "youtube_link" varchar(255);--> statement-breakpoint
ALTER TABLE "potentials" ADD COLUMN "id" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "potentials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "set_action" ADD CONSTRAINT "set_action_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set_action" ADD CONSTRAINT "set_action_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set" ADD CONSTRAINT "set_match_id_match_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("match_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set" DROP COLUMN "sets_id";--> statement-breakpoint
ALTER TABLE "set" DROP COLUMN "point_id";--> statement-breakpoint
ALTER TABLE "set" DROP COLUMN "player_id";--> statement-breakpoint
ALTER TABLE "set" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "potentials" DROP COLUMN "p_id";