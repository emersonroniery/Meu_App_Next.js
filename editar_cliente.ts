'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClienteForm from '@/components/ClienteForm';

interface Cliente {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export default function EditarClientePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`/api/clientes/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Cliente não encontrado');
        }
        
        const data = await response.json();
        setCliente(data);
      } catch (err: any) {
        console.error('Erro ao buscar cliente:', err);
        setError(err.message || 'Erro ao carregar dados do cliente');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCliente();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          {error || 'Cliente não encontrado'}
        </h2>
        <button 
          onClick={() => router.push('/clientes')}
          className="btn btn-primary"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Editar Cliente</h1>
        <p className="text-gray-600">Atualize os dados do cliente</p>
      </div>
      
      <ClienteForm 
        clienteId={params.id} 
        clienteData={{
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          cpf: cliente.cpf,
          endereco: {
            rua: cliente.endereco.rua,
            numero: cliente.endereco.numero,
            complemento: cliente.endereco.complemento || '',
            bairro: cliente.endereco.bairro,
            cidade: cliente.endereco.cidade,
            estado: cliente.endereco.estado,
            cep: cliente.endereco.cep,
          }
        }} 
      />
    </div>
  );
}