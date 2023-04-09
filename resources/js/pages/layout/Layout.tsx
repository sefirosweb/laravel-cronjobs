import React from 'react'
import Navbar from '@/pages/layout/Navbar';
import { Outlet } from 'react-router-dom';

export default () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <>{<Outlet />}</>
            </div>
        </>
    );
}

