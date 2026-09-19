//#region src/blocks/options.fakes.d.ts
declare const optionsBase: {
  access: "public";
  description: string;
  directory: string;
  documentation: {
    readme: {
      usage: string;
    };
  };
  email: {
    github: string;
    npm: string;
  };
  emoji: string;
  node: {
    minimum: string;
  };
  owner: string;
  preset: string;
  repository: string;
  title: string;
};
//#endregion
export { optionsBase };