/**
 * Limits of the api (`PlaceOrderDto`, `RegisterDto`), mirrored here so the UI
 * never sends something the api will reject.
 */
export const ORDER_LIMITS = {
    maxLines: 50,
    maxQuantityPerLine: 99,
    fullName: 120,
    email: 254,
    phone: 30,
    addressLine: 300,
    city: 100,
    postalCode: 20,
    notes: 500,
};

export const REGISTER_LIMITS = {
    passwordMin: 8,
    // bcrypt ignores everything past 72 bytes
    passwordMax: 72,
};
