import { File, FILE_TYPE } from './file-system';

const date = new Date().toLocaleDateString();

const disk: File = {
  type: FILE_TYPE.DIRECTORY,
  date,
  name: '~',
  content: [
    {
      type: FILE_TYPE.FILE,
      date,
      name: `${BLOG_INFO.BLOG_INFO.author}.txt`,
      content: `Hello , it' s ${BLOG_INFO.BLOG_INFO.author}.`
    },
    {
      type: FILE_TYPE.DIRECTORY,
      date,
      name: 'posts',
      content: []
    },
    {
      type: FILE_TYPE.DIRECTORY,
      date,
      name: 'tmp',
      content: []
    },
    {
      type: FILE_TYPE.DIRECTORY,
      date,
      name: 'usr',
      content: [
        {
          type: FILE_TYPE.DIRECTORY,
          date,
          name: BLOG_INFO.BLOG_INFO.author,
          content: []
        }
      ]
    }
  ]
};

export default disk;
