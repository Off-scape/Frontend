import Link from "next/link";

export default function AdminForbiddenPage() {
  return (
    <section className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-[#0B3E35]">Bu bölməyə icazəniz yoxdur</h1>
      <Link href="/admin" className="mt-5 inline-flex rounded-lg bg-[#0B3E35] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
        Ana səhifəyə qayıt
      </Link>
    </section>
  );
}
