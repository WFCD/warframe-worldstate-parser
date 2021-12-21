import { createRequire } from 'module';

const req = createRequire(import.meta.url);
const mdConfig = req('../data/markdown.json');

export default mdConfig;
