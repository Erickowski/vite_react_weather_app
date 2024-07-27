export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/router.tsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_WEATHER_API_KEY: "",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
};
