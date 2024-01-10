/**
 * Copyright (c) 2023-present Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { MergeCommonMessage } from "@/i18n/messages/common/merge"
import type { TagProps } from "element-plus"

export function computeMergeType(mergedVal: number | string): TagProps["type"] {
    return typeof mergedVal === 'number' ? 'success' : mergedVal === '' ? 'info' : ''
}

type TypeFinder = (mergeCommon: MergeCommonMessage | EmbeddedPartial<MergeCommonMessage>) => string

export function computeMergeTxt(
    originVal: string,
    mergedVal: number | string,
    i18n: (finder: TypeFinder, param?: any) => string
): string {
    const mergeTxt = typeof mergedVal === 'number'
        ? i18n(msg => msg?.tagResult?.level, { level: mergedVal + 1 })
        : mergedVal === '' ? i18n(msg => msg?.tagResult?.blank) : mergedVal
    return `${originVal}  >>>  ${mergeTxt}`
}
