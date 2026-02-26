/**
 * Lunar Calendar Converter (Simplified)
 * Converts common Solar dates to approximate Lunar dates and vice versa.
 * This is a simplified implementation for demo purposes.
 */

const LUNAR_MONTHS = [
    'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư',
    'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
    'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'
];

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Get the Can-Chi (Heavenly Stem - Earthly Branch) name for a given year
 */
export function getCanChi(year) {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

/**
 * Get the zodiac animal for a given year
 */
export function getZodiac(year) {
    const animals = ['🐀 Tý', '🐂 Sửu', '🐅 Dần', '🐇 Mão', '🐉 Thìn', '🐍 Tỵ',
        '🐴 Ngọ', '🐑 Mùi', '🐒 Thân', '🐓 Dậu', '🐕 Tuất', '🐷 Hợi'];
    return animals[(year + 8) % 12];
}

/**
 * Simplified Solar-to-Lunar approximation
 * For demo: offsets the date by ~1 month (rough approximation)
 * In production, use a proper lunar calendar library
 */
export function solarToLunarApprox(day, month, year) {
    // This is a simplified approximation
    // Lunar date is typically 1-2 months behind solar
    let lunarMonth = month - 1;
    let lunarDay = day;
    let lunarYear = year;

    if (lunarMonth <= 0) {
        lunarMonth += 12;
        lunarYear -= 1;
    }

    return {
        day: lunarDay,
        month: lunarMonth,
        year: lunarYear,
        monthName: LUNAR_MONTHS[lunarMonth - 1],
        canChi: getCanChi(lunarYear),
        formatted: `${lunarDay}/${lunarMonth} Âm lịch (${getCanChi(lunarYear)})`
    };
}

/**
 * Calculate days remaining until a given lunar date's next occurrence
 */
export function daysUntilLunar(lunarDay, lunarMonth) {
    const today = new Date();
    // Approximate: lunar date ≈ solar date + 1 month
    const targetMonth = lunarMonth + 1;
    const currentYear = today.getFullYear();

    let target = new Date(currentYear, targetMonth - 1, lunarDay);
    if (target < today) {
        target = new Date(currentYear + 1, targetMonth - 1, lunarDay);
    }

    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format a solar date string to include lunar approximation
 */
export function formatWithLunar(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length < 3) return dateStr;

    const [day, month, year] = parts.map(Number);
    const lunar = solarToLunarApprox(day, month, year);

    return `${dateStr} (${lunar.formatted})`;
}
