import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Cadastro de Clientes</h1>
        <p className="text-xl text-gray-600 mb-8">
          Gerencie seus clientes de forma simples e eficiente
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/clientes"
            className="btn btn-primary"
          >
            Ver Clientes
          </Link>
          <Link 
            href="/clientes/cadastro"
            className="btn btn-secondary"
          >
            Novo Cliente
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Cadastro Simples</h2>
          <p>Formulário intuitivo para registrar novos clientes rapidamente.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Visualização Completa</h2>
          <p>Veja todos os detalhes dos clientes em uma interface organizada.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Fácil Manutenção</h2>
          <p>Atualize ou remova informações de clientes com poucos cliques.</p>
        </div>
      </section>
    </div>
  );
}