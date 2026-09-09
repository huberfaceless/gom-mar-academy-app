import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import ts from 'typescript';
import {defineConfig} from 'vite';

const academyLocalizationFiles = [
  'academyLocalization.ts',
  ...Array.from({ length: 19 }, (_, index) => `academyLocalization${index + 81}.ts`),
];

const academyLocalizationModuleIds = {
  en: 'virtual:academy-localization-en',
  pl: 'virtual:academy-localization-pl',
} as const;

const createAcademyLocalizationModule = (language: keyof typeof academyLocalizationModuleIds) => {
  const patches = academyLocalizationFiles.map((filename) => {
    const filePath = path.resolve(__dirname, 'src/i18n', filename);
    const sourceText = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
    const translationDeclaration = sourceFile.statements
      .filter(ts.isVariableStatement)
      .flatMap((statement) => statement.declarationList.declarations)
      .find((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'translations');

    if (!translationDeclaration?.initializer || !ts.isObjectLiteralExpression(translationDeclaration.initializer)) {
      throw new Error(`Keine Academy-Übersetzungen in ${filename} gefunden.`);
    }

    const languageProperty = translationDeclaration.initializer.properties.find((property) => {
      if (!ts.isPropertyAssignment(property)) return false;
      const name = property.name;
      return (ts.isIdentifier(name) || ts.isStringLiteral(name)) && name.text === language;
    });

    if (!languageProperty || !ts.isPropertyAssignment(languageProperty)) {
      throw new Error(`Sprachfassung ${language} fehlt in ${filename}.`);
    }

    return languageProperty.initializer.getText(sourceFile);
  });

  return `export default Object.assign({}, ${patches.join(',\n')});`;
};

const academyLocalizationPlugin = () => ({
  name: 'academy-localization-by-language',
  resolveId(id: string) {
    if (id === academyLocalizationModuleIds.en || id === academyLocalizationModuleIds.pl) return `\0${id}`;
    return null;
  },
  load(id: string) {
    const language = Object.entries(academyLocalizationModuleIds)
      .find(([, moduleId]) => id === `\0${moduleId}`)?.[0] as keyof typeof academyLocalizationModuleIds | undefined;
    if (!language) return null;
    for (const filename of academyLocalizationFiles) {
      this.addWatchFile(path.resolve(__dirname, 'src/i18n', filename));
    }
    return createAcademyLocalizationModule(language);
  },
});

export default defineConfig(() => {
  return {
    plugins: [academyLocalizationPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/src/data/modules')) {
              return `academy-${path.basename(id, path.extname(id))}`;
            }
            if (id.includes('/src/data/academyData')) return 'academy-data';
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/@firebase/firestore/') || id.includes('/firebase/firestore/')) return 'firebase-firestore';
            if (id.includes('/@firebase/auth/') || id.includes('/firebase/auth/')) return 'firebase-auth';
            if (id.includes('/@firebase/') || id.includes('/firebase/')) return 'firebase-core';
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'react';
            if (id.includes('/lucide-react/')) return 'icons';
            if (id.includes('/motion/')) return 'motion';
            if (id.includes('/jszip/')) return 'archive';
            return 'vendor';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
