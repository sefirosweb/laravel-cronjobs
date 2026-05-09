import { ReactNode, SVGProps } from 'react';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
    stroke?: number;
}

const Base = ({
    children,
    size = 16,
    stroke = 1.75,
    ...rest
}: IconProps & { children: ReactNode }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        {...rest}
    >
        {children}
    </svg>
);

export const IconUsers = (p: IconProps) => (
    <Base {...p}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Base>
);

export const IconShield = (p: IconProps) => (
    <Base {...p}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </Base>
);

export const IconKey = (p: IconProps) => (
    <Base {...p}>
        <path d="m21 2-9.6 9.6" />
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </Base>
);

export const IconPlus = (p: IconProps) => (
    <Base {...p}>
        <path d="M5 12h14" />
        <path d="M12 5v14" />
    </Base>
);

export const IconSearch = (p: IconProps) => (
    <Base {...p}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </Base>
);

export const IconPencil = (p: IconProps) => (
    <Base {...p}>
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
    </Base>
);

export const IconTrash = (p: IconProps) => (
    <Base {...p}>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </Base>
);

export const IconX = (p: IconProps) => (
    <Base {...p}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </Base>
);

export const IconCheck = (p: IconProps) => (
    <Base {...p}>
        <path d="M20 6 9 17l-5-5" />
    </Base>
);

export const IconChevronLeft = (p: IconProps) => (
    <Base {...p}>
        <path d="m15 18-6-6 6-6" />
    </Base>
);

export const IconChevronRight = (p: IconProps) => (
    <Base {...p}>
        <path d="m9 18 6-6-6-6" />
    </Base>
);

export const IconChevronDown = (p: IconProps) => (
    <Base {...p}>
        <path d="m6 9 6 6 6-6" />
    </Base>
);

export const IconChevronsLeft = (p: IconProps) => (
    <Base {...p}>
        <path d="m11 17-5-5 5-5" />
        <path d="m18 17-5-5 5-5" />
    </Base>
);

export const IconChevronsRight = (p: IconProps) => (
    <Base {...p}>
        <path d="m6 17 5-5-5-5" />
        <path d="m13 17 5-5-5-5" />
    </Base>
);

export const IconAlertTriangle = (p: IconProps) => (
    <Base {...p}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
    </Base>
);

export const IconLink = (p: IconProps) => (
    <Base {...p}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Base>
);

export const IconMail = (p: IconProps) => (
    <Base {...p}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Base>
);

export const IconLock = (p: IconProps) => (
    <Base {...p}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Base>
);

export const IconRefresh = (p: IconProps) => (
    <Base {...p}>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
    </Base>
);

export const IconSettings = (p: IconProps) => (
    <Base {...p}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2" />
        <circle cx="12" cy="12" r="3" />
    </Base>
);

export const IconPlay = (p: IconProps) => (
    <Base {...p}>
        <polygon points="6 3 20 12 6 21 6 3" />
    </Base>
);

export const IconPower = (p: IconProps) => (
    <Base {...p}>
        <path d="M12 2v10" />
        <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </Base>
);

export const IconClock = (p: IconProps) => (
    <Base {...p}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </Base>
);

export const IconLogo = ({ size = 22, ...rest }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...rest}
    >
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#09090b" />
        <path
            d="M8 16V9a4 4 0 0 1 8 0v7M8 13h8"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
        />
    </svg>
);
