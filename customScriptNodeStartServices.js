import {exec} from 'child_process';
import axios from 'axios';

const checkBackendHealth = async () => {
  try {
    await axios.get('http://localhost:3003/ping');
    return true;
  } catch (error) {
    return false;
  }
};

const openBrowser = (url) => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`);
      console.log(`Identified macOS opening ${url}`)
      break;
    case 'win32':
      exec(`start ${url}`);
      console.log(`Identified Windows opening ${url}`)
      break;
    default:
      exec(`xdg-open ${url}`);
      console.log(`Identified Linux opening ${url}`)
  }
};

const startBackend = () => {
  return new Promise((resolve, reject) => {
    const backend = exec('cd flightdiary-backend && npm install && npm run dev');

    backend.stdout.on('data', (data) => {
      console.log(`Backend: ${data}`);
      if (data.includes('Server running')) {
        resolve();
      }
    });

    backend.stderr.on('data', (data) => {
      console.error(`Backend Error: ${data}`);
      reject();
    });
  });
};

const startFrontend = () => {
  return new Promise((resolve, reject) => {
    let localUrl;
    const frontend = exec('npm install && npm run dev');

    frontend.stdout.on('data', (data) => {
      console.log(`Frontend: ${data}`);
      if (data.includes('Local:')) {
        localUrl = data.match(/http:\/\/[^\s]+/)[0]; // Extract URL from the console output
        resolve(localUrl);
      }
    });

    frontend.stderr.on('data', (data) => {
      console.error(`Frontend Error: ${data}`);
      reject();
    });
  });
};

const init = async () => {
  try {
    await startBackend();
    console.log('Backend started sucessfully.\nPing backend start:')
    let backendUp = false;
    while (!backendUp) {
      backendUp = await checkBackendHealth();
      if (!backendUp) {
        console.log('Waiting 2seconds for backend to start...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    const localUrl = await startFrontend();
    console.log('Frontend started successfully.');

    if (localUrl) {
      openBrowser(localUrl);
    }
  } catch (error) {
    console.error('Failed to start services:', error);
  }
};

init();