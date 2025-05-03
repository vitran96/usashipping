# Web scraping tool

## Goal

Srap USA supermarket catalog and save it to sqlite DB.

List of supermarkets:
* [Walmart](https://www.walmart.com/) - HIGHEST PRIORITY
* [Target](https://www.target.com/) - HIGHEST PRIORITY
* [Costco](https://www.costco.com/) - HIGHEST PRIORITY
* [Whole Foods](https://www.wholefoodsmarket.com/)
* [Trader Joe's](https://www.traderjoes.com/)
* [Safeway](https://www.safeway.com/)
* [Albertsons](https://www.albertsons.com/)
* [Publix](https://www.publix.com/)
* [Meijer](https://www.meijer.com/)
* [H-E-B](https://www.heb.com/)
* [Food Lion](https://www.foodlion.com/)
* [ShopRite](https://www.shoprite.com/)
* [Hy-Vee](https://www.hy-vee.com/)
* [WinCo Foods](https://www.wincofoods.com/)
* [ALDI](https://www.aldi.com/)

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

### axios
**Purpose**: Promise-based HTTP client for making requests.

**Usage Example**:
```typescript
import axios from 'axios';

// Making a GET request
async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    console.log('Status Code:', response.status);
    console.log('Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Making a POST request
async function postData(url: string, data: any) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Status:', response.status);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

// Using axios with custom configuration
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

// Using the custom instance
api.get('/endpoint').then(response => {
  console.log(response.data);
});
```

### node-html-parser
**Purpose**: Fast HTML parser with a simple DOM API.

**Usage Example**:
```typescript
import { parse } from 'node-html-parser';

// Parse HTML from a string
const html = '<div><h1>Title</h1><p>Paragraph</p></div>';
const root = parse(html);

// Query elements
const h1 = root.querySelector('h1');
console.log('H1 text:', h1?.text); // Output: Title

// Find elements by tag name
const paragraphs = root.querySelectorAll('p');
paragraphs.forEach(p => {
  console.log('Paragraph text:', p.text);
});

// Access attributes
const div = root.querySelector('div');
div?.setAttribute('class', 'container');
console.log('Div HTML:', div?.toString());

// Manipulate content
if (h1) {
  h1.set_content('New Title');
  console.log('Updated H1:', h1.text); // Output: New Title
}

// Extract all links from a page
const htmlWithLinks = '<a href="https://example.com">Example</a><a href="https://test.com">Test</a>';
const rootWithLinks = parse(htmlWithLinks);
const links = rootWithLinks.querySelectorAll('a');
const urls = links.map(link => link.getAttribute('href'));
console.log('URLs:', urls); // Output: ['https://example.com', 'https://test.com']
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

## Web Scraping Example

Here's an example showing how to use axios and node-html-parser together for web scraping:

```typescript
import axios from 'axios';
import { parse } from 'node-html-parser';
import chalk from 'chalk';
import { Spinner } from 'clui';
import inquirer from 'inquirer';

async function scrapeWebsite(url: string) {
  // Create spinner for loading indication
  const spinner = new Spinner(`Fetching data from ${url}...`);
  spinner.start();
  
  try {
    // Fetch HTML content from the URL
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    spinner.stop();
    console.log(chalk.green('✓') + ' Data fetched successfully!');
    
    // Parse the HTML
    const root = parse(response.data);
    
    // Example: Extract all headlines from a news site
    const headlines = root.querySelectorAll('h2.headline').map(el => el.text.trim());
    
    console.log(chalk.yellow('\nHeadlines found:'));
    headlines.forEach((headline, index) => {
      console.log(chalk.cyan(`${index + 1}. ${headline}`));
    });
    
    // Ask user if they want to save the data
    const { save } = await inquirer.prompt({
      type: 'confirm',
      name: 'save',
      message: 'Do you want to save these headlines to a file?',
      default: false
    });
    
    if (save) {
      // Here you could implement saving to a file
      console.log(chalk.green('Headlines saved successfully!'));
    }
    
    return headlines;
  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error:'), error.message);
    throw error;
  }
}

// Usage example
// scrapeWebsite('https://news-example.com');
```