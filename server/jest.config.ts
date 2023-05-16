import type {Config} from 'jest';

const config: Config = {
    automock: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!vendor/**/*.{js,jsx}"
    ],
    coverageProvider: "babel",
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        }
    },
    maxConcurrency: 5,
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true
}

export default config;