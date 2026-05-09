interface Props {
    size?: number;
}

export const Spinner = ({ size = 12 }: Props) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="spinner"
        aria-label="loading"
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="40 60"
            strokeDashoffset="0"
        />
    </svg>
);
