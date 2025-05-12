import dbConnect from "@/lib/db";
import Cliente, { ICliente } from "@/models/Cliente";
import { NextResponse } from "next/server";

// GET: Listar todos os clientes
export async function GET() {
  try {
    await dbConnect();
    const clientes = await Cliente.find({}).sort({ dataCadastro: -1 });
    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

// POST: Criar novo cliente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    // Verifica se já existe um cliente com o mesmo email ou CPF
    const clienteExistente = await Cliente.findOne({
      $or: [{ email: body.email }, { cpf: body.cpf }]
    });
    
    if (clienteExistente) {
      return NextResponse.json(
        { error: "Já existe um cliente com este email ou CPF" },
        { status: 400 }
      );
    }
    
    const novoCliente = await Cliente.create(body);
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar cliente:", error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}