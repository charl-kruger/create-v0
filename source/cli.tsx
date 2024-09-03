#!/usr/bin/env node
import React from 'react';
import { render, Text } from 'ink';
import meow from 'meow';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import App from './app.js';
import Spinner from 'ink-spinner';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cli = meow(
	`
	Usage
	  $ create-v0 [app-name]

	Examples
	  $ create-v0 my-app
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

const appName = cli.flags.name || cli.input[0] || 'v0';

const targetDir = path.join(process.cwd(), appName);
fs.ensureDirSync(targetDir);

const CopyingMessage = () => (
	<React.Fragment>
		<Spinner type="dots" />
		<Text> Creating project..</Text>
	</React.Fragment>
);

render(<CopyingMessage />);

fs.copySync(path.join(__dirname, './template'), targetDir);

const InstallingMessage = () => (
	<React.Fragment>
		<Spinner type="dots" />
		<Text> Installing dependencies..</Text>
	</React.Fragment>
);

render(<InstallingMessage />);

try {
	process.chdir(targetDir);
	execSync('npm install', { stdio: 'inherit' });
} catch (error) {
	console.error('Failed to install dependencies:', error);
}

render(<App name={appName} targetDir={targetDir} />);
