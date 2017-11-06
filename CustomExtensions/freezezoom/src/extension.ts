'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function RestoreZoom() {
    let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("freezeZoom");
    let windowConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("");

    let desiredZoomLevel = config.get("level", 0);

    vscode.workspace.getConfiguration('').update('window.zoomLevel', desiredZoomLevel, true)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    RestoreZoom();
    var disposable = vscode.commands.registerCommand('extension.restoreZoom', () => {
        RestoreZoom();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
