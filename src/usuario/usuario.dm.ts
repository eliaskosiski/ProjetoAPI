import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuariosArmazenados{
    removeUsuario(id: string) {
        throw new Error("Method not implemented.");
    }
    #usuarios:UsuarioEntity[] = [];

    async AdicionarUsario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){
        return this.#usuarios;
    }

    async ValidaEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }

    private buscaPorID(id: string){
        const possivelUsuario = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id === id
        );
    }

    async atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>){

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave === 'id'){
                    return;
                }

                possivelUsuario[chave] = valor;
            }
        )
        return possivelUsuario;
    }
}