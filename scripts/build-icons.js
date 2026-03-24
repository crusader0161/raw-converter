#!/usr/bin/env node
/**
 * Generates icon assets from assets/icon.svg
 *   assets/icon.png  – 1024×1024 master PNG  (electron-builder uses this for macOS/Linux)
 *   assets/icon.ico  – multi-size ICO         (Windows)
 *
 * Run:  node scripts/build-icons.js
 * Deps: sharp (dependency), png-to-ico (devDependency)
 */

const path     = require('path')
const fs       = require('fs')
const sharp    = require('sharp')
const pngToIco = require('png-to-ico')

const root   = path.join(__dirname, '..')
const src    = path.join(root, 'assets', 'icon.svg')
const pngOut = path.join(root, 'assets', 'icon.png')
const icoOut = path.join(root, 'assets', 'icon.ico')

async function main() {
  if (!fs.existsSync(src)) {
    console.error('ERROR: assets/icon.svg not found')
    process.exit(1)
  }

  // ── 1024×1024 master PNG ──────────────────────────────────────────────────
  await sharp(src).resize(1024, 1024).png().toFile(pngOut)
  console.log('✓ assets/icon.png  (1024×1024)')

  // ── Multi-size ICO (Windows) ──────────────────────────────────────────────
  const icoSizes = [16, 24, 32, 48, 64, 128, 256]
  const buffers  = await Promise.all(
    icoSizes.map(s => sharp(src).resize(s, s).png().toBuffer())
  )
  const ico = await pngToIco(buffers)
  fs.writeFileSync(icoOut, ico)
  console.log(`✓ assets/icon.ico  (${icoSizes.join(', ')} px)`)
}

main().catch(err => { console.error(err); process.exit(1) })
