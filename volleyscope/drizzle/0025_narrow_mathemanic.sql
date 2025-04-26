CREATE TABLE "block" (
	"block_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "block_block_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "block_type" DEFAULT 'Touch'
);
--> statement-breakpoint
CREATE TABLE "receive" (
	"receive_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "receive_receive_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "receive_type" DEFAULT 'Normal',
	"success" "receive_success" DEFAULT '2'
);
--> statement-breakpoint
CREATE TABLE "set_action" (
	"set_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "set_action_set_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"point_id" integer,
	"player_id" integer,
	"type" "set_action_type" DEFAULT 'Assist'
);
--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receive" ADD CONSTRAINT "receive_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receive" ADD CONSTRAINT "receive_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set_action" ADD CONSTRAINT "set_action_point_id_point_point_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."point"("point_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set_action" ADD CONSTRAINT "set_action_player_id_player_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("player_id") ON DELETE no action ON UPDATE no action;