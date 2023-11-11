import { z } from "zod";

export const githubUserResponseSchema = z
    .object({
        avatar_url: z.string(),
        company: z.string().optional(),
        html_url: z.string(),
        location: z.string().optional(),
        login: z.string(),
        name: z.string().optional(),
    })
    .transform((userResponse) => ({
        avatarUrl: userResponse.avatar_url,
        company: userResponse.company,
        htmlUrl: userResponse.html_url,
        login: userResponse.login,
        location: userResponse.location,
        name: userResponse.name,
    }));

export type User = z.infer<typeof githubUserResponseSchema>;
