export interface StoreRating {
    browser: "Chrome" | "Firefox" | "Edge"
    rating: number
    count: number
    link: string
}

export const STORE_RATINGS: StoreRating[] = [
    {
        browser: "Chrome",
        rating: 4.87,
        count: 110,
        link: "https://chrome.google.com/webstore/detail/%E7%BD%91%E8%B4%B5%E5%BE%88%E8%B4%B5-%E4%B8%8A%E7%BD%91%E6%97%B6%E9%97%B4%E7%BB%9F%E8%AE%A1/dkdhhcbjijekmneelocdllcldcpmekmm",
    },
    {
        browser: "Firefox",
        rating: 4.98,
        count: 45,
        link: "https://addons.mozilla.org/firefox/addon/besttimetracker",
    },
    {
        browser: "Edge",
        rating: 4.96,
        count: 102,
        link: "https://microsoftedge.microsoft.com/addons/detail/timer-the-web-time-is-e/fepjgblalcnepokjblgbgmapmlkgfahc",
    },
]
