import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['uk'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
declare module 'vue-i18n' {}

let i18n: any = null;
export default boot(({ app }) => {
  i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: 'uk',
    legacy: false,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
