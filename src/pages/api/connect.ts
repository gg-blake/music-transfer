import type { NextApiRequest, NextApiResponse } from 'next'

let Client = require('ssh2-sftp-client');

const CLIENT_PWD = 'freemusic123';

class SFTPClient {
    client: any;

  constructor() {
    this.client = new Client();
  }

  async connect(options: any) {
    console.log(`Connecting to ${options.host}:${options.port}`);
    try {
      await this.client.connect(options);
    } catch (err) {
      console.log('Failed to connect:', err);
    }
  }

  async disconnect() {
    await this.client.end();
  }

}

export default function (req: NextApiRequest, res: NextApiResponse) {
    let user: string = req.headers.user;
    let addr: string = req.headers.addr;

    let sftpClient = new SFTPClient();
    sftpClient.connect({ host: addr, port: 22, username: user, password: CLIENT_PWD });

    console.log(user, addr);

    res.status(200).json({ name: 'John Doe' });
}