import mongoose from 'mongoose';

export interface ICliente {
  _id?: string;
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
  dataCadastro?: Date;
}

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true,
  },
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true,
    trim: true,
  },
  endereco: {
    rua: {
      type: String,
      required: [true, 'Rua é obrigatória'],
      trim: true,
    },
    numero: {
      type: String,
      required: [true, 'Número é obrigatório'],
      trim: true,
    },
    complemento: {
      type: String,
      trim: true,
    },
    bairro: {
      type: String,
      required: [true, 'Bairro é obrigatório'],
      trim: true,
    },
    cidade: {
      type: String,
      required: [true, 'Cidade é obrigatória'],
      trim: true,
    },
    estado: {
      type: String,
      required: [true, 'Estado é obrigatório'],
      trim: true,
    },
    cep: {
      type: String,
      required: [true, 'CEP é obrigatório'],
      trim: true,
    },
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

// Verificar se o modelo já existe para evitar erros de overwrite
export const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);

export default Cliente;