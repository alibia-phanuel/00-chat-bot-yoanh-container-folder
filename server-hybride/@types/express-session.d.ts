import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string | number | undefined;
    role?: string;
  }
}
