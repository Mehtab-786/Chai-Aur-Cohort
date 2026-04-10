import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable('users',{
    id:uuid('id').primaryKey().defaultRandom(),

    firstName:varchar('first_name',{length:50}).notNull(),
    lastName:varchar('last_name',{length:50}),

    email:varchar('email', {length:250}).unique().notNull(),

    password:varchar('password',{length:50}),
    salt:text('salt'),

    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').$onUpdate(() => new Date())
})
