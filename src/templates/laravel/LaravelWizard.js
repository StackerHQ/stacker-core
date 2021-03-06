function getQuestions() {
  return [
    {
      type: 'list',
      name: 'database',
      message: 'Choose DB',
      choices: [
        { name: 'MySQL', value: 'mysql' },
        { name: 'MariaDB', value: 'mariadb' },
        { name: 'PostgreSQL', value: 'postgres' },
      ],
    },
    {
      type: 'confirm',
      name: 'phpmyadmin',
      message: 'Do you want phpMyAdmin?',
    },
    {
      type: 'checkbox',
      name: 'addons',
      message: 'Select addons',
      choices: [
        { name: 'Redis', value: 'redis' },
        { name: 'Memcached', value: 'memcached' },
      ],
    },
  ];
}

function makeOptions(answers) {
  const options = {
    database: answers.database,
    phpmyadmin: answers.phpmyadmin,
  };

  if (answers.addons.includes('redis')) options.redis = true;
  if (answers.addons.includes('memcached')) options.memcached = true;

  return options;
}

export default { getQuestions, makeOptions };
