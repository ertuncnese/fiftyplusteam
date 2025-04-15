export default function Footer() {
    return (
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 text-xs text-gray-500 py-2 px-4 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
        <p>
  © {new Date().getFullYear()} Page by{' '}
  <a
    href="mailto:ertunc.nese@hotmail.com"
    className="text-blue-900 hover:underline"
  >
    Ertunc Nese
  </a>
</p>

          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/fiftyplusteam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              Instagram
            </a>
            <a
              href="mailto:ayda@fiftyplusteam.com"
              className="hover:text-blue-800"
            >
              İletişim
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
  