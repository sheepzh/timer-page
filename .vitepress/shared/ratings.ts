import ratings from "./rating-resource.json"

export type StoreRatings = Record<
    "Chrome" | "Firefox" | "Edge",
    {
        rating: number
        count: number
        link: string
    }
>

export const STORE_RATINGS = ratings satisfies StoreRatings
