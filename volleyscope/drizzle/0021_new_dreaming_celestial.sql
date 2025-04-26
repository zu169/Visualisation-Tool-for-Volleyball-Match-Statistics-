CREATE TABLE "point" (
	"point_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "point_point_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"set_id" integer,
	"point_number" integer NOT NULL,
	"player_list_id" integer,
	CONSTRAINT "point_point_id_set_id_pk" PRIMARY KEY("point_id","set_id"),
	CONSTRAINT "point_point_number_unique" UNIQUE("point_number")
);
--> statement-breakpoint
ALTER TABLE "point" ADD CONSTRAINT "point_set_id_set_set_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."set"("set_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "point" ADD CONSTRAINT "point_player_list_id_player_list_player_list_id_fk" FOREIGN KEY ("player_list_id") REFERENCES "public"."player_list"("player_list_id") ON DELETE no action ON UPDATE no action;