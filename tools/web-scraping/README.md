# CLI Application

A command-line application built with Node.js and TypeScript.

## Installation

```bash
npm install
```

## Running the Application

```bash
# Run in production mode
npm start

# Run in development mode (with auto-reload on file changes)
npm run start:dev
```

## Packages Used

### chalk
**Purpose**: Colorizes terminal output.

**Usage Example**:
```typescript
import chalk from 'chalk';

console.log(chalk.green('Success!')); // Prints "Success!" in green
console.log(chalk.bold.red('Error!')); // Prints "Error!" in bold red
console.log(chalk.blue.bgYellow('Highlighted')); // Blue text with yellow background
```

### clear
**Purpose**: Clears the terminal screen.

**Usage Example**:
```typescript
import clear from 'clear';

// Clear the terminal screen
clear();
```

### clui
**Purpose**: Draws command-line tables, gauges, and spinners.

**Usage Example**:
```typescript
import { CLI } from 'clui';
import { Spinner } from 'clui';

// Create a spinner
const spinner = new Spinner('Loading, please wait...');
spinner.start();

// Simulate a task
setTimeout(() => {
  spinner.stop();
  console.log('Task completed!');
}, 3000);

// Create a progress bar
const Line = CLI.Line;
const Gauge = CLI.Gauge;
const line = new Line()
  .padding(2)
  .column('Progress', 20)
  .column(Gauge(50, 100, 20), 40)
  .fill()
  .output();
```

### figlet
**Purpose**: Creates ASCII art from text.

**Usage Example**:
```typescript
import figlet from 'figlet';

// Display application name in ASCII art
console.log(figlet.textSync('CLI App', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}));
```

### inquirer
**Purpose**: Creates interactive command-line user interfaces for collecting input.

**Usage Example**:
```typescript
import inquirer from 'inquirer';

// Ask user for input
async function askQuestions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Create', 'Read', 'Update', 'Delete']
    },
    {
      type: 'checkbox',
      name: 'options',
      message: 'Select additional options:',
      choices: ['Option 1', 'Option 2', 'Option 3']
    }
  ]);
  
  console.log('Answers:', answers);
}

askQuestions();
```

### minimist
**Purpose**: Parses command-line arguments.

**Usage Example**:
```typescript
import minimist from 'minimist';

// Parse command line arguments
const argv = minimist(process.argv.slice(2));

console.log('Command arguments:', argv);
// Example: node dist/index.js --file=data.json --verbose
// Output: { _: [], file: 'data.json', verbose: true }

if (argv.file) {
  console.log(`File specified: ${argv.file}`);
}

if (argv.verbose) {
  console.log('Verbose mode enabled');
}
```

### configstore
**Purpose**: Easily loads and saves configuration data.

**Usage Example**:
```typescript
import Configstore from 'configstore';

// Create a config store for your application
const config = new Configstore('my-cli-app', {
  // Default values
  theme: 'dark',
  language: 'en',
  notifications: true
});

// Get a value
console.log(`Current theme: ${config.get('theme')}`);

// Set a value
config.set('theme', 'light');
console.log(`New theme: ${config.get('theme')}`);

// Delete a value
config.delete('notifications');

// Check if a value exists
if (config.has('language')) {
  console.log(`Language is set to: ${config.get('language')}`);
}
```

## Combining Multiple Packages

Here's an example that combines several packages:

```typescript
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { Spinner } from 'clui';
import inquirer from 'inquirer';
import Configstore from 'configstore';

// Initialize config
const config = new Configstore('my-cli-app', { theme: 'dark' });

// Clear terminal and show welcome message
clear();
console.log(
  chalk.yellow(
    figlet.textSync('My CLI App', { horizontalLayout: 'full' })
  )
);

// Interactive CLI workflow
async function main() {
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Start Process', 'View Settings', 'Exit']
  });
  
  if (answers.action === 'Start Process') {
    const spinner = new Spinner('Processing...');
    spinner.start();
    
    // Simulate process
    setTimeout(() => {
      spinner.stop();
      console.log(chalk.green('✓ Process completed successfully!'));
    }, 2000);
  } 
  else if (answers.action === 'View Settings') {
    console.log(chalk.cyan('Current Settings:'));
    console.log(chalk.cyan(`Theme: ${config.get('theme')}`));
  }
}

main();
```