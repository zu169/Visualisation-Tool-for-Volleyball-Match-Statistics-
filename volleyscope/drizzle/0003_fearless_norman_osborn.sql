CREATE TABLE "opponent" (
	"team_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "opponent_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"team_name" varchar(100) NOT NULL,
	"league" "leagues" NOT NULL,
	"division" "divisions" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team" (
	"team_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "team_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"team_name" varchar(100) NOT NULL,
	"league" "leagues" NOT NULL,
	"division" "divisions" NOT NULL
);
