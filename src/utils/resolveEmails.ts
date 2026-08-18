import { Emails } from "../schemas.js";

export function resolveEmails(email: Emails | string): Emails {
	return typeof email === "string" ? { github: email, npm: email } : email;
}
