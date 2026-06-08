const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-2 border-slate-600 border-t-primary-500 rounded-full animate-spin`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
