import { exec } from 'child_process';
import axios from 'axios';

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

const checkBackendHealth = async () => {
  try {
    await axios.get('http://localhost:3003/ping');
    return true;
  } catch (error) {
    return false;
  }
};

const startFrontend = () => {
  return new Promise((resolve, reject) => {
    const frontend = exec('npm install && npm run dev');

    frontend.stdout.on('data', (data) => {
      console.log(`Frontend: ${data}`);
      if (data.includes('Local:')) {
        resolve();
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
    await startFrontend();
    console.log('Frontend started successfully.');
  } catch (error) {
    console.error('Failed to start services:', error);
  }
};

init();