let Client = require('ssh2-sftp-client');

export default class SFTPClient {
    client: any;

  constructor() {
    this.client = new Client();
  }

  async connect(options: any) {
    console.log(`Connecting to ${options.host}:${options.port}`);
    try {
      await this.client.connect(options);
      return {message: 'Connected'};
    } catch (err) {
      return {message: 'Failed to connect', error: err};
    }
  }

  async disconnect() {
    await this.client.end();
  }

  async listFiles(remoteDir: any, fileGlob: any) {
    console.log(`Listing ${remoteDir} ...`);
    let fileObjects;
    try {
      fileObjects = await this.client.list(remoteDir, fileGlob);
    } catch (err) {
      console.log('Listing failed:', err);
    }

    const fileNames = [];

    for (const file of fileObjects) {
      fileNames.push(file);
    }

    return fileNames;
  }

  async getFlacDuration(remoteDir: string, options: any) {
    this.client.connect({
      host: options.host,
      port: 22,
      username: options.username,
      password: options.password
    })
    .then(() => {
      return this.client.get(remoteDir);
    })
    .then((stream: any) => {})
  }

}