import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-dark-gray mb-6">News Articles</h1>
        <NewsList />
      </div>
    </div>
  );
}
