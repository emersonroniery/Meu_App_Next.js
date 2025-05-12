import Link from 'next/link';

async function getCliente(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/clientes/${id}`, { 
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Cliente não encontrado');
    }
    
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return null;
  }
}

export default async function ClienteDetalhesPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const cliente = await getCliente(params.id);
  
  if (!cliente) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Cliente não encontrado</h2>
        <Link href="/clientes" className="btn btn-primary">
          Voltar para Lista
        </Link>
      </div>
    );
  }
  
  // Formata o CPF
  const cpfFormatado = cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
  // Formata a data
  const data = new Date(cliente.dataCadastro);
  const dataFormatada = data.toLocaleDateString('pt-BR');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold">{cliente.nome}</h1>
          <p className="text-gray-600">Detalhes do cliente</p>
        </div>
        <div className="flex space-x-4">
          <Link 
            href={`/clientes/${params.id}/editar`}
            className="btn btn-primary"
          >
            Editar Cliente
          </Link>
          <Link 
            href="/clientes"
            className="btn btn-secondary"
          >
            Voltar
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome Completo</dt>
              <dd className="mt-1 text-lg">{cliente.nome}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">CPF</dt>
              <dd className="mt-1">{cpfFormatado}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data de Cadastro</dt>
              <dd className="mt-1">{dataFormatada}</dd>
            </div>
          </dl>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Contato</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1">{cliente.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="mt-1">{cliente.telefone}</dd>
            </div>
          </dl>
        </div>
        
        <div className="card md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Endereço</h2>
          <dl className="grid md:grid-cols-3 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Rua</dt>
              <dd className="mt-1">{cliente.endereco.rua}, {cliente.endereco.numero}</dd>
            </div>
            {cliente.endereco.complemento && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Complemento</dt>
                <dd className="mt-1">{cliente.endereco.complemento}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Bairro</dt>
              <dd className="mt-1">{cliente.endereco.bairro}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Cidade</dt>
              <dd className="mt-1">{cliente.endereco.cidade}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">{cliente.endereco.estado}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">CEP</dt>
              <dd className="mt-1">{cliente.endereco.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}