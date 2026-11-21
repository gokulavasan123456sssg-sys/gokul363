import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';

const repoUrl = 'https://github.com/gokulavasan123456sssg-sys/hi';
const dir = '.';

async function run() {
  try {
    const isRepo = fs.existsSync('./.git');
    if (!isRepo) {
      console.log('Initializing git repository...');
      await git.init({ fs, dir });
      console.log('Git initialized.');
    } else {
      console.log('Git repo already initialized.');
    }

    await git.setConfig({
      fs,
      dir,
      path: 'user.name',
      value: 'GOKULAVASAN'
    });
    await git.setConfig({
      fs,
      dir,
      path: 'user.email',
      value: 'gokulavasan123456sssg@gmail.com'
    });

    console.log('Staging files...');
    const files = await git.statusMatrix({ fs, dir });
    for (const [filepath, head, workdir, stage] of files) {
      if (workdir) {
        await git.add({ fs, dir, filepath });
      } else if (head && !workdir) {
        await git.remove({ fs, dir, filepath });
      }
    }
    console.log('Files staged.');

    const commitSha = await git.commit({
      fs,
      dir,
      author: {
        name: 'GOKULAVASAN',
        email: 'gokulavasan123456sssg@gmail.com'
      },
      message: 'Initial commit: Gokulavasan Cinematic Portfolio Website'
    });
    console.log('Committed SHA:', commitSha);

    console.log('Testing remote connection to', repoUrl);
    const info = await git.getRemoteInfo({
      http,
      url: repoUrl
    });
    console.log('Remote info:', info);

  } catch (err) {
    console.error('Git error:', err);
  }
}

run();
