'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquema de validação
const clienteSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }),
  cpf: z.string().length(11, { message: 'CPF deve ter 11 dígitos' }),
  endereco: z.object({
    rua: z.string().min(3, { message: 'Rua é obrigatória' }),
    numero: z.string().min(1, { message: 'Número é obrigatório' }),
    complemento: z.string().optional(),
    bairro: z.string().min(2, { message: 'Bairro é obrigatório' }),
    cidade: z.string().min(2, { message: 'Cidade é obrigatória' }),
    estado: z.string().length(2, { message: 'Use a sigla do estado (2 letras)' }),
    cep: z.string().length(8, { message: 'CEP deve ter 8 dígitos, sem hífen' }),
  }),
});

type ClienteFormData = z.infer<typeof clienteSchema>;

interface ClienteFormProps {
  clienteId?: string;
  clienteData?: ClienteFormData;
}

export default function ClienteForm({ clienteId, clienteData }: ClienteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: clienteData || {
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      endereco: {
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
      },
    },
  });

  const onSubmit = async (data: ClienteFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const url = clienteId 
        ? `/api/clientes/${clienteId}` 
        : '/api/clientes';
      
      const method = clienteId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar cliente');
      }
      
      // Redirecionar para a lista após sucesso
      router.push('/clientes');
      router.refresh(); // Atualiza a lista de clientes
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao salvar o cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            <input
              id="nome"
              type="text"
              className="form-input"
              {...register('nome')}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input
              id="telefone"
              type="tel"
              className="form-input"
              placeholder="(00) 00000-0000"
              {...register('telefone')}
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cpf" className="form-label">CPF</label>
            <input
              id="cpf"
              type="text"
              className="form-input"
              placeholder="Somente números"
              {...register('cpf')}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Endereço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rua" className="form-label">Rua</label>
            <input
              id="rua"
              type="text"
              className="form-input"
              {...register('endereco.rua')}
            />
            {errors.endereco?.rua && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco.rua.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="numero" className="form-label">Número</label>
              <input
                id="numero"
                type="text"
                className="form-input"
                {...register('endereco.numero')}
              />
              {errors.endereco?.numero && (
                <p className="text-red-500 text-sm mt-1">{errors.endereco.numero.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="complemento" className="form-label">Complemento</label>
              <input
                id="complemento"
                type="text"
                className="form-input"
                {...register('endereco.complemento')}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input
              id="bairro"
              type="text"
              className="form-input"
              {...register('endereco.bairro')}
            />
            {errors.endereco?.bairro && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco.bairro.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              id="cidade"
              type="text"
              className="form-input"
              {...register('endereco.cidade')}
            />
            {errors.endereco?.cidade && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco.cidade.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              id="estado"
              type="text"
              className="form-input"
              placeholder="UF"
              maxLength={2}
              {...register('endereco.estado')}
            />
            {errors.endereco?.estado && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco.estado.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cep" className="form-label">CEP</label>
            <input
              id="cep"
              type="text"
              className="form-input"
              placeholder="Somente números"
              {...register('endereco.cep')}
            />
            {errors.endereco?.cep && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco.cep.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : clienteId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}