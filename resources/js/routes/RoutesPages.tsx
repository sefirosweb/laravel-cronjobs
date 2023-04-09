import React from 'react'
import { Routes, Route } from "react-router-dom";

import { APP_PREFIX } from "@/types/configurationType";
import { Cronjob } from "@/pages/Cronjob";
import { Queue } from "@/pages/Queue";
import { NotFound } from "@/pages/NotFound";
import Layout from '@/pages/layout/Layout';

export default () => {
    return (
        <Routes>
            <Route path={`${APP_PREFIX}/`} element={<Layout />}>
                <Route index element={<Cronjob />} />
                <Route path={`queue`} element={<Queue />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}