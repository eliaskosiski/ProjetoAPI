import { Controller, Post, Get, Body, Put, Param, Delete } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { AlterarProdutoDTO } from "./dto/atualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/listaProdutos.dto";
import { ProdutoDTO } from "./dto/produto.dm";
import { ProdutosArmazenados } from "./produto.dm";
import { ProdutoEntity } from "./produto.entity";

@Controller('/produtos')
    export default class ProdutoController{
        constructor(private clsProdutosArmazenado: ProdutosArmazenados){
        }

        @Get()
        async RetornoProdutos(){
            const produtosListados = await this.clsProdutosArmazenado.Produtos;
            const listaRetorno = produtosListados.map(
                produto => new ListaProdutoDTO(
                    produto.id,
                    produto.nome,
                    produto.estoque,
                )
            );
            return listaRetorno;
        }

        @Post()
        async criarProduto(@Body() dadosProdutos: ProdutoDTO){
            var retornoProduto;
            var Produto = new ProdutoEntity(
                uuid(),
                dadosProdutos.nome,
                dadosProdutos.ativo,
                dadosProdutos.valor,
                dadosProdutos.estoque,
                dadosProdutos.medidas,
                dadosProdutos.cor,
                dadosProdutos.marca);

            this.clsProdutosArmazenado.InserirProduto(Produto)
                retornoProduto={
                    id:Produto.id,
                    marca:Produto.marca,
                    valor:Produto.valor,
                    estoque:Produto.estoque
                }
                return retornoProduto;
        }

        @Put('/:nome')
        async atualizarEstoque(@Param('id') estoque: string,@Body() novoEstoque: AlterarProdutoDTO){
            const estoqueAtualizado = await this.clsProdutosArmazenado.alterarEstoque(estoque, novoEstoque)
            return{
                estoque:estoqueAtualizado,
                message: 'Estoque alterado'
            }
        }

        @Delete('/:id')
        async removerProduto(@Param('id') id: string){
            const usuarioRemovido = await this.clsProdutosArmazenado.removerProduto(id);
            return{
                usuario: usuarioRemovido,
                message:'Usuario Removido'
            }
        }
    }