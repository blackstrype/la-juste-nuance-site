import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

// Guard against a truncated or half-saved style.css. Truncated CSS is still
// valid CSS, so the build passes; these checks make `npm test` fail instead.
// Keep the lists below short, and update them when a selector is renamed.

const css = readFileSync(resolve(process.cwd(), 'src/styles/style.css'), 'utf8')

// Drop comments and quoted strings so stray braces in them don't skew the count.
const code = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, '""')

const REQUIRED_TOKENS = ['--color-sage', '--color-peach', '--font-serif', '--border-radius-md']

// Selectors from the middle and the end of the file.
const REQUIRED_SELECTORS = ['.faq-question', '.related-services-list']

const TRUNCATION_HINT =
  'style.css looks truncated or half-saved. Restore the last complete version from git history.'

describe('style.css integrity', () => {
  it('has balanced braces', () => {
    const open = (code.match(/{/g) || []).length
    const close = (code.match(/}/g) || []).length
    expect(open, `Unbalanced braces: ${open} "{" vs ${close} "}". ${TRUNCATION_HINT}`).toBe(close)
  })

  it('ends with a closing brace', () => {
    expect(code.trimEnd().slice(-1), `The file does not end with "}". ${TRUNCATION_HINT}`).toBe('}')
  })

  it('defines the :root design tokens', () => {
    expect(css, `Missing the :root block. ${TRUNCATION_HINT}`).toMatch(/:root\s*{/)
    for (const token of REQUIRED_TOKENS) {
      expect(css, `Missing design token ${token} in :root.`).toContain(`${token}:`)
    }
  })

  it('contains the mobile @media (max-width: 768px) block', () => {
    expect(css, `Missing the "@media (max-width: 768px)" block. ${TRUNCATION_HINT}`).toMatch(
      /@media\s*\(\s*max-width:\s*768px\s*\)/
    )
  })

  it.each(REQUIRED_SELECTORS)('contains the %s selector', (selector) => {
    expect(css, `Missing selector ${selector}. ${TRUNCATION_HINT}`).toContain(selector)
  })
})
