function generateRandomState(length: number): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let state = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    state += charset.charAt(randomIndex);
  }
  return state;
}

export const createState = () => generateRandomState(32);
