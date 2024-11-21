export const getTrustedTypePolicy = () => {
  if (!window?.horsy || !window.horsy?.trsutedTypePolicy) {
    window.horsy = {
      trsutedTypePolicy: window.trustedTypes?.createPolicy("default", {
        createScriptURL: (url: string) => url,
        createHTML: (input, ...args) => input,
      }),
    };
  }

  return window.horsy.trsutedTypePolicy;
};
