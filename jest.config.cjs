module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "json", "vue", "ts", "tsx"],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest',
        '.*\\.(ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/ts/$1'
    },
}
