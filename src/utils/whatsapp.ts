export function generateWhatsAppLink(productName: string): string {
  const msg = encodeURIComponent(
    `Hello NACTURA,\nI would like to enquire about the following product:\n\nProduct:\n${productName}\n\nPlease share:\n• Pricing & Available Package Sizes\n• Delivery & Shipping Details\n• Stock Availability\n\nThank you.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}
