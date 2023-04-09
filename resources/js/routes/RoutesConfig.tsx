import React from "react";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { useGetQueryClient } from "@sefirosweb/react-crud";
import RoutesPages from "./RoutesPages";

export default () => {
    const queryClient = useGetQueryClient();

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <RoutesPages />
            </QueryClientProvider>
        </BrowserRouter>
    );
}