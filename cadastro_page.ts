import ClienteForm from "@/components/ClienteForm";

export default function CadastroClientePage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Cadastrar Novo Cliente</h1>
        <p className="text-gray-600">Preencha o formulário abaixo com os dados do cliente</p>
      </div>
      
      <ClienteForm />
    </div>
  );
}