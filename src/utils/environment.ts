/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type Browser = 'firefox' | 'chrome' | 'edge' | 'opera' | 'safari' | 'unknown'

export const detectBrowser = (): Browser => {
    if (typeof window === 'undefined') return 'unknown'
    const { userAgent } = navigator
    if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
        return 'firefox'
    } else if (userAgent.includes('Edg')) {
        return 'edge'
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return 'opera'
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'safari'
    } else if (userAgent.includes('Chrome')) {
        return 'chrome'
    } else {
        return 'unknown'
    }
}

export const isFirefox = () => detectBrowser() === 'firefox'