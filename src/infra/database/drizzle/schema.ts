import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const stateEnum = pgEnum('state', ['CREATED', 'ANALYSIS', 'COMPLETED'])
export const statusEnum = pgEnum('status', ['ACTIVE', 'DELETED'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  lab: varchar('lab', { length: 255 }).notNull(),
  patient: varchar('patient', { length: 255 }).notNull(),
  customer: varchar('customer', { length: 255 }).notNull(),
  state: stateEnum()
    .notNull()
    .default('CREATED')
    .$type<'CREATED' | 'ANALYSIS' | 'COMPLETED'>(),
  status: statusEnum()
    .notNull()
    .default('ACTIVE')
    .$type<'ACTIVE' | 'DELETED'>(),
  services: jsonb('services').notNull().$type<
    Array<{
      name: string
      value: number
      status: 'PENDING' | 'DONE'
    }>
  >(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}))
