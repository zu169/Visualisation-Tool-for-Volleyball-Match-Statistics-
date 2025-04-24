CREATE TABLE "player_list" (
	"player_list_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "player_list_player_list_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"set_num" integer NOT NULL,
	"match_id" integer
);
--> statement-breakpoint
ALTER TABLE "player_list" ADD CONSTRAINT "player_list_match_id_match_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("match_id") ON DELETE no action ON UPDATE no action;