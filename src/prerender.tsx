import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Site } from './main';
import { businessSchema } from './company';
export {pageMetadata} from './data/pageMetadata';
export {services} from './company';
export {siteImages} from './data/siteImages';
export function render(path:string){return renderToString(<MemoryRouter initialEntries={[path]}><Site/></MemoryRouter>)}
export const schema=businessSchema;
