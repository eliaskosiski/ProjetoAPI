import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsInt, IsArray, IsOptional } from 'class-validator';

export class AlterarProdutoDTO{
    @IsString()
    @IsNotEmpty({message:'Coloque o nome do produto'})
    nome:string;

    @IsBoolean()
    @IsOptional()
    ativo:boolean;

    @IsNumber()
    @IsOptional()
    valor:number;

    @IsInt({message:'Informe a quantidade'})
    @IsOptional()
    estoque:number;

    @IsArray({message:'Informe as medidas'})
    @IsOptional()
    medidas:string[];
   
    @IsArray({message:'Informe as cores disponiveis'})
    @IsOptional()
    cor:string[];

    @IsString({message:'Coloque a marca do produto'})
    @IsOptional()
    marca:string;
}