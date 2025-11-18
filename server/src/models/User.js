export const userFields = ['id', 'name', 'email', 'created_at'];

export const toPublicUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  created_at: row.created_at
});
