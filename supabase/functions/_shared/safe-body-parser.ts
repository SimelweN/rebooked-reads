export async function parseRequestBody<T = any>(req: Request, corsHeaders: Record<string, string>): Promise<{
  success: boolean;
  data?: T;
  errorResponse?: Response;
}> {
  try {
    if (req.method === 'GET') {
      return { success: true, data: {} as T };
    }
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await req.text();
      try {
        const data = JSON.parse(text) as T;
        return { success: true, data };
      } catch {
        return {
          success: false,
          errorResponse: new Response(
            JSON.stringify({ success: false, error: 'Invalid JSON body' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        };
      }
    }
    const data = (await req.json()) as T;
    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      errorResponse: new Response(
        JSON.stringify({ success: false, error: err?.message || 'Failed to parse request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }
}
