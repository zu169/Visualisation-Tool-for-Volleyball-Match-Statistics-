ALTER TABLE "set_action" RENAME COLUMN "sets_id" TO "set_id";--> statement-breakpoint
ALTER TABLE "set_action" DROP CONSTRAINT "set_action_sets_id_point_id_pk";--> statement-breakpoint
ALTER TABLE "set_action" ADD CONSTRAINT "set_action_set_id_point_id_pk" PRIMARY KEY("set_id","point_id");