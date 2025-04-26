CREATE TABLE "serve" (
	"serve_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "serve_serve_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "serve_type" DEFAULT 'Overhand',
	"success" "serve_success" DEFAULT 'Normal'
);
--> statement-breakpoint
ALTER TABLE "serve" ADD CONSTRAINT "serve_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serve" ADD CONSTRAINT "serve_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;