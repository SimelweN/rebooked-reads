const EnvironmentError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-destructive">Environment Error</h1>
        <p className="mb-4 text-muted-foreground">
          There was an error loading the environment configuration.
        </p>
      </div>
    </div>
  );
};

export default EnvironmentError;
