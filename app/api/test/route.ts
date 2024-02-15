export async function POST(req: Request): Promise<Response> {
  try {
    // Obtén el contenido del archivo que deseas enviar (aquí se simula un contenido)
    const fileContent = 'This is a content test for scrapping well this is everything';

    // Configuración para la creación del Gist
    const gistApiUrl = 'https://api.github.com/gists';
    const gistData = {
      public: true,
      files: {
        'archivo.txt': { // Nombre del archivo en el Gist
          content: fileContent,
        },
      },
    };

    // Reemplaza 'tu_token_de_acceso' con tu token de acceso personal
    const accessToken = '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';

    const response = await fetch(gistApiUrl, {
      method: 'POST',
      body: JSON.stringify(gistData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    // Verifica si la creación del Gist fue exitosa
    if (response.ok) {
      return Response.json({ data: 'Archivo enviado a GitHub Gist', gistUrl: responseData.html_url });
    } else {
      console.error('Error al enviar el archivo a GitHub Gist:', responseData.message);
      return Response.json({ error: 'Error al enviar el archivo a GitHub Gist' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error general:', error);
    return Response.json({ error: 'Error general' }, { status: 500 });
  }
}
