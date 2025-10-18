// Utility function to join class names
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');
}
