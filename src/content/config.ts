import { defineCollection, z } from "astro:content";

const servicios = defineCollection({
    type: 'data',
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().default(''),
        header: z.array(z.string()),
        video: z.string().default(''),
        additionalData: z.object({
            sloga: z.string().default(''),
            image: z.string().default(''),
        }),
        sections: z.array(z.object({
            title: z.string().default(''),
            images: z.array(z.string()),
            video: z.string().default(''),
            content: z.array(z.object({
                title: z.string().default(''),
                content: z.string().default(''),
            }))
        })),
    })
})

export const collections = { servicios }