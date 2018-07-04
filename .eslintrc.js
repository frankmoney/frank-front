module.exports = {
  "root": true,
  "extends": 'frank',
  globals: {
    preval: false,
    "__CLIENT": true,
    "__SERVER": true,
    "__PUBLIC_PATH": true,
    "__API_URL": true,
    "__GRAPHQL_URL": true,
    "__WS_URL": true,
  },
  plugins: ['flowtype', 'import'],
  "settings": {
    "import/resolver": {
      "babel-module": {
        "root": ["./src"],
        "extensions": [".js", ".jsx"],
        "alias": {
          "test": "./test"
        }
      }
    }
  },
  rules: {
    "jsx-a11y/no-static-element-interactions": "warn",
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 1,
    'import/order': 1,
  }
}
