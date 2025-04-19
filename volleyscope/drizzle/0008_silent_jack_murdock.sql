ALTER TYPE "public"."leagues" ADD VALUE 'Tournament';--> statement-breakpoint
ALTER TYPE "public"."leagues" ADD VALUE 'Other';--> statement-breakpoint
CREATE TABLE "set" (
	"set_id" integer NOT NULL,
	"match_id" integer,
	"score" varchar(50),
	"youtube_link" varchar(255),
	CONSTRAINT "set_match_id" PRIMARY KEY("match_id","set_id"),
	CONSTRAINT "set_set_id_unique" UNIQUE("set_id"),
	CONSTRAINT "set_youtube_link_unique" UNIQUE("youtube_link")
);
--> statement-breakpoint
ALTER TABLE "set" ADD CONSTRAINT "set_match_id_match_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("match_id") ON DELETE no action ON UPDATE no action;