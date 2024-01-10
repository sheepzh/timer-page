/**
 * Copyright (c) 2022-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Messages } from ".."

import layoutMessages, { type LayoutMessage } from "./layout"
import startMessages, { type StartMessage } from "./start"
import privacyMessages, { type PrivacyMessage } from "./privacy"
import homeMessages, { type HomeMessage } from "./home"
import appMessages, { type AppMessage } from "./app"
import mergeMessages, { type MergeMessage } from "./merge"
import virtualMessages, { type VirtualMessage } from "./virtual"
import limitMessages, { type LimitMessage } from "./limit"
import backupMessages, { type BackupMessage } from "./backup"
import localeMessages, { type LocaleMessage } from "./locale"
import metaMessages, { type MetaMessage } from "./meta"
import mergeCommonMessages, { type MergeCommonMessage } from "./common/merge"

export type Message = {
    layout: LayoutMessage
    home: HomeMessage
    start: StartMessage
    privacy: PrivacyMessage
    app: AppMessage
    merge: MergeMessage
    mergeCommon: MergeCommonMessage
    virtual: VirtualMessage
    limit: LimitMessage
    backup: BackupMessage
    locale: LocaleMessage
    meta: MetaMessage
}

const _default: Required<Messages<Message>> = {
    zh_CN: {
        layout: layoutMessages.zh_CN,
        home: homeMessages.zh_CN,
        start: startMessages.zh_CN,
        privacy: privacyMessages.zh_CN,
        app: appMessages.zh_CN,
        merge: mergeMessages.zh_CN,
        mergeCommon: mergeCommonMessages.zh_CN,
        virtual: virtualMessages.zh_CN,
        limit: limitMessages.zh_CN,
        backup: backupMessages.zh_CN,
        locale: localeMessages.zh_CN,
        meta: metaMessages.zh_CN,
    },
    zh_TW: {
        layout: layoutMessages.zh_TW,
        home: homeMessages.zh_TW,
        start: startMessages.zh_TW,
        privacy: privacyMessages.zh_TW,
        app: appMessages.zh_TW,
        merge: mergeMessages.zh_TW,
        mergeCommon: mergeCommonMessages.zh_TW,
        virtual: virtualMessages.zh_TW,
        limit: limitMessages.zh_TW,
        backup: backupMessages.zh_TW,
        locale: localeMessages.zh_TW,
        meta: metaMessages.zh_TW,
    },
    en: {
        layout: layoutMessages.en,
        home: homeMessages.en,
        start: startMessages.en,
        privacy: privacyMessages.en,
        app: appMessages.en,
        merge: mergeMessages.en,
        mergeCommon: mergeCommonMessages.en,
        virtual: virtualMessages.en,
        limit: limitMessages.en,
        backup: backupMessages.en,
        locale: localeMessages.en,
        meta: metaMessages.en
    },
    ja: {
        layout: layoutMessages.ja,
        home: homeMessages.ja,
        start: startMessages.ja,
        privacy: privacyMessages.ja,
        app: appMessages.ja,
        merge: mergeMessages.ja,
        mergeCommon: mergeCommonMessages.ja,
        virtual: virtualMessages.ja,
        limit: limitMessages.ja,
        backup: backupMessages.ja,
        locale: localeMessages.ja,
        meta: metaMessages.ja,
    },
    pt_PT: {
        layout: layoutMessages.pt_PT,
        home: homeMessages.pt_PT,
        start: startMessages.pt_PT,
        privacy: privacyMessages.pt_PT,
        app: appMessages.pt_PT,
        merge: mergeMessages.pt_PT,
        mergeCommon: mergeCommonMessages.pt_PT,
        virtual: virtualMessages.pt_PT,
        limit: limitMessages.pt_PT,
        backup: backupMessages.pt_PT,
        locale: localeMessages.pt_PT,
        meta: metaMessages.pt_PT,
    },
}

export default _default