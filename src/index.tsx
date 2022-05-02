import React from 'react';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import './index.css';
import Vivero from './Vivero';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Vivero/>
    </React.StrictMode>
);
