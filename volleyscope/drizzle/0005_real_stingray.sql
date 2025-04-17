CREATE TABLE "teamPlayer" (
	"team_id" integer,
	"player_id" integer,
	"year_joined" varchar(4) NOT NULL,
	CONSTRAINT "teamPlayer_team_id_player_id_pk" PRIMARY KEY("team_id","player_id")
);
--> statement-breakpoint
ALTER TABLE "teamPlayer" ADD CONSTRAINT "teamPlayer_team_id_team_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("team_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teamPlayer" ADD CONSTRAINT "teamPlayer_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;