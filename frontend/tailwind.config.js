module.exports = {
    theme: {
      extend: {
        screens: {
          'lgx': '1385px', // custom breakpoint
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        },
        colors: {
          'gray-deep': '#333333',
          'gray-light': '#f5f5f5',
        },
      },
    },
    content: [
      './app/**/*.{ts,tsx}',     // ← if you're using the app directory
      './components/**/*.{ts,tsx}',
      './pages/**/*.{ts,tsx}',
    ],
  };

