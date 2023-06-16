import { Module } from '@nestjs/common'
import { ProdutosArmazenados }from './produto.dm'
import ProdutoController from "./produto.controller"

@Module({
    controllers:[ProdutoController],
    providers:[ProdutosArmazenados]
})
export class ProdutosModule{}