import { Emails } from "../schemas.ts";

export function resolveEmails(email: Emails | string): Emails {
	return typeof email === "string" ? { github: email, npm: email } : email;
}
