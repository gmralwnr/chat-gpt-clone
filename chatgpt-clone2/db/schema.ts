import { relations } from 'drizzle-orm';
import { pgTable, uuid, text,timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {  //pgTable 첫번째 테이블명, 두번째 인수는 속성값
	id: uuid('id').defaultRandom().notNull().primaryKey(),
    name: text('name').notNull(), 
    email: text('email').notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가

});

export const userRelations = relations(user,({many}) =>({
    converstation: many(conversation)
}));

export const conversation = pgTable('converstaion',{
    id:uuid("id").defaultRandom().notNull().primaryKey(),
    name:text('name'),
    userId : uuid("userId").references(()=>user.id, {onDelete:"cascade"}).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가
})

export const converstaionRelations = relations(conversation, ({one})=>({
    user:one(user,{
        fields:[conversation.userId],
        references:[user.id]
    })
}))

export const message = pgTable('message', {
    id:uuid("id").defaultRandom().notNull().primaryKey(),
    content:text('content'),
    role:text("role").$type<"user" | "assistant">(),
    conversationId:uuid("conversationId").references(()=>conversation.id, {onDelete : "cascade"}).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(), // ✅ `mode: "date"` 추가
});

export const messageRelations = relations(message, ({one}) =>({
    conversation: one (conversation,{
        fields:[message.conversationId],
        references:[conversation.id]
    })
}))

