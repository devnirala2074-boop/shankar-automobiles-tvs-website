import { DEALERSHIP } from '../data/dealership.js';

/**
 * Verified Pre-filled Messages for Shankar Automobiles TVS Dealership
 */
export const DEFAULT_WHATSAPP_MESSAGE = 
  "Hello Shankar Automobiles! I visited your website and would like to know more about your TVS vehicles and available offers.";

/**
 * Validates an Indian mobile number (accepts 10 digits or +91 / 91 / 0 prefixed 10 digits).
 * Returns true if valid.
 */
export function isValidIndianPhone(input = '') {
  const digits = String(input).replace(/[^0-9]/g, '');
  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return /^[6-9]\d{9}$/.test(digits.slice(1));
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  return false;
}

/**
 * Builds a universal WhatsApp click-to-chat URL with properly encoded text.
 * Format: https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE
 * Opens official WhatsApp application on mobile and WhatsApp Web on desktop.
 */
export function buildWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE, phoneNumber = DEALERSHIP.contact.whatsappNumber) {
  // Strip non-digits to ensure clean international format (919630949975)
  const cleanNumber = String(phoneNumber).replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Generates vehicle specific enquiry message:
 * "Hello Shankar Automobiles, I am interested in the [Vehicle Name]. Please share more details."
 */
export function getVehicleEnquiryMessage(vehicleName, customQuery = '') {
  const baseMessage = `Hello Shankar Automobiles, I am interested in the ${vehicleName}. Please share more details.`;
  if (customQuery && customQuery.trim()) {
    return `${baseMessage}\n\nAdditional Query:\n${customQuery.trim()}`;
  }
  return baseMessage;
}

/**
 * Generates formatted test ride booking message
 */
export function getTestRideMessage({ name, phone, vehicle, preferredDate, message }) {
  return `Hello Shankar Automobiles,

I would like to request a Test Ride for the ${vehicle}.

Customer Details:
• Name: ${name}
• Mobile: ${phone}
• Interested Vehicle: ${vehicle}
• Preferred Date: ${preferredDate || 'Earliest Available'}${message ? `\n• Notes: ${message}` : ''}

Please confirm the test ride schedule. Thank you!`;
}

/**
 * Generates general contact message
 */
export function getContactMessage({ name, phone, subject, message }) {
  return `Hello Shankar Automobiles,

Website Contact Enquiry:
• Name: ${name}
• Mobile: ${phone}
• Subject: ${subject || 'General Enquiry'}

Message:
${message}`;
}

/**
 * Generates service booking message
 */
export function getServiceBookingMessage({ name, phone, vehicle, serviceType, preferredDate, notes }) {
  return `Hello Shankar Automobiles Service Team,

Service Appointment Request:
• Customer Name: ${name}
• Mobile: ${phone}
• TVS Vehicle Model: ${vehicle}
• Service Type: ${serviceType || 'Scheduled Periodic Maintenance'}
• Preferred Date: ${preferredDate || 'Earliest Slot'}${notes ? `\n• Requirements: ${notes}` : ''}

Please confirm the appointment. Thank you!`;
}

/**
 * Generates finance / offer enquiry message
 */
export function getFinanceEnquiryMessage({ name, phone, vehicle, downPayment, notes }) {
  return `Hello Shankar Automobiles,

Finance & EMI Enquiry:
• Name: ${name}
• Mobile: ${phone}
• Vehicle: ${vehicle}${downPayment ? `\n• Planned Down Payment: ₹${downPayment}` : ''}${notes ? `\n• Specific Questions: ${notes}` : ''}

Please share the best available EMI options. Thank you!`;
}
