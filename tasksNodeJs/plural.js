export function plural(count, one, few, many) {
    const prefix = count + " ";
    count = Math.abs(count)
    if (count > 9 && count < 21) {
        return prefix + many
    }
    if (count % 10 === 1) {
        return prefix + one
    }
    if (count % 10 > 1 && count % 10 < 5) {
        return prefix + few
    }
    return prefix + many
}