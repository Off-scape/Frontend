import PersonalInfoClient from "@/components/profile/PersonalInfoClient";

// ─── Types ────────────────────────────────────────────────────────
type Gender = "male" | "female";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: Gender;
  avatarUrl: string | null;
}

// ─── Server-side data fetch (replace with your real DB/auth call) ─
async function getUserProfile(): Promise<UserProfile> {
  // e.g. const session = await getServerSession();
  //      return await db.user.findUnique({ where: { id: session.user.id } });
  return {
    id: "xxxx-xxxx-xxxx-xxxx",
    firstName: "Hüseyn",
    lastName: "Hüseyn",
    phone: "",
    email: "Huseyn@mail.ru",
    gender: "male",
    avatarUrl: null,
  };
}

// ─── Page (Server Component) ──────────────────────────────────────
export default async function ProfilePage() {
  const user = await getUserProfile();

  return <PersonalInfoClient user={user} />;
}
