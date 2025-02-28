module.exports = function (api) {
  api.cache(true); // Enable Babel caching for better performance

  return {
    // Presets
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind", // Enable NativeWind for JSX
        },
      ],
      "nativewind/babel", // Include NativeWind preset
    ],

    // Plugins
    plugins: [
      [
        "module:react-native-dotenv", // Load environment variables from .env
        {
          moduleName: "@env", // Import environment variables using `@env`
          path: ".env", // Path to your .env file
          safe: false, // Set to true to fail on missing variables
          allowUndefined: true, // Allow undefined variables
        },
      ],
    ],
  };
};