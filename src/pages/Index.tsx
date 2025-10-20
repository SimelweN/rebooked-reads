const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">ReBooked Reads</h1>
        <p className="text-xl text-muted-foreground mb-6">Coming Soon</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Database Connected & Configured</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
