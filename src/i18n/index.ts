import messages, { type Message } from "./messages"

export type KeyPath<MessageType> = (root: MessageType) => any

export type I18nKey = KeyPath<Message>

const FEEDBACK_LOCALE: Locale = 'en'
export const locale: Locale = 'en'

function tryGetOriginalI18nVal<MessageType>(
    root: Messages<MessageType>,
    keyPath: KeyPath<MessageType>,
    specLocale?: Locale
) {
    try {
        const realLocale = specLocale || locale
        return keyPath(root?.[realLocale] as MessageType)
    } catch (ignore) {
        return undefined
    }
}

export function getI18nVal<MessageType>(
    messages: Messages<MessageType>,
    keyPath: KeyPath<MessageType>,
    specLocale?: Locale
): string {
    const result = tryGetOriginalI18nVal(messages, keyPath, specLocale)
        || keyPath(messages[FEEDBACK_LOCALE] as MessageType)
        || ''
    return typeof result === 'string' ? result : JSON.stringify(result)
}

export type TranslateProps = {
    key: I18nKey,
    param?: { [key: string]: string }
}

function fillWithParam(result: string, param: { [key: string]: string }) {
    if (!result) {
        return ''
    }
    Object.entries(param)
        .filter(([_key, value]) => value !== null && value !== undefined)
        .forEach(([key, value]) => result = result.replace(`{${key}}`, value.toString()))
    return result
}

export function t(key: I18nKey, param?: any, specLocale?: Locale): string {
    const result: string = getI18nVal(messages, key, specLocale)
    return param ? fillWithParam(result, param) : result
}

export const BASE_LOCALE = 'en' as const

export const SOURCE_LOCALES = [BASE_LOCALE, 'zh_CN'] as const

export const OPTIONAL_LOCALES = [
    "ja",
    'zh_TW',
    'pt_PT',
] as const

export const ALL_LOCALES = [...SOURCE_LOCALES, ...OPTIONAL_LOCALES] as const

export const TRANSLATING_LOCALES = [
    'de',
    'es',
    'ko',
    'pl',
    'ru',
    'fr',
    'it',
    'sv',
    'fi',
    'da',
    'hr',
    'id',
    'tr',
    'cs',
    'ro',
    'nl',
    'vi',
    'sk',
    'mn',
    'uk',
] as const

export type SourceLocale = typeof BASE_LOCALE
export type RequiredLocale = typeof SOURCE_LOCALES[number]
export type OptionalLocale = typeof OPTIONAL_LOCALES[number]
export type Locale = typeof ALL_LOCALES[number]
export type TranslatingLocale = typeof TRANSLATING_LOCALES[number]

export type RequiredMessages<M> = {
    [locale in RequiredLocale]: M
}

export type OptionalMessages<M> = {
    [locale in OptionalLocale]?: EmbeddedPartial<M>
}

export type Messages<M> = RequiredMessages<M> & OptionalMessages<M>
