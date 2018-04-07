export const buildComment = [
  '',
  '',
  `GIT-BLOG-DEFAULT-THEME`,
  `data: ${new Date().toLocaleString()}`,
  `author: AEPKILL`,
  `version: ${process.env.npm_package_version}`,
  '',
  '看到一对中学生情侣在街上手牵手，不禁回想起了中学时代的自己。当年的我，也是在街上看着一对中学生情侣在街上手牵手。',
  '',
  ''
]
  .map(value => (value === '' ? value : `    ${value}`))
  .join('\n');

export default {
  buildComment
};
