module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-paper/babel',
      ['module:react-native-dotenv'],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@store': './store',
            '@pages': './pages',
            '@assets': './assets',
            '@utils': './utils.js',
          },
        },
      ],
    ],
  };
};
