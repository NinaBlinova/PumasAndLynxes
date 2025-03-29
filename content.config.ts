import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        lynxes: defineCollection({
            type: 'data',
            source: 'lynxes/**.json',
            schema: z.object({
                imageName: z.string(),
                caption: z.string(),
                description: z.string(),
                slug: z.string()
            })
        })
    }
})

