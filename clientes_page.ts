import Link from 'next/link';
import ClienteList from '@/components/ClienteList';

// Esta função é executada no servidor
async function getClientes() {
  // Utilizamos o URL interno absoluto para consulta API no servidor
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/clientes`, { 
      cache: 'no-store' // Garante que os dados sempre serão atualizados
    });
    
    if (!res.ok) {
      throw new Error('Falha ao carregar clientes');
    }
    
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
}

export default async function ClientesPage() {
  const clientes = await getClientes();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-gray-600">Gerencie todos os clientes cadastrados</p>
        </div>
        <Link href="/clientes/cadastro" className="btn btn-primary">
          Novo Cliente
        </Link>
      </div>
      
      <ClienteList clientes={clientes} />
    </div>
  );
}