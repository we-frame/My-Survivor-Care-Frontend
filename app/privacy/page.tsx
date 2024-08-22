import { makeRequest } from "@/lib/api";

export default async function PrivacyPage() {
  const { data } = await makeRequest("GET", "/items/privacy_statement");
  if (!data) {
    return null;
  }
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-semibold ">Privacy Policy</h1>
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
    </div>
  );
}
