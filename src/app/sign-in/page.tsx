type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(
  value: string | string[] | undefined,
  fallback: string,
): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return fallback;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = (await searchParams) ?? {};
  const callbackUrl = pickParam(params.callbackUrl, "/pipeline");
  const blockedDomain = pickParam(params.error, "") === "AccessDenied";
  const signInHref = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-app-border bg-app-card p-6 shadow-brand">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Flent
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-app-muted">
          Use your work Google account. Only <strong>@flent.in</strong> emails
          are allowed.
        </p>
        {blockedDomain ? (
          <p
            className="mt-4 rounded-lg border border-red-300/70 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-500/40 dark:bg-red-950/30 dark:text-red-100"
            role="alert"
          >
            Access denied. Please sign in with a @flent.in email ID.
          </p>
        ) : null}
        <a href={signInHref} className="btn-primary mt-6 block w-full py-2.5 text-center">
          Continue with Google
        </a>
      </div>
    </div>
  );
}
