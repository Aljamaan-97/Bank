import { getToken, isBiometricEnabled, setBiometricEnabled } from "@/Api/store";
import * as LocalAuth from "expo-local-authentication";

/**
 * Determines whether we can show the biometric‑login button:
 * 1. A stored access‑token exists.
 * 2. Device has biometric hardware.
 * 3. User has at least one biometric enrolled.
 * 4. User previously enabled the option in Settings / login flow.
 */
export async function canUseBiometric(): Promise<boolean> {
  const token = await getToken(); // وجود التوكِن شرط أساسي
  const hasHardware = await LocalAuth.hasHardwareAsync();
  const isEnrolled = await LocalAuth.isEnrolledAsync();
  const enabledFlag = await isBiometricEnabled();

  return !!token && hasHardware && isEnrolled && enabledFlag;
}

/**
 * Re‑export helper to enable / disable biometric login flag.
 */
export const enableBiometric = setBiometricEnabled;
