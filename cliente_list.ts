'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Cliente {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: {
    cidade: string;
    estado: string;
  };
  dataCadastro: string;
}

interface ClienteListProps {
  clientes: Cliente[];
}

export default function ClienteList({ clientes }: ClienteListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    
    try {
      const response = await fetch(`/api/clientes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao remover cliente');
      }
      
      // Atualiza a lista após deleção
      router.refresh();
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      alert('Erro ao remover cliente');
    } finally {
      setDeletingId(null);
      setShowConfirm(false);
      setSelectedId(null);
    }
  };
  
  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  if (clientes.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">Nenhum cliente cadastrado</h2>
        <Link href="/clientes/cadastro" className="btn btn-primary">
          Cadastrar Cliente
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cadastro</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{cliente.nome}</div>
                  <div className="text-sm text-gray-500">CPF: {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{cliente.email}</div>
                  <div className="text-sm text-gray-500">{cliente.telefone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{cliente.endereco.cidade}</div>
                  <div className="text-sm text-gray-500">{cliente.endereco.estado}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(cliente.dataCadastro)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link 
                      href={`/clientes/${cliente._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Detalhes
                    </Link>
                    <Link 
                      href={`/clientes/${cliente._id}/editar`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => confirmDelete(cliente._id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={deletingId === cliente._id}
                    >
                      {deletingId === cliente._id ? 'Removendo...' : 'Remover'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmar exclusão</h3>
            <p className="mb-6">Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={() => selectedId && handleDelete(selectedId)}
                className="btn btn-danger"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}