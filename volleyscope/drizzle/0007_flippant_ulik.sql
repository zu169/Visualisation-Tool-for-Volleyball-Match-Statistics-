CREATE TABLE "match" (
	"match_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "match_match_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"team_id" integer NOT NULL,
	"opponent_id" integer NOT NULL,
	"date" date NOT NULL,
	"matchType" "leagues" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_team_id_team_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("team_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_opponent_id_opponent_team_id_fk" FOREIGN KEY ("opponent_id") REFERENCES "public"."opponent"("team_id") ON DELETE no action ON UPDATE no action;