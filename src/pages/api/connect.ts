import type { NextApiRequest, NextApiResponse } from 'next';
import SFTPClient from '../../utils/sftp';

const CLIENT_PWD = 'freemusic123';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let user: string = req.headers.user;
    let addr: string = req.headers.addr;

    let sftpClient = new SFTPClient();
    let response = await sftpClient.connect({ host: addr, port: 22, username: user, password: CLIENT_PWD });
    console.log(response.message);
    res.status(200).json(response);
}