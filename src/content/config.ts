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
            slogan: z.string().default(''),
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

const inicio = defineCollection({
    type: 'data',
    schema: z.object({
        logo: z.string().url(),
        aboutus: z.string().url(),
        inicioClientes: z.array(z.string().url()),
        inicioHeader: z.array(z.string().url()),
        inicioServiciosSlider: z.array(z.string().url()),
        inicioServiciosSliderDos: z.array(z.string().url()),
        inicioServiciosSliderTres: z.array(z.string().url())
    })
});

export const collections = { inicio, servicios }