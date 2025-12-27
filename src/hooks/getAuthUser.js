export async function getAuthUser(req, supabase_connect) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;

    if (!token) return null;

    const { data, error } = await supabase_connect.auth.getUser(token);
    if (error) return null;

    return data.user;
  } catch {
    return null;
  }
}
