CREATE TABLE "list_player" (
	"player_list_id" integer,
	"player_id" integer,
	"position" "positions" NOT NULL,
	"shirt_number" integer,
	CONSTRAINT "list_player_player_list_id_player_id_pk" PRIMARY KEY("player_list_id","player_id")
);
--> statement-breakpoint
CREATE TABLE "player_list" (
	"player_list_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "player_list_player_list_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"set_id" integer,
	"match_id" integer
);
--> statement-breakpoint
ALTER TABLE "set" DROP CONSTRAINT "set_match_id";--> statement-breakpoint
ALTER TABLE "set" ADD PRIMARY KEY ("set_id");--> statement-breakpoint
ALTER TABLE "list_player" ADD CONSTRAINT "list_player_player_list_id_player_list_player_list_id_fk" FOREIGN KEY ("player_list_id") REFERENCES "public"."player_list"("player_list_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_player" ADD CONSTRAINT "list_player_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_set_id_set_set_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."set"("set_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_match_id_match_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("match_id") ON DELETE no action ON UPDATE no action;