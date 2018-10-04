import * as nock from "nock";
export interface Options {
  /** The directory where fixtures will be stored. Defaults to {test-directory}/__nock-fixtures__ */
  fixturePath?: string;
  /**
   * Nock Back Mode, defaults to 'record'
   * Nock docs: https://github.com/node-nock/nock#modes
   * - wild: all requests go out to the internet, don't replay anything, doesn't record anything
   * - dryrun: The default, use recorded nocks, allow http calls, doesn't record anything, useful
   *   for writing new tests
   * - record: use recorded nocks, record new nocks
   * - lockdown: use recorded nocks, disables all http calls even when not nocked, doesn't record
   **/
  afterRecord?: any;
  mode?: nock.NockBackMode;
}
export declare function setupRecorder(
  options?: Options
): (
  fixtureName: string,
  options?: nock.NockBackOptions
) => Promise<{
  assertScopesFinished: any;
  scopes: nock.Scope[];
  isLoaded: boolean;
  completeRecording: () => void;
}>;
export interface NockBackContext {
  scopes: nock.Scope[];
  assertScopesFinished(): void;
  isLoaded: boolean;
}
