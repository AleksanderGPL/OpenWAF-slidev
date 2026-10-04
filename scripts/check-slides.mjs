import { chromium } from 'playwright-chromium'
import { mkdir, writeFile } from 'node:fs/promises'

const out = new URL('../.preview/', import.meta.url)
await mkdir(out, { recursive: true })
const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', error => errors.push(error.message))
const results = []
try {
  for (let i = 1; i <= 10; i++) {
    await page.goto(`http://localhost:3030/${i}`, { waitUntil: 'networkidle' })
    await page.locator('.slidev-layout:visible').first().waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: new URL(`${String(i).padStart(2, '0')}.png`, out).pathname.replace(/^\//, '') })
    results.push(await page.evaluate(i => {
      const layout = [...document.querySelectorAll('.slidev-layout')].find(el => el.getBoundingClientRect().width > 0)
      const rect = layout.getBoundingClientRect()
      const content = [...layout.children].filter(el => !el.classList.contains('source'))
      return { slide: i, title: layout.querySelector('h1')?.textContent, bottom: Math.max(...content.map(el => el.getBoundingClientRect().bottom)), slideBottom: rect.bottom, images: [...layout.querySelectorAll('.screenshot img')].map(img => ({ loaded: img.complete && img.naturalWidth > 0, transparentContainer: getComputedStyle(img.parentElement).backgroundColor === 'rgba(0, 0, 0, 0)' })), overflow: content.filter(el => el.getBoundingClientRect().bottom > rect.bottom + 1).map(el => el.className) }
    }, i))
  }
  await writeFile(new URL('checks.json', out), JSON.stringify({ results, errors }, null, 2))
  console.log(JSON.stringify({ results, errors }, null, 2))
} finally {
  await browser.close()
}
