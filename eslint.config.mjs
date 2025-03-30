import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
});

export default defineConfig([globalIgnores(["**/out", "public/static", ".next/**/*"]), {
    extends: compat.extends(
        "plugin:@next/next/recommended",
        "next/core-web-vitals",
        "next/typescript",
        "next",
        "prettier",
        "eslint:recommended",
        "plugin:react/recommended",
    ),

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
    },
},
    {
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    fallbackSort: { type: 'unsorted' },
                    ignoreCase: true,
                    specialCharacters: 'keep',
                    internalPattern: ['^~/.+'],
                    partitionByComment: false,
                    partitionByNewLine: false,
                    newlinesBetween: 'always',
                    maxLineLength: undefined,
                    groups: [
                        'type',
                        ['builtin', 'external'],
                        'internal-type',
                        'internal',
                        ['parent-type', 'sibling-type', 'index-type'],
                        ['parent', 'sibling', 'index'],
                        'object',
                        'unknown',
                    ],
                    customGroups: { type: {}, value: {} },
                    environment: 'node',
                },
            ],
        },
        settings: {
            perfectionist: {
                partitionByComment: true,
                type: 'line-length',
            },
        },
    },
]);