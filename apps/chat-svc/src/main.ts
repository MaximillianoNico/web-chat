import APIBootstrap from './app/infrastructure/webserver/server';

const start = async () => {
  try {
    APIBootstrap.createServer();

  } catch (err) {

    console.log(err);
    process.exit(1);
  }
}

start();
