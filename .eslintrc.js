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
    "__WIDGET_SCRIPT_URL": true,
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
    },
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  },
  rules: {
    "jsx-a11y/no-static-element-interactions": "off", // we are suppressing those everywhere anyway
    "jsx-a11y/label-has-for": ["warn", {
      "required": {
        "every": ["nesting"]
      },
      "allowChildren": true,
    }],
    'no-nested-ternary': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 1,
    'import/order': 1,
    'import/prefer-default-export': 0,
    "flowtype/define-flow-type": 1,
  }
}
