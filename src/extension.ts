import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
'use strict';

export function activate(context: vscode.ExtensionContext) {


    let disposable = vscode.commands.registerCommand('extension.generatePyFiles', (fileObj) => {

        if (!fileObj) {
            console.log('not a file object');
            return;
        }

        if (!fs.lstatSync(fileObj.path).isDirectory()) {
            console.log('not a path');
            return;
        }

        let basePath = fileObj.path;
        let generators: Array<any> | null | undefined = vscode.workspace.getConfiguration('pyfilesgen').get('generators');


        let generatorsList = [{
            label: "Python modules",
            files: null
        }];

        if (generators) {
            for (let gen of generators) {
                if ('label' in gen && 'files' in gen && gen.label != null && gen.files instanceof Array) {
                    generatorsList.push(gen);
                }
            } 
        }

        vscode.window.showQuickPick(generatorsList)
            .then((value: any | undefined) => {
                if (value === undefined) {
                    return;
                }
                if (!value.files) {
                    vscode.window.showInputBox({
                        prompt: 'Enter the path you want to create',
                        validateInput: (value) => {
                            if (value) {
                                return null;
                            }
                            return 'Please enter a path';
                        }
                    }).then((subPath: string|undefined) => {
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
                }
                if (value.files && value.files instanceof Array) {
                    for (let filename of value.files) {
                        let fullPath = path.join(basePath, filename);
                        fs.closeSync(fs.openSync(fullPath, 'w'));
                    }
                }
            });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}