export default {
  '**/*.{js,jsx,ts,tsx,vue}': (filenames) => {
    filenames.forEach((filename) => {
      console.log(` ♿️ ESLINT FOR ${filename?.split('/')?.pop() || filename}...`);
    });
    return [`npx eslint --fix ${filenames.map(filename => `"${filename}"`).join(' ')}`];
  },
};
