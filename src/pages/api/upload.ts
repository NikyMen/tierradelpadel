import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Intentar obtener archivos de diferentes campos
    let files: File[] = [];
    
    // Para archivo individual (campo 'file')
    const singleFile = formData.get('file') as File;
    if (singleFile && singleFile.size > 0) {
      files = [singleFile];
    } else {
      // Para múltiples archivos (campo 'images')
      const multipleFiles = formData.getAll('images') as File[];
      files = multipleFiles.filter(file => file && file.size > 0);
    }
    
    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: 'No se proporcionaron archivos' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (files.length > 4) {
      return new Response(JSON.stringify({ error: 'Máximo 4 imágenes permitidas' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isVercel = !!process.env.VERCEL;
    const uploadDir = isVercel ? join('/tmp', 'uploads') : join(process.cwd(), 'public', 'uploads');
    
    // Crear directorio si no existe
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        return new Response(JSON.stringify({ error: 'Solo se permiten archivos de imagen' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Validar tamaño (máximo 15MB)
      if (file.size > 15 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'El archivo es demasiado grande. Máximo 15MB' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Generar nombre único para el archivo (siempre .webp)
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileName = `product_${timestamp}_${randomString}.webp`;

      const filePath = join(uploadDir, fileName);
      const arrayBuffer = await file.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);

      // Conversión obligatoria a WebP
      // Nota: para GIFs/formatos no compatibles, sharp convertirá la primera imagen disponible.
      // En caso de error de conversión, devolver respuesta clara.
      try {
        const webpBuffer = await sharp(inputBuffer).webp({ quality: 80 }).toBuffer();
        await writeFile(filePath, webpBuffer);
      } catch (err) {
        console.error('Error convirtiendo a WebP:', err);
        return new Response(JSON.stringify({ error: 'No se pudo convertir la imagen a WebP' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const publicUrl = isVercel ? `/api/uploads/${fileName}` : `/uploads/${fileName}`;
      uploadedFiles.push(publicUrl);
    }

    // Para compatibilidad con código que espera un solo archivo
    const response = files.length === 1 ? {
      success: true,
      url: uploadedFiles[0], // Para archivo individual
      files: uploadedFiles,
      message: `${uploadedFiles.length} imagen(es) subida(s) correctamente`
    } : {
      success: true,
      files: uploadedFiles,
      message: `${uploadedFiles.length} imagen(es) subida(s) correctamente`
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error al subir archivos:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
