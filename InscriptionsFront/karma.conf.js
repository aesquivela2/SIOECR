module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage') // Ensure this is included
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' }, // HTML report
        { type: 'text-summary' } // Text summary in the terminal
      ]
    },
    reporters: ['progress', 'coverage'], // Add 'coverage' to the list of reporters
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
