"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const nock = require("nock");
const stackTrace = require("stack-trace");
function parentPath() {
    const trace = stackTrace.get();
    const currentFile = trace.shift().getFileName();
    const parentFile = trace
        .find(t => t.getFileName() !== currentFile)
        .getFileName();
    return path_1.dirname(parentFile);
}
function setupRecorder(options = {}) {
    const nockBack = nock.back;
    const fixturePath = options.fixturePath || path_1.join(parentPath(), "__nock-fixtures__");
    nockBack.fixtures = fixturePath;
    nockBack.setMode(options.mode || "record");
    return (fixtureName, options = {}) => nockBack(`${fixtureName}.json`, options).then(({ nockDone, context }) => (Object.assign({ completeRecording: nockDone }, context, { assertScopesFinished: context.assertScopesFinished.bind(context) })));
}
exports.setupRecorder = setupRecorder;
