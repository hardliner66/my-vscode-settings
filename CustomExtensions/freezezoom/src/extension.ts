'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

var temporary_disabled = false

function RestoreZoom() {
    let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("freezeZoom")
    if (config.get("enabled", true) && !temporary_disabled) {
        let windowConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("")

        let desiredZoomLevel = config.get("level", 0)

        if (desiredZoomLevel !== vscode.workspace.getConfiguration('').get('window.zoomLevel', 0)) {
            vscode.workspace.getConfiguration('').update('window.zoomLevel', desiredZoomLevel, true)
        }
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    temporary_disabled = false
    RestoreZoom()
    var disposable = vscode.commands.registerCommand('extension.restoreZoom', () => {
        RestoreZoom()
    })

    var disposable = vscode.commands.registerCommand('extension.temporaryDisableFreezeZoom', () => {
        temporary_disabled = true
    })

    var disposable = vscode.commands.registerCommand('extension.reenableFreezeZoom', () => {
        temporary_disabled = false
        RestoreZoom()
    })

    vscode.workspace.onDidChangeConfiguration((e) => {
        RestoreZoom()
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
}
