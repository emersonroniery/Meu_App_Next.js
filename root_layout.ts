import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Cadastro de Clientes',
  description: 'Aplicação para gerenciamento e cadastro de clientes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Sistema de Clientes</h1>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Início</a></li>
                <li><a href="/clientes" className="hover:underline">Clientes</a></li>
                <li><a href="/clientes/cadastro" className="hover:underline">Novo Cliente</a></li>
              </ul>
            </div>
          </nav>
          <main className="container mx-auto py-6 px-4">
            {children}
          </main>
          <footer className="bg-gray-200 p-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Sistema de Cadastro de Clientes</p>
          </footer>
        </div>
      </body>
    </html>
  );
}