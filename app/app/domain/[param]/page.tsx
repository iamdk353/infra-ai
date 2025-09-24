export default async function DomainPage({
  params,
}: {
  params: Promise<{ param: string }>;
}) {
  const { param } = await params;

  return (
    <div>
      <h1>Domain: {param}</h1>
    </div>
  );
}
