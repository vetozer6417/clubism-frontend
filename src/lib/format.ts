export function formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/[^0-9]/g, '');
    if (digits.length === 10 && digits.startsWith('0')) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return digits;
}