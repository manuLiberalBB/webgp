/** Min-height guard so landscape phones keep mobile layout despite wide viewports. */
export const LAYOUT_MD_MIN_HEIGHT = 600;
export const LAYOUT_LG_MIN_HEIGHT = 600;

/** Max height for short landscape phones (e.g. iPhone ~390px tall). */
export const SHORT_LANDSCAPE_MAX_HEIGHT = 500;

export const LAYOUT_MD_MEDIA_QUERY = `(min-width: 768px) and (min-height: ${LAYOUT_MD_MIN_HEIGHT}px)`;
export const LAYOUT_LG_MEDIA_QUERY = `(min-width: 1024px) and (min-height: ${LAYOUT_LG_MIN_HEIGHT}px)`;
export const SHORT_LANDSCAPE_MEDIA_QUERY = `(orientation: landscape) and (max-height: ${SHORT_LANDSCAPE_MAX_HEIGHT}px)`;
