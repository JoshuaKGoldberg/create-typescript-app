//#region src/blocks/phases.d.ts
declare const CommandPhase: {
  readonly Migrations: 0;
  readonly Install: 1;
  readonly Build: 2;
  readonly Process: 3;
  readonly Format: 4;
};
//#endregion
export { CommandPhase };