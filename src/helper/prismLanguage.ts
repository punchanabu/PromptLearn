import Prism from 'prismjs';

const loadPrismLanguage = async (language: string) => {
    if (!Prism.languages[language]) {
      try {
        await import(`prismjs/components/prism-${language}`);
      } catch (e) {
        console.error(`Failed to load Prism language: ${language}`);
      }
    }
};

const supportedLanguages = [
    'java', 'python', 'javascript', 'typescript', 'css', 'html', 'c', 'cpp', 'csharp', 
    'go', 'ruby', 'php', 'perl', 'kotlin', 'swift', 'sql', 'json', 'bash', 'markdown', 
    'yaml', 'docker', 'nginx', 'git', 'powershell', 'r', 'jsx', 'tsx', 'sass', 'scss', 
    'graphql', 'http', 'lua', 'pascal', 'rust', 'scala', 'scheme', 'shell', 'solidity', 
    'sparql', 'sql', 'stylus', 'twig', 'vbnet', 'wasm', 'wiki', 'xml', 'xquery', 'yaml'
];

export {loadPrismLanguage, supportedLanguages};