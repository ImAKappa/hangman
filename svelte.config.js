import preprocess from 'svelte-preprocess';

const config = {
  preprocess: [
    preprocess({ 
      typescript: true, // Enables use of TypeScript in <script> blocks
      postcss: true, // Enables use of PostCSS in <style> blocks
    })
  ]
}

export default config;