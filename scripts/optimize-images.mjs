/**
 * Image Optimization Script
 * 
 * Converts PNG/JPG images in public/images and public/assets to WebP format.
 * Creates optimized copies alongside originals.
 * 
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, copyFile } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = ['public/images', 'public/assets'];
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_QUALITY = 82;
const MAX_WIDTH = 1920; // Max width for images

async function getFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await getFiles(fullPath));
        } else if (IMAGE_EXTENSIONS.includes(extname(entry.name).toLowerCase())) {
            files.push(fullPath);
        }
    }
    return files;
}

async function optimizeImage(filePath) {
    const ext = extname(filePath).toLowerCase();
    const name = basename(filePath, ext);
    const dir = filePath.substring(0, filePath.lastIndexOf('\\') !== -1 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
    const webpPath = join(dir, `${name}.webp`);

    try {
        const info = await stat(filePath);
        const originalSize = info.size;

        // Convert to WebP
        const image = sharp(filePath);
        const metadata = await image.metadata();

        let pipeline = image;

        // Resize if wider than MAX_WIDTH
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
        }

        await pipeline
            .webp({ quality: WEBP_QUALITY, effort: 6 })
            .toFile(webpPath);

        const webpInfo = await stat(webpPath);
        const savings = ((1 - webpInfo.size / originalSize) * 100).toFixed(1);

        console.log(`✅ ${basename(filePath)} → ${basename(webpPath)} | ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(webpInfo.size / 1024 / 1024).toFixed(2)} MB (${savings}% saved)`);

        return { original: originalSize, optimized: webpInfo.size };
    } catch (err) {
        console.error(`❌ Failed: ${filePath} - ${err.message}`);
        return { original: 0, optimized: 0 };
    }
}

async function main() {
    console.log('🖼️  Image Optimization Script');
    console.log('============================\n');

    let totalOriginal = 0;
    let totalOptimized = 0;
    let fileCount = 0;

    for (const dir of DIRS) {
        try {
            const files = await getFiles(dir);
            if (files.length === 0) continue;

            console.log(`\n📁 Processing ${dir}/ (${files.length} images)...\n`);

            for (const file of files) {
                const result = await optimizeImage(file);
                totalOriginal += result.original;
                totalOptimized += result.optimized;
                fileCount++;
            }
        } catch (err) {
            console.log(`⚠️  Directory ${dir} not found, skipping.`);
        }
    }

    console.log('\n============================');
    console.log(`📊 Summary: ${fileCount} images processed`);
    console.log(`   Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   WebP total:     ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total saved:    ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%)`);
    console.log('\n💡 Next steps:');
    console.log('   1. Update image references in code to use .webp files');
    console.log('   2. Keep original files as fallback or delete them to save space');
}

main();
