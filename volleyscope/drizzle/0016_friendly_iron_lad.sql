CREATE TABLE "list_player" (
	"player_list_id" integer,
	"player_id" integer,
	"position" "positions" NOT NULL,
	"shirt_number" integer,
	CONSTRAINT "list_player_player_list_id_player_id_pk" PRIMARY KEY("player_list_id","player_id")
);
--> statement-breakpoint
ALTER TABLE "list_player" ADD CONSTRAINT "list_player_player_list_id_player_list_player_list_id_fk" FOREIGN KEY ("player_list_id") REFERENCES "public"."player_list"("player_list_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_player" ADD CONSTRAINT "list_player_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;