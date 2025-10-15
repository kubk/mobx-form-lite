import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import CopyToLLM from './components/CopyToLLM.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('CopyToLLM', CopyToLLM)
  }
}
