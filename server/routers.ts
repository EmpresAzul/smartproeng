import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

const contactInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform(value => value.toLowerCase()),
  phone: z.string().trim().max(32).optional().default(""),
  organization: z.string().trim().max(140).optional().default(""),
  city: z.string().trim().min(2).max(120),
  service: z.string().trim().min(2).max(140),
  message: z.string().trim().min(15).max(3000),
  consent: z.literal(true),
  website: z.string().max(200).optional().default(""),
  utm_source: z.string().trim().max(140).optional().default(""),
  utm_medium: z.string().trim().max(140).optional().default(""),
  utm_campaign: z.string().trim().max(140).optional().default(""),
  utm_term: z.string().trim().max(140).optional().default(""),
  utm_content: z.string().trim().max(140).optional().default(""),
});

type ContactInput = z.infer<typeof contactInput>;
const attempts = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_CONTACTS_PER_WINDOW = 4;

function isRateLimited(address: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(address) ?? []).filter(time => now - time < RATE_WINDOW_MS);
  if (recent.length >= MAX_CONTACTS_PER_WINDOW) {
    attempts.set(address, recent);
    return true;
  }
  recent.push(now);
  attempts.set(address, recent);
  if (attempts.size > 5000) {
    for (const [key, times] of attempts) {
      if (!times.some(time => now - time < RATE_WINDOW_MS)) attempts.delete(key);
    }
  }
  return false;
}

function nullable(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactInput).mutation(async ({ ctx, input }) => {
      // Bot trap: silently accept the request but never persist its contents.
      if (input.website.trim()) return { received: true } as const;
      const address = ctx.req.ip || ctx.req.socket.remoteAddress || "unknown";
      if (isRateLimited(address)) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Muitas tentativas. Aguarde alguns minutos e tente novamente." });
      }
      try {
        await db.createContactMessage({
          name: input.name,
          email: input.email,
          phone: nullable(input.phone),
          organization: nullable(input.organization),
          city: input.city,
          service: input.service,
          message: input.message,
          utmSource: nullable(input.utm_source),
          utmMedium: nullable(input.utm_medium),
          utmCampaign: nullable(input.utm_campaign),
          utmTerm: nullable(input.utm_term),
          utmContent: nullable(input.utm_content),
          consentAt: new Date(),
          status: "new",
        });
        return { received: true } as const;
      } catch {
        console.error("[Contact] Failed to store a contact message");
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível enviar sua solicitação agora." });
      }
    }),
  }),
  admin: router({
    listMessages: adminProcedure
      .input(z.object({ cursor: z.number().int().positive().nullish() }))
      .query(({ input }) => db.listContactMessages(input.cursor)),
    updateStatus: adminProcedure.input(z.object({
      id: z.number().int().positive(),
      status: z.enum(["new", "in_progress", "responded"]),
    })).mutation(({ input }) => db.updateContactMessageStatus(input.id, input.status)),
    deleteMessage: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => db.deleteContactMessage(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
