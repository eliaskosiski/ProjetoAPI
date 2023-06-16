import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutosArmazenados{
    #produtos: ProdutoEntity[] = [];

    InserirProduto(produto: ProdutoEntity){
        this.#produtos.push(produto);
    }

    get Produtos(){
        return this.#produtos;
    }

    private buscaPorID(id: string){
        const possivelProduto = this.#produtos.find(
            produtosSalvo => produtosSalvo.id === id
        )
        
        if(!possivelProduto){
            throw new Error('Usuario nao encontrado');
        }
        return possivelProduto
    }

    async alterarEstoque(id: string, dadosAtualizacao: Partial<ProdutoEntity>){
        const produto = this.buscaPorID(id);
        produto.estoque = dadosAtualizacao.estoque;
        return produto;
    }

    async removerProduto(id: string){
        const produto = this.buscaPorID(id);
        this.#produtos = this.#produtos.filter(
            produtosSalvo => produtosSalvo.id !==id
        )
        return produto;
    }
}