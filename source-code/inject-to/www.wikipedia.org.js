/* •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */
/* Right here, you have access to the `injector` global object. */
/* So you can inject unlimited codes using: ••••••••••••••••••• */
/* injector.injectInlineJs(); ••••••••••••••••••••••••••••••••• */
/* injector.injectExternalJs(); ••••••••••••••••••••••••••••••• */
/* injector.injectInternalCss(); •••••••••••••••••••••••••••••• */
/* injector.injectExternalCss(); •••••••••••••••••••••••••••••• */
/* Anyway it's OPTIONAL, you can also define your logic. •••••• */
/* •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */
alert('I don\'t want to use `injector` global object! ⛔');

alert(`😎😎😎😎😎😎😎😎😎😎
😎😎This is just an alert!😎😎
😎😎😎😎😎😎😎😎😎😎`);

injector.injectInlineJs(`
alert('Now I want to use \`injector\` global object! ✅');

alert(\`🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳
🥳🥳This is just an alert!🥳🥳
🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳\`);
`);
