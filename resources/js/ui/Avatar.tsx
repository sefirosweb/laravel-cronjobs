const palette: Array<[string, string]> = [
    ['#27272a', 'white'],
    ['#3f3f46', 'white'],
    ['#4f46e5', 'white'],
    ['#0891b2', 'white'],
    ['#059669', 'white'],
    ['#d97706', 'white'],
    ['#dc2626', 'white'],
    ['#9333ea', 'white'],
    ['#0284c7', 'white'],
];

interface AvatarProps {
    name?: string;
    size?: number;
}

export const Avatar = ({ name = '', size = 30 }: AvatarProps) => {
    const initials =
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((s) => s[0])
            .join('')
            .toUpperCase() || '·';
    const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
    const [bg, fg] = palette[hash % palette.length];
    return (
        <span
            className="avatar"
            style={{
                background: bg,
                color: fg,
                width: size,
                height: size,
                fontSize: Math.round(size * 0.36),
            }}
        >
            {initials}
        </span>
    );
};
