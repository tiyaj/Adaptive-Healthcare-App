import { createBrowserRouter } from "react-router";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { HealthProfile } from "./screens/HealthProfile";
import { CareCircle } from "./screens/CareCircle";
import { RoutineCalibration } from "./screens/RoutineCalibration";
import { Dashboard } from "./screens/Dashboard";
import { Medications } from "./screens/Medications";
import { MedicationDetail } from "./screens/MedicationDetail";
import { MedicationHistory } from "./screens/MedicationHistory";
import { MedicationReminders } from "./screens/MedicationReminders";
import { MealLog } from "./screens/MealLog";
import { PharmacyFinder } from "./screens/PharmacyFinder";
import { RefillRequest } from "./screens/RefillRequest";
import { Settings } from "./screens/Settings";
import { ProfileInformation } from "./screens/ProfileInformation";
import { ChangePassword } from "./screens/ChangePassword";
import { PrivacySettings } from "./screens/PrivacySettings";
import { DataStorage } from "./screens/DataStorage";
import { ConnectedDevices } from "./screens/ConnectedDevices";
import { HelpSupport } from "./screens/HelpSupport";
import { TermsOfService } from "./screens/TermsOfService";
import { PrivacyPolicyPage } from "./screens/PrivacyPolicyPage";
import { NotFound } from "./screens/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/onboarding/health-profile",
    Component: HealthProfile,
  },
  {
    path: "/onboarding/care-circle",
    Component: CareCircle,
  },
  {
    path: "/onboarding/routine",
    Component: RoutineCalibration,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/medications",
    Component: Medications,
  },
  {
    path: "/medication/:id",
    Component: MedicationDetail,
  },
  {
    path: "/medication-history",
    Component: MedicationHistory,
  },
  {
    path: "/medication-reminders",
    Component: MedicationReminders,
  },
  {
    path: "/meal-log",
    Component: MealLog,
  },
  {
    path: "/pharmacy-finder",
    Component: PharmacyFinder,
  },
  {
    path: "/refill/:medicationId",
    Component: RefillRequest,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/profile-information",
    Component: ProfileInformation,
  },
  {
    path: "/change-password",
    Component: ChangePassword,
  },
  {
    path: "/privacy-settings",
    Component: PrivacySettings,
  },
  {
    path: "/data-storage",
    Component: DataStorage,
  },
  {
    path: "/connected-devices",
    Component: ConnectedDevices,
  },
  {
    path: "/help-support",
    Component: HelpSupport,
  },
  {
    path: "/terms-of-service",
    Component: TermsOfService,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);