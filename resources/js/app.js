require('./bootstrap');

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from "@inertiajs/progress"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import "@fontsource/inter";

InertiaProgress.init();

createInertiaApp({
    title: title => `${title} - ${process.env.MIX_APP_NAME}`,
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(
            <ChakraProvider theme={theme}>
                <App {...props} />
            </ChakraProvider>,
            el
        );
    },
})
