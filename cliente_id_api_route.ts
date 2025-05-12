import dbConnect from "@/lib/db";
import Cliente from "@/models/Cliente";
import { NextRequest, NextResponse } from "next/server";

// GET: Buscar cliente por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await dbConnect();
    
    const cliente = await Cliente.findById(id);
    
    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cliente" },
      { status: 500 }
    );
  }
}

// PUT: Atualizar cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    await dbConnect();
    
    // Verifica se o cliente existe
    const clienteExiste = await Cliente.findById(id);
    if (!clienteExiste) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    
    // Verifica se email ou CPF já existem em outro cliente
    if (body.email || body.cpf) {
      const clienteExistente = await Cliente.findOne({
        _id: { $ne: id },
        $or: [
          { email: body.email || clienteExiste.email },
          { cpf: body.cpf || clienteExiste.cpf }
        ]
      });
      
      if (clienteExistente) {
        return NextResponse.json(
          { error: "Email ou CPF já cadastrado para outro cliente" },
          { status: 400 }
        );
      }
    }
    
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(clienteAtualizado);
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

// DELETE: Remover cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await dbConnect();
    
    const clienteRemovido = await Cliente.findByIdAndDelete(id);
    
    if (!clienteRemovido) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Cliente removido com sucesso" }
    );
  } catch (error) {
    console.error("Erro ao remover cliente:", error);
    return NextResponse.json(
      { error: "Erro ao remover cliente" },
      { status: 500 }
    );
  }
}