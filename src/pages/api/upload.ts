import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
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

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
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

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'El archivo es demasiado grande. Máximo 5MB' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const fileName = `product_${timestamp}_${randomString}.${extension}`;
      
      const filePath = join(uploadDir, fileName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      await writeFile(filePath, buffer);
      
      uploadedFiles.push(`/uploads/${fileName}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      files: uploadedFiles,
      message: `${uploadedFiles.length} imagen(es) subida(s) correctamente`
    }), {
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
