module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'Explorer >= 11']
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
