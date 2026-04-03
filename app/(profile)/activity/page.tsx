import ActivityTabs from "@/components/activity/ActivityTabs";

const ActivityPage = () => {
  return (
    <section className="px-6 py-8 md:px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#142A12]">Fəaliyyət</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Qatıldığınız və bəyəndiyiniz bütün turlar burada təhlükəsiz saxlanılır.
        </p>
      </div>

      <ActivityTabs />
    </section>
  );
};

export default ActivityPage;