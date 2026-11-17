interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Preparing sanctuary space...' }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-16 text-center"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-sanctuary-gold/30 border-t-sanctuary-gold"
        aria-hidden="true"
      />
      <p className="text-sm font-medium tracking-wide text-sanctuary-muted">{message}</p>
    </div>
  );
}
