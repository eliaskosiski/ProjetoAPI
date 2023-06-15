import { IsString, IsNotEmpty, IsEmail, IsInt, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class CriarUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;
    
    @IsEmail(undefined, {message: "Email inválido"})
    @EmailUnico({message: "Já existe usuário com esse email"})
    email:string;

    @MinLength(6, {message: "Tamanho da senha inválido"})
    senha:string;

    @IsInt({message: "Idade inválida"})
    idade: BigInteger;

    @IsString({message: "Cidade inválida"})
    cidade: string;

    @IsString({message: "Telefone inválido"})
    telefone: string;
}