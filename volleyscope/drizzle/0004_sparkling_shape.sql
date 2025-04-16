ALTER TABLE "opponent" ADD CONSTRAINT "opponent_team_name_unique" UNIQUE("team_name");--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_team_name_unique" UNIQUE("team_name");