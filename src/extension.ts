import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pymodule" is now active!');


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.generatePyModules', (fileObj) => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        let thenable = vscode.window.showInputBox({
            prompt: 'Enter the path you want to create',
            validateInput: (value) => {
                if (value) {
                    return null;
                }
                return 'Please enter a path';
            }
        });
        thenable.then((subPath: string|undefined) => {
            if (subPath === undefined) {
                return;
            }
            if (subPath.startsWith('/')) {
                subPath = subPath.slice(1);
            }
            if (subPath.endsWith('/')) {
                subPath = subPath.slice(-1);
            }
            const paths = [];
            const folders = subPath.split('/');
            let basePath = fileObj.path;
            for (const folder of folders) {
                const newPath = path.join(basePath, folder);
                paths.push(newPath);
                basePath = newPath;
            }
            for (const p of paths) {
                fs.mkdirSync(p);
                const initFile = path.join(p, '__init__.py');
                fs.closeSync(fs.openSync(initFile, 'w'));
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}