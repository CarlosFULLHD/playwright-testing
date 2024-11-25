export function generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `user${timestamp}@example.com`;
}

export default generateUniqueEmail;
