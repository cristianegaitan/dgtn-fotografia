const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const carpetaOriginales = path.join(__dirname, "images-originales");
const carpetaOptimizadas = path.join(__dirname, "images");

const extensionesPermitidas = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
]);

async function optimizarImagenes() {
    await fs.mkdir(carpetaOptimizadas, { recursive: true });

    const archivos = await fs.readdir(carpetaOriginales, {
        withFileTypes: true
    });

    const imagenes = archivos.filter((archivo) => {
        const extension = path.extname(archivo.name).toLowerCase();

        return archivo.isFile() && extensionesPermitidas.has(extension);
    });

    if (imagenes.length === 0) {
        console.log("No se encontraron imágenes para optimizar.");
        return;
    }

    for (const imagen of imagenes) {
        const rutaOriginal = path.join(carpetaOriginales, imagen.name);
        const nombre = path.parse(imagen.name).name;
        const rutaOptimizada = path.join(
            carpetaOptimizadas,
            `${nombre}.jpg`
        );

        await sharp(rutaOriginal)
            .rotate()
            .resize({
                width: 1200,
                withoutEnlargement: true
            })
            .jpeg({
                quality: 75,
                mozjpeg: true
            })
            .toFile(rutaOptimizada);

        const original = await fs.stat(rutaOriginal);
        const optimizada = await fs.stat(rutaOptimizada);

        console.log(
            `✓ ${imagen.name}: ` +
            `${(original.size / 1024).toFixed(0)} KB → ` +
            `${(optimizada.size / 1024).toFixed(0)} KB`
        );
    }

    console.log("Optimización terminada.");
}

optimizarImagenes().catch((error) => {
    console.error("No se pudieron optimizar las imágenes:", error);
    process.exitCode = 1;
});