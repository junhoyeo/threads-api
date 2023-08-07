const dateTimeFormat = Intl.DateTimeFormat().resolvedOptions();

export const defaultTimeZoneOffset = String(new Date().getTimezoneOffset() * -60);
export const defaultTimeZoneName = dateTimeFormat.timeZone;
export const defaultLocale = dateTimeFormat.locale;
