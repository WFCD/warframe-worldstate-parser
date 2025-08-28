import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['main.ts', 'lib/**/*.ts'],
  copy: ['./resources'],
  dts: true,
});
