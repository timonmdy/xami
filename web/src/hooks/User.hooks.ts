import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllKeys } from "../config/Settings.config";
import {
    deleteUserNotification,
    getAllUserNotifications,
    getSetting,
    markAllUserNotificationsAsSeen,
    markUserNotificationAsSeen,
    updateSetting,
} from "../service/User.service";
import { UserNotification, UserSettingKey } from "../types/User.types";

/**
 * Fetches all notifications and related data for the authenticated user.
 *
 * @param enableQuery Whether to enable the query (only enable when authenticated)
 * @returns notifications and query data
 */
export const useNotifications = (enableQuery: boolean) => {
    const queryClient = useQueryClient();

    const { data, refetch } = useQuery<UserNotification[]>({
        queryKey: ["notifications"],
        queryFn: getAllUserNotifications,
        enabled: enableQuery
    });

    const markSeen = useMutation({
        mutationFn: (id: number) => markUserNotificationAsSeen(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    const markAllSeen = useMutation({
        mutationFn: markAllUserNotificationsAsSeen,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    const deleteNotification = useMutation({
        mutationFn: (id: number) => deleteUserNotification(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    return {
        notifications: data || [],
        refetch,
        markSeen,
        markAllSeen,
        deleteNotification,
    };
};
/**
 * useSettings
 *
 * - Loads all settings on mount via getSetting()
 * - Keeps a "committed" snapshot (what's on the server) and a "draft" (local edits)
 * - Does NOT auto-save — call save() explicitly
 * - isDirty: whether the current draft differs from the committed snapshot
 * - Exports discard() to revert draft to committed
 */
const useSettings = () => {
    const defaults = React.useMemo(() => {
        const allKeys = getAllKeys();
        const result: Record<string, any> = {};
        allKeys.forEach((key) => {
            result[key] = undefined;
        });
        return result;
    }, []);

    /** Values confirmed saved on the server */
    const [committed, setCommitted] = React.useState<Record<string, any>>(defaults);
    /** Working copy the user is editing */
    const [draft, setDraft] = React.useState<Record<string, any>>(defaults);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [saveError, setSaveError] = React.useState<string | null>(null);

    // Load on mount
    React.useEffect(() => {
        const load = async () => {
            setLoading(true);
            const keys = getAllKeys();
            const results = await Promise.allSettled(keys.map((k) => getSetting(k)));
            const loaded = { ...defaults };
            results.forEach((res, i) => {
                if (res.status === "fulfilled" && res.value?.persisted) {
                    loaded[keys[i]] = res.value.value;
                }
            });
            setCommitted(loaded);
            setDraft(loaded);
            setLoading(false);
        };
        load();
    }, []);

    /** True when draft has any key different from committed */
    const isDirty = React.useMemo(
        () => Object.keys(draft).some((k) => JSON.stringify(draft[k]) !== JSON.stringify(committed[k])),
        [draft, committed]
    );

    /** Update a single key in the draft (does NOT save) */
    const updateDraft = React.useCallback((key: UserSettingKey, value: any) => {
        setDraft((prev) => ({ ...prev, [key]: value }));
        setSaveError(null);
    }, []);

    /** Persist all dirty keys to the server */
    const save = React.useCallback(async () => {
        if (!isDirty) return;
        setSaving(true);
        setSaveError(null);
        try {
            const keys = getAllKeys();
            const dirtyKeys = keys.filter(
                (k) => JSON.stringify(draft[k]) !== JSON.stringify(committed[k])
            );
            await Promise.all(dirtyKeys.map((k) => updateSetting({ key: k, value: draft[k] })));
            setCommitted({ ...draft });
        } catch (err: any) {
            setSaveError(err?.message ?? "Failed to save settings.");
        } finally {
            setSaving(false);
        }
    }, [draft, committed, isDirty]);

    /** Discard all unsaved changes */
    const discard = React.useCallback(() => {
        setDraft({ ...committed });
        setSaveError(null);
    }, [committed]);

    return { draft, loading, saving, saveError, isDirty, updateDraft, save, discard };
};

export default useSettings;