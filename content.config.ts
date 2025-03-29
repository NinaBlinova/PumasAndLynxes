import {defineCollection, defineContentConfig, z} from '@nuxt/content'

export default defineContentConfig({
    collections: {
        lynxes: defineCollection({
            type: 'data',
            source: 'lynxes/**.json',
            schema: z.object({
                imageName: z.string(),
                imgName2: z.string(),
                caption: z.string(),
                description: z.string(),
                fact1: z.string(),
                fact2: z.string(),
                fact3: z.string(),
                fact4: z.string(),
                fact5: z.string(),
                slug: z.string()
            })
        }),
        pumas: defineCollection({
            type: 'data',
            source: 'pumas/**.json',
            schema: z.object({
                imageName: z.string(),
                imgName2: z.string(),
                caption: z.string(),
                description: z.string(),
                fact1: z.string(),
                fact2: z.string(),
                fact3: z.string(),
                fact4: z.string(),
                fact5: z.string(),
                slug: z.string()
            })
        })
    }

})

