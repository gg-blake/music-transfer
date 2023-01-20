import type { NextApiRequest, NextApiResponse } from 'next';
import SFTPClient from '../../utils/sftp';

const CLIENT_PWD = 'freemusic123';



export default async function (req: NextApiRequest, res: NextApiResponse) {
    let user: string = req.headers.user;
    let addr: string = req.headers.addr;

    let sftpClient = new SFTPClient();
    await sftpClient.connect({ host: addr, port: 22, username: user, password: CLIENT_PWD });
    let response = await sftpClient.listFiles('/home/' + user, '*');
    async function get(item: any) {
        if (item.name[0] === '.') {
            return;
        }
    
        if (item.type === 'd') {
            let files = await sftpClient.listFiles(item.name, '*');
            let resFiles: any = await Promise.all(files.map(async (i: any) => {
                return get(i);
            }))
            return resFiles;
        }
        
        return item;
    }

    let files = await Promise.all(response.map((item: any) => {
        return get(item);
    }));
    res.status(200).json({files: files});
}