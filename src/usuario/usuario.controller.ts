import { Controller, Post, Body, Get, Put, Param, Delete } from "@nestjs/common";
import { CriarUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import { v4 as uuid } from 'uuid';
import { listaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/atualizaUsuario.dto";


@Controller('/usuarios')
export class UsuarioController{
    constructor(private clsUsariosArmazenados: UsuariosArmazenados){
    }

    @Get()
    async RetornoUsarios(){
        const usuariosListados = await this.clsUsariosArmazenados.Usuarios;
        const listaRetorno = usuariosListados.map(
            usuario => new listaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return listaRetorno
    }

    
    @Post()
    async criarUsuario(@Body() dadosUsuario: CriarUsuarioDTO){
        var usuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade, dadosUsuario.cidade, dadosUsuario.email, dadosUsuario.telefone, dadosUsuario.senha);
        var retornoUsuario;
        
        this.clsUsariosArmazenados.AdicionarUsario(usuario);
        retornoUsuario={
            id: usuario.id,
            status:'Usuario Criado'
        }
        
        return retornoUsuario;
    }

    @Put('/id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AlteraUsuarioDTO){
        const usuarioAtualizado = await this.clsUsariosArmazenados.atualizaUsuario(id, novosDados);
        return {
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado'
        }
    }

    @Delete('id:/')
    async removeUsuario(@Param('id') id:string){
        const usuarioRemovido = await this.clsUsariosArmazenados.removeUsuario(id);
        return{
            usuario: usuarioRemovido,
            message: 'usuaário removido'
        }
    }
}