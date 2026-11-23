(function (global) {
    'use strict';

    const SUPABASE_URL = 'https://rnfwxphdzvonoiduidsg.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_kdXRnhVgTwsfgrrzO0ok8A_PZOKfHZK';
    const BASE_COLUMNS = [
        'subjectID', 'sessionID', 'experimentVersion', 'subName', 'subGender', 'subAge', 'subIdCard', 'subPhone',
        'block', 'trial', 'TrialGlobal', 'setSize', 'studyDuration', 'studyDurationActual',
        'isChange', 'experimentType', 'subGroup', 'Order',
        'rt', 'response', 'responseLabel', 'accuracy', 'correctResponse', 'correctResponseLabel',
        'TrialStatus', 'CountedInK', 'rndSeed', 'resumedFromBlock', 'resumeCount',
        'changeItem', 'origColorIdx', 'probeColorIdx', 'itemLocs', 'itemColors', 'labelMap'
    ];

    function stripToBaseColumns(row) {
        const out = {};
        for (const key of BASE_COLUMNS) if (row[key] !== undefined) out[key] = row[key];
        return out;
    }

    global.CLTStorageFactories = global.CLTStorageFactories || {};
    global.CLTStorageFactories.supabase = function createSupabaseStorage() {
        let client = null;
        return {
            async initialize() {
                if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') return;
                if (!global.supabase || typeof global.supabase.createClient !== 'function') {
                    throw new Error('Supabase JavaScript client is unavailable');
                }
                client = global.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
            },
            saveTrial() { return Promise.resolve(); },
            saveCheckpoint() { return Promise.resolve(); },
            loadProgress() { return Promise.resolve(null); },
            saveProgress() { return Promise.resolve(false); },
            clearProgress() { return Promise.resolve(false); },
            async saveFinalResult(payload) {
                const rows = payload && Array.isArray(payload.trials) ? payload.trials : [];
                if (!client) return { message: '本版本未配置服务器上传，仅生成本地 Excel。' };
                if (rows.length === 0) return { message: '没有正式实验数据需要上传。' };
                const { error } = await client.from('vwm_data').insert(rows);
                if (!error) return { message: '数据上传服务器成功。' };
                console.error('[CLT storage] Supabase full-row insert failed; retrying base columns:', error);
                const { error: retryError } = await client.from('vwm_data').insert(rows.map(stripToBaseColumns));
                if (retryError) throw retryError;
                return { message: '数据上传服务器成功（按基础字段）。' };
            },
            finishExperiment() { return Promise.resolve({ message: '' }); }
        };
    };
})(window);
