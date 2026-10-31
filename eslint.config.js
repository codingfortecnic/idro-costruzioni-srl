import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
export default tseslint.config({ignores:['dist/**','.prerender/**','node_modules/**','.npm-cache/**']},js.configs.recommended,...tseslint.configs.recommended,{files:['src/**/*.{ts,tsx}'],languageOptions:{globals:globals.browser},plugins:{'react-hooks':hooks},rules:{...hooks.configs.recommended.rules}},{files:['scripts/*.mjs','*.js','*.ts'],languageOptions:{globals:globals.node}});
