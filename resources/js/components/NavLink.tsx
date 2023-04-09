import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export default (props: NavLinkProps) => {
    const activeStylee: React.CSSProperties = {
        textDecoration: "underline",
    };

    return (
        <>
            <NavLink
                {...props}
                className='nav-link'
                style={({ isActive }) => isActive ? activeStylee : undefined}
            />
        </>
    )
}