/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { VNode } from "vue"
import { getI18nVal, type I18nKey, type KeyPath } from "."
import messages from "./messages"

export declare type I18nResultItem = VNode | string

const findParamAndReplace = (resultArr: I18nResultItem[], [key, value]: any) => {
    const paramPlacement = `{${key}}`
    const temp: I18nResultItem[] = []
    resultArr.forEach((item) => {
        if (typeof item === 'string' && item.includes(paramPlacement)) {
            // 将 string 替换成具体的 VNode
            let splits: I18nResultItem[] = (item as string).split(paramPlacement)
            splits = splits.reduce((left, right) => left.length ? left.concat(value, right) : left.concat(right), [])
            temp.push(...splits)
        } else {
            temp.push(item)
        }
    })
    return temp
}

export type NodeTranslateProps<MessageType> = {
    key: KeyPath<MessageType>,
    param: { [key: string]: I18nResultItem }
}

/**
 * Translate with slots for vue
 * I18nResultItemArray of VNodes or strings
 */
export function tN(key: I18nKey, param?: { [key: string]: I18nResultItem }): I18nResultItem[] {
    const result = getI18nVal(messages, key)
    let resultArr: I18nResultItem[] = [result]
    if (param) {
        resultArr = Object.entries(param).reduce(findParamAndReplace, resultArr)
    }
    return resultArr
}

