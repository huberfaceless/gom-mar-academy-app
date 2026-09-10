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

const academyLocalizationGroups = [
  { key: '1-20', from: 1, to: 20 },
  { key: '21-40', from: 21, to: 40 },
  { key: '41-60', from: 41, to: 60 },
  { key: '61-80', from: 61, to: 80 },
  { key: '81-99', from: 81, to: 99 },
] as const;

const academyLocalizationModules = (['en', 'pl'] as const).flatMap((language) => (
  academyLocalizationGroups.map((group) => ({
    ...group,
    language,
    id: `virtual:academy-localization-${language}-${group.key}`,
  }))
));

const createAcademyLocalizationModule = (language: 'en' | 'pl', from: number, to: number) => {
  const patches = academyLocalizationFiles.flatMap((filename) => {
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

    if (!ts.isObjectLiteralExpression(languageProperty.initializer)) {
      throw new Error(`Sprachfassung ${language} in ${filename} ist kein Etappenobjekt.`);
    }

    return languageProperty.initializer.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return [];
      const name = property.name;
      if (!ts.isIdentifier(name) && !ts.isStringLiteral(name) && !ts.isNumericLiteral(name)) return [];
      const stageId = Number(name.text);
      return Number.isInteger(stageId) && stageId >= from && stageId <= to
        ? [property.getText(sourceFile)]
        : [];
    });
  });

  return `export default {${patches.join(',\n')}};`;
};

const academyLocalizationPlugin = () => ({
  name: 'academy-localization-by-stage-group',
  resolveId(id: string) {
    if (academyLocalizationModules.some((module) => module.id === id)) return `\0${id}`;
    return null;
  },
  load(id: string) {
    const localizationModule = academyLocalizationModules.find((module) => id === `\0${module.id}`);
    if (!localizationModule) return null;
    for (const filename of academyLocalizationFiles) {
      this.addWatchFile(path.resolve(__dirname, 'src/i18n', filename));
    }
    return createAcademyLocalizationModule(
      localizationModule.language,
      localizationModule.from,
      localizationModule.to,
    );
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
