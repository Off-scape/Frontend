const ActivityEmptyState = ({ title }: { title: string }) => {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <p
        className="text-zinc-400"
        style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
      >
        {title} 
      </p>
    </div>
  );
};

export default ActivityEmptyState;