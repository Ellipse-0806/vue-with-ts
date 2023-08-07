module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "json", "vue", "ts", "tsx"],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest',
        '.*\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/ts/$1',
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
    },
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
}
