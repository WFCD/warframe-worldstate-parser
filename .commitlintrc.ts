import { RuleConfigSeverity } from '@commitlint/types';

export default {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'body-max-line-length': [
      RuleConfigSeverity.Disabled
    ],
    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['sentence-case', 'start-case']
    ]
  }
}
