export async function GET(req: Request, { params }: { params: { pid: string } }) {
    // TODO: get single sponsor
    return new Response(JSON.stringify({}))
}

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    // TODO: delete single sponsor
    return new Response(JSON.stringify({}));
}

export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    // TODO: update single sponsor
    return new Response(JSON.stringify({}))
}