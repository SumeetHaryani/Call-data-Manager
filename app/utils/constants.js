export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// API CONSTANTS
export const BASE_API_URL = 'https://damp-garden-93707.herokuapp.com';
export const CALL_LIST_API_URL = `${BASE_API_URL}/getcalllist`;
export const LABEL_LIST_API_URL = `${BASE_API_URL}/getlistoflabels`;
export const APPLY_LABELS_API_URL = `${BASE_API_URL}/applyLabels`;
export const AGENTS_API_URL = `${BASE_API_URL}/getlistofagents`;
export const DURATION_RANGE_API_URL = `${BASE_API_URL}/getdurationrange`;
export const FILTERED_CALLS_API_URL = `${BASE_API_URL}/getfilteredcalls`;
