export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-center">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} LetsCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
