export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function applyMoneyMask(raw) {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const number = parseInt(digits, 10) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
}

export function parseMaskedValue(masked) {
  return parseFloat(
    masked.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
  ) || 0;
}
