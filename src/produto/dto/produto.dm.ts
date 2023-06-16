import { IsString, IsNotEmpty, IsInt, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class ProdutoDTO{

    @IsString()
    @IsNotEmpty({message:'Coloque o nome do produto'})
    nome:string;

    @IsBoolean()
    ativo:boolean;

    @IsNumber()
    valor:number;

    @IsInt({message:'Informe a quantidade'})
    estoque:number;

    @IsArray({message:'Informe as medidas'})
    medidas:string[];
   
    @IsArray({message:'Informe as cores disponiveis'})
    cor:string[];

    @IsString({message:'Coloque a marca do produto'})
    marca:string;
}